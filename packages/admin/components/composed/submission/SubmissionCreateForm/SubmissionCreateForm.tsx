import { useState } from "react";
import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
  useOnSuccess,
} from "components/api/MutationForm";
import MockInput from "components/forms/MockInput";
import type { SubmissionCreateFormMutation } from "@/relay/SubmissionCreateFormMutation.graphql";
import type { SubmissionTargetNode, PreselectedTarget, Fields } from "./types";

type Props = {
  depositableTargets: SubmissionTargetNode[];
  preselectedTarget?: PreselectedTarget;
  preselectedCollectionId?: string;
  onSuccess: (slug: string) => void;
  onCancel: () => void;
};

export default function SubmissionCreateForm({
  depositableTargets,
  preselectedTarget,
  preselectedCollectionId,
  onSuccess,
  onCancel,
}: Props) {
  const { t } = useTranslation();

  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    preselectedTarget?.id ?? "",
  );

  // Resolve current target data
  const selectedTarget =
    preselectedTarget?.id === selectedTargetId
      ? preselectedTarget
      : depositableTargets.find((t) => t.id === selectedTargetId);

  const isDescendant = selectedTarget?.depositMode === "DESCENDANT";
  const depositTargets = selectedTarget?.depositTargets ?? [];
  const schemaVersions = selectedTarget?.schemaVersions ?? [];

  // For DIRECT mode, parentEntityId is the selected target's entity ID
  const parentEntityId =
    preselectedTarget?.id === selectedTargetId
      ? preselectedCollectionId ?? ""
      : (selectedTarget as SubmissionTargetNode)?.entity?.id ?? "";

  const defaultDepositTargetId =
    depositTargets.length === 1 ? depositTargets[0].id : "";
  const defaultSchemaVersionId =
    schemaVersions.length === 1 ? schemaVersions[0].id : "";

  const targetOptions = depositableTargets.map((target) => ({
    label: target.entity.title || target.id,
    value: target.id,
  }));

  const depositTargetOptions = depositTargets.map((dt) => ({
    label: dt.entity.title || dt.id,
    value: dt.id,
  }));

  const schemaVersionOptions = schemaVersions.map((sv) => ({
    label: sv.name,
    value: sv.id,
  }));

  const handleSuccess = useOnSuccess<SubmissionCreateFormMutation, Fields>(
    ({ response }) => {
      const slug = response?.submissionCreate?.submission?.slug;
      if (slug) {
        onSuccess(slug);
      }
    },
    [onSuccess],
  );

  const toVariables = useToVariables<SubmissionCreateFormMutation, Fields>(
    (data) => {
      if (isDescendant) {
        // For DESCENDANT: parentEntityId is the top-level collection,
        // submissionTargetId comes from the selected deposit target's entity's submissionTarget
        const depositTarget = depositTargets.find(
          (dt) => dt.id === data.depositTargetId,
        );
        const descendantSubmissionTargetId =
          depositTarget?.entity?.submissionTarget?.id ?? "";

        return {
          input: {
            title: data.title,
            submissionTargetId: descendantSubmissionTargetId,
            parentEntityId,
            schemaVersionId: data.schemaVersionId,
          },
        };
      }

      // For DIRECT: submissionTargetId is the selected target, parentEntityId is its entity
      return {
        input: {
          title: data.title,
          submissionTargetId: data.submissionTargetId,
          parentEntityId,
          schemaVersionId: data.schemaVersionId,
        },
      };
    },
    [isDescendant, depositTargets, parentEntityId],
  );

  const defaultValues: Partial<Fields> = {
    submissionTargetId: selectedTargetId,
    depositTargetId: defaultDepositTargetId,
    schemaVersionId: defaultSchemaVersionId,
  };

  const renderForm = useRenderForm<Fields>(
    ({ form: { register, watch, setValue } }) => {
      const watchedTargetId = watch("submissionTargetId");

      // When submission target changes, update dependent selects
      if (watchedTargetId !== selectedTargetId) {
        const newTarget = depositableTargets.find(
          (t) => t.id === watchedTargetId,
        );
        const newDepositTargets = newTarget?.depositTargets ?? [];
        const newSchemaVersions = newTarget?.schemaVersions ?? [];

        setSelectedTargetId(watchedTargetId);
        setValue(
          "depositTargetId",
          newDepositTargets.length === 1 ? newDepositTargets[0].id : "",
        );
        setValue(
          "schemaVersionId",
          newSchemaVersions.length === 1 ? newSchemaVersions[0].id : "",
        );
      }

      return (
        <Forms.Grid>
          <Forms.Input
            label="forms.fields.title"
            required
            isWide
            {...register("title")}
          />
          <Forms.Select
            label="forms.fields.submission_target"
            required
            isWide
            options={targetOptions}
            description={t("forms.fields.submission_target_description")}
            {...register("submissionTargetId")}
          />
          {isDescendant && !!depositTargetOptions.length && (
            <Forms.Select
              label="forms.fields.deposit_target"
              required
              isWide
              options={depositTargetOptions}
              placeholder={t("forms.fields.select_deposit_target")}
              {...register("depositTargetId")}
            />
          )}
          <Forms.Select
            label="forms.schema.label"
            required
            isWide
            options={schemaVersionOptions}
            description={t("forms.fields.submission_schema_description")}
            {...register("schemaVersionId")}
          />
          <MockInput
            label={t("forms.fields.depositing_agreement_short")}
            value="Agreement text goes here"
            isWide
          />
        </Forms.Grid>
      );
    },
    [
      preselectedTarget,
      targetOptions,
      depositTargetOptions,
      schemaVersionOptions,
      selectedTargetId,
      isDescendant,
    ],
  );

  return (
    <MutationForm<SubmissionCreateFormMutation, Fields>
      mutation={mutation}
      onSuccess={handleSuccess}
      onCancel={onCancel}
      successNotification="messages.create.submission_success"
      name="submissionCreate"
      refetchTags={["submissions"]}
      toVariables={toVariables}
      defaultValues={defaultValues}
    >
      {renderForm}
    </MutationForm>
  );
}

const mutation = graphql`
  mutation SubmissionCreateFormMutation($input: SubmissionCreateInput!) {
    submissionCreate(input: $input) {
      submission {
        slug
      }
      ...MutationForm_mutationErrors
    }
  }
`;
