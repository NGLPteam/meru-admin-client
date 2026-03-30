import { useEffect } from "react";
import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
  useOnSuccess,
} from "components/api/MutationForm";
import type { DetailsStepMutation } from "@/relay/DetailsStepMutation.graphql";
import type { SubmissionTargetNode, Fields } from "../types";

type Props = {
  selectedTarget?: SubmissionTargetNode;
  selectedDescendantId: string;
  onSuccess: (slug: string) => void;
  onCancel: () => void;
};

export default function DetailsStep({
  selectedTarget,
  selectedDescendantId,
  onSuccess,
  onCancel,
}: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemaVersions = selectedTarget?.schemaVersions ?? [];
  const schemaVersionOptions = schemaVersions.map((sv) => ({
    label: sv.name,
    value: sv.id,
  }));

  const defaultSchemaVersionId =
    schemaVersions.length === 1 ? schemaVersions[0].id : "";

  const handleSuccess = useOnSuccess<DetailsStepMutation, Fields>(
    ({ response }) => {
      const slug = response?.submissionCreate?.submission?.slug;
      if (slug) {
        onSuccess(slug);
      }
    },
    [onSuccess],
  );

  const toVariables = useToVariables<DetailsStepMutation, Fields>(
    (data) => {
      if (selectedTarget?.depositMode === "DESCENDANT") {
        return {
          input: {
            title: data.title,
            submissionTargetId: selectedDescendantId ?? "",
            parentEntityId: selectedTarget.entity.id ?? "",
            schemaVersionId: data.schemaVersionId,
          },
        };
      }

      return {
        input: {
          title: data.title,
          submissionTargetId: selectedTarget?.id ?? "",
          parentEntityId: selectedTarget?.entity.id ?? "",
          schemaVersionId: data.schemaVersionId,
        },
      };
    },
    [selectedTarget, selectedDescendantId],
  );

  const defaultValues: Partial<Fields> = {
    schemaVersionId: defaultSchemaVersionId,
  };

  const renderForm = useRenderForm<Fields>(
    ({ form: { register } }) => {
      return (
        <Forms.Grid>
          <Forms.Select
            label="forms.fields.submission_schema"
            required
            isWide
            options={schemaVersionOptions}
            description={t("forms.fields.submission_schema_description")}
            {...register("schemaVersionId")}
          />
          <Forms.Input
            label="forms.fields.title"
            required
            isWide
            {...register("title")}
          />
        </Forms.Grid>
      );
    },
    [schemaVersionOptions],
  );

  return (
    <MutationForm<DetailsStepMutation, Fields>
      mutation={mutation}
      onSuccess={handleSuccess}
      onCancel={onCancel}
      successNotification="messages.create.submission_success"
      name="submissionCreate"
      refetchTags={["submissions"]}
      toVariables={toVariables}
      defaultValues={defaultValues}
      saveLabel="common.save_and_continue"
    >
      {renderForm}
    </MutationForm>
  );
}

const mutation = graphql`
  mutation DetailsStepMutation($input: SubmissionCreateInput!) {
    submissionCreate(input: $input) {
      submission {
        slug
      }
      ...MutationForm_mutationErrors
    }
  }
`;
