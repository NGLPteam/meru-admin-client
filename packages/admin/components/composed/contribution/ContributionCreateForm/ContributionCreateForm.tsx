import { Suspense } from "react";
import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import MutationForm, {
  useRenderForm,
  Forms,
} from "components/api/MutationForm";
import EntitySelectorDisclosure from "components/forms/EntitySelector/EntitySelectorDisclosure";
import { FormFieldSkeleton } from "components/atomic/loading";
import type {
  UpsertContributionInput,
  ContributionCreateFormMutation,
} from "@/relay/ContributionCreateFormMutation.graphql";

export default function ContributionCreateForm({
  contributorId,
  contributorName,
  contributableId,
  contributableName,
  onSuccess,
  onCancel,
  type,
}: Props) {
  const { t } = useTranslation();

  /** Render the form */
  const renderForm = useRenderForm<Fields>(
    ({ form: { register, control, setValue } }) => {
      const onSelect = (id: string) => setValue("contributableId", id);
      return (
        <Forms.Grid>
          {contributorId ? (
            <>
              <Forms.Input
                name=""
                label="forms.fields.contributor"
                disabled
                defaultValue={contributorName}
              />
              <input
                type="hidden"
                {...register("contributorId")}
                defaultValue={contributorId}
              />
            </>
          ) : (
            <Suspense fallback={<FormFieldSkeleton />}>
              <Forms.ContributorTypeahead<Fields>
                control={control}
                name="contributorId"
                label="forms.fields.contributor"
                required
              />
            </Suspense>
          )}
          {contributableId ? (
            <>
              <Forms.Input
                name=""
                label={`forms.fields.${type}`}
                disabled
                defaultValue={contributableName}
              />
              <input
                type="hidden"
                {...register("contributableId")}
                defaultValue={contributableId}
              />
            </>
          ) : (
            <EntitySelectorDisclosure
              {...register("contributableId", { required: true })}
              onSelect={onSelect}
              label={
                type === "item"
                  ? t("forms.fields.item")
                  : t("forms.fields.collection")
              }
              selectableTypes={{
                kinds: [type === "item" ? "ITEM" : "COLLECTION"],
              }}
            />
          )}
          <Forms.ContributionRoleSelect
            id={contributableId}
            label="forms.fields.role"
            {...register("roleId")}
          />
          <Forms.Fieldset
            label={t("forms.fields.position")}
            description={t("forms.fields.order_description")}
          >
            <Forms.Input
              type="number"
              label="forms.fields.inner_position"
              description="forms.fields.inner_position_description"
              {...register("innerPosition", { valueAsNumber: true })}
            />
            <Forms.Input
              type="number"
              label="forms.fields.outer_position"
              description="forms.fields.outer_position_description"
              {...register("outerPosition", { valueAsNumber: true })}
            />
          </Forms.Fieldset>
        </Forms.Grid>
      );
    },
    [],
  );

  /** Return the mutation form */
  return (
    <MutationForm<ContributionCreateFormMutation, Fields>
      name="upsertContribution"
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.create.contribution_success"
      failureNotification="messages.create.contribution_failure"
      mutation={mutation}
      refetchTags={["contributions"]}
    >
      {renderForm}
    </MutationForm>
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  /** The contributor */
  contributorId?: string;
  contributorName?: string;
  /** The entity that should own the contribution */
  contributableId?: string;
  contributableName?: string;
  /** The type of entity */
  type: "item" | "collection" | string;
}

type Fields = UpsertContributionInput;

const mutation = graphql`
  mutation ContributionCreateFormMutation($input: UpsertContributionInput!) {
    upsertContribution(input: $input) {
      contribution {
        ... on CollectionContribution {
          contributionRole {
            id
            label
          }
        }
        ... on ItemContribution {
          contributionRole {
            id
            label
          }
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;
