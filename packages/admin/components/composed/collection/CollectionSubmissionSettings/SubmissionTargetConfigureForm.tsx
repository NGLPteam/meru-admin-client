import { useState, useCallback } from "react";
import { useFragment, useMutation, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import MutationForm, {
  useRenderForm,
  useToVariables,
  useOnSuccess,
  Forms,
} from "components/api/MutationForm";
import Multiselect from "components/forms/Multiselect";
import EntitySelectorDisclosure from "components/forms/EntitySelector/EntitySelectorDisclosure";
import BaseArrayList, {
  BaseArrayListItem,
} from "components/forms/BaseArrayList";
import { useRouteSlug, useNotify } from "hooks";
import type { SubmissionTargetConfigureFormFragment$key } from "@/relay/SubmissionTargetConfigureFormFragment.graphql";
import type {
  SubmissionTargetConfigureInput,
  SubmissionTargetConfigureFormMutation,
} from "@/relay/SubmissionTargetConfigureFormMutation.graphql";
import type {
  SubmissionTargetConfigureFormOpenMutation,
  SubmissionTargetConfigureFormOpenMutation$data,
} from "@/relay/SubmissionTargetConfigureFormOpenMutation.graphql";
import type { submissionsManageSlugCollectionsPagesQuery$data } from "@/relay/submissionsManageSlugCollectionsPagesQuery.graphql";

type DepositTarget = {
  id: string;
  title: string;
};

export default function SubmissionTargetConfigureForm({
  collectionId,
  data,
  schemaVersionOptions,
}: Props) {
  const { t } = useTranslation();
  const collectionSlug = useRouteSlug() as string;

  const notify = useNotify();

  const target = useFragment<SubmissionTargetConfigureFormFragment$key>(
    fragment,
    data,
  );

  const [commitOpen] =
    useMutation<SubmissionTargetConfigureFormOpenMutation>(openMutation);

  const configurableId = target?.targetId ?? collectionId;

  const schemaOptions = schemaVersionOptions.map((opt) => ({
    label: opt.label,
    value: opt.schemaVersion.id,
  }));

  const initialSchemaVersionIds =
    target?.schemaVersions?.map((sv) => sv.id) ?? [];

  const initialTargets: DepositTarget[] =
    target?.depositTargets
      ?.filter((dt) => dt.entity.id)
      .map((dt) => ({
        id: dt.entity.id!,
        title: dt.entity.title,
      })) ?? [];

  const [depositTargets, setDepositTargets] =
    useState<DepositTarget[]>(initialTargets);

  const handleAddTarget = useCallback((id: string, title: string) => {
    setDepositTargets((prev) => {
      if (prev.some((t) => t.id === id)) return prev;
      return [...prev, { id, title }];
    });
  }, []);

  const handleRemoveTarget = useCallback((id: string) => {
    setDepositTargets((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const defaultValues: SubmissionTargetConfigureInput = {
    configurableId,
    depositMode:
      target?.depositMode === "DIRECT" || target?.depositMode === "DESCENDANT"
        ? target.depositMode
        : "DIRECT",
    description: {
      instructions: target?.description?.instructions ?? "",
      internal: target?.description?.internal ?? "",
      sections: [],
    },
    agreementRequired: target?.agreementRequired ?? false,
    agreementContent: target?.agreementContent ?? "",
    schemaVersionIds: initialSchemaVersionIds,
  };

  const toVariables = useToVariables<
    SubmissionTargetConfigureFormMutation,
    SubmissionTargetConfigureInput
  >(
    (data) => ({
      input: {
        ...data,
        configurableId,
        depositTargetIds: depositTargets.map((t) => t.id),
      },
    }),
    [configurableId, depositTargets],
  );

  const handleOpenResponse = useCallback(
    (response: SubmissionTargetConfigureFormOpenMutation$data) => {
      const { submissionTarget, globalErrors } =
        response.submissionTargetOpen ?? {};

      if (submissionTarget) {
        notify.success(t("actions.submissions.submissions_opened"));
      } else if (globalErrors?.length) {
        notify.mutationGlobalError(globalErrors);
      }
    },
    [notify, t],
  );

  const onSuccess = useOnSuccess<SubmissionTargetConfigureFormMutation>(
    ({ response }) => {
      const submissionTargetId =
        response.submissionTargetConfigure?.submissionTarget?.id;

      if (!target && submissionTargetId) {
        commitOpen({
          variables: { input: { submissionTargetId } },
          onCompleted: handleOpenResponse,
          onError: (err) => notify.error(err.message),
        });
      }
    },
    [target, commitOpen, notify, t],
  );

  const renderForm = useRenderForm<SubmissionTargetConfigureInput>(
    ({ form: { register, watch, control } }) => (
      <Forms.Grid>
        <Forms.Select
          label="forms.fields.deposit_mode"
          options={[
            {
              label: t("forms.fields.deposit_mode_direct"),
              value: "DIRECT",
            },
            {
              label: t("forms.fields.deposit_mode_descendant"),
              value: "DESCENDANT",
            },
          ]}
          required
          isWide
          description={t("forms.fields.deposit_mode_description")}
          {...register("depositMode")}
        />
        <Forms.HiddenField<SubmissionTargetConfigureInput>
          watch={watch}
          field="depositMode"
          showOn="DESCENDANT"
          isWide
        >
          <Forms.Fieldset
            label={t("forms.fields.deposit_targets")}
            description={t("forms.fields.deposit_targets_description")}
          >
            {depositTargets.length > 0 && (
              <BaseArrayList>
                {depositTargets.map((dt) => (
                  <BaseArrayListItem
                    key={dt.id}
                    onRemove={() => handleRemoveTarget(dt.id)}
                  >
                    {dt.title}
                  </BaseArrayListItem>
                ))}
              </BaseArrayList>
            )}
            <EntitySelectorDisclosure
              name="depositTarget"
              label={t("forms.fields.add_deposit_target")}
              startSlug={collectionSlug}
              onSelect={(id, entity) => {
                if (id) handleAddTarget(id, entity?.title ?? id);
              }}
              selectableTypes={{
                kinds: ["COLLECTION", "ITEM"],
              }}
            />
          </Forms.Fieldset>
        </Forms.HiddenField>
        <Controller
          name="schemaVersionIds"
          control={control}
          render={({ field }) => (
            <Multiselect
              label={t("forms.fields.accepted_schemas")}
              description="forms.fields.accepted_schemas_description"
              options={schemaOptions}
              required
              isWide
              {...field}
              value={[...(field.value ?? [])]}
            />
          )}
        />
        <Forms.Textarea
          label="forms.fields.submission_instructions"
          description="forms.fields.submission_instructions_description"
          isWide
          {...register("description.instructions")}
        />
        <Forms.Textarea
          label="forms.fields.submission_internal_notes"
          isWide
          {...register("description.internal")}
        />
        <Forms.Switch
          label="forms.fields.agreement_required"
          hideLabel
          isWide
          text={t("forms.fields.agreement_required")}
          description="forms.fields.agreement_required_description"
          {...register("agreementRequired")}
        />
        <Forms.Textarea
          label="forms.fields.agreement_content"
          description="forms.fields.agreement_content_description"
          isWide
          {...register("agreementContent")}
        />
      </Forms.Grid>
    ),
    [
      depositTargets,
      handleAddTarget,
      handleRemoveTarget,
      schemaOptions,
      collectionSlug,
      t,
    ],
  );

  return (
    <MutationForm<
      SubmissionTargetConfigureFormMutation,
      SubmissionTargetConfigureInput
    >
      name="submissionTargetConfigure"
      mutation={mutation}
      toVariables={toVariables}
      defaultValues={defaultValues}
      onSuccess={onSuccess}
      successNotification="messages.update.submission_target_success"
      failureNotification="messages.update.submission_target_failure"
      refetchTags={["submissions"]}
    >
      {renderForm}
    </MutationForm>
  );
}

interface Props {
  collectionId: string;
  data: SubmissionTargetConfigureFormFragment$key | null;
  schemaVersionOptions: submissionsManageSlugCollectionsPagesQuery$data["schemaVersionOptions"];
}

const fragment = graphql`
  fragment SubmissionTargetConfigureFormFragment on SubmissionTarget {
    targetId: id
    depositMode
    agreementRequired
    agreementContent
    description {
      instructions
      internal
    }
    schemaVersions {
      id
      name
    }
    depositTargets {
      entity {
        ... on Node {
          id
        }
        ... on Entity {
          title
        }
      }
    }
  }
`;

const mutation = graphql`
  mutation SubmissionTargetConfigureFormMutation(
    $input: SubmissionTargetConfigureInput!
  ) {
    submissionTargetConfigure(input: $input) {
      submissionTarget {
        id
        ...SubmissionTargetConfigureFormFragment
        ...SubmissionTargetStateToggleFragment
      }
      ...MutationForm_mutationErrors
    }
  }
`;

const openMutation = graphql`
  mutation SubmissionTargetConfigureFormOpenMutation(
    $input: SubmissionTargetOpenInput!
  ) {
    submissionTargetOpen(input: $input) {
      submissionTarget {
        id
        state
      }
      globalErrors {
        message
        type
      }
    }
  }
`;
