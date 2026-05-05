import { useRef } from "react";
import { graphql } from "react-relay";
import MutationForm, {
  useRenderForm,
  useToVariables,
  useOnSuccess,
  Forms,
} from "components/api/MutationForm";
import type {
  UpsertContributionInput,
  AddContributorFormMutation,
} from "@/relay/AddContributorFormMutation.graphql";
import type { UseFormReturn } from "react-hook-form";

type Fields = Pick<
  UpsertContributionInput,
  "contributorId" | "roleId" | "outerPosition"
>;

interface Props {
  itemId: string;
  onClose: () => void;
}

export default function AddContributorForm({ itemId, onClose }: Props) {
  const formRef = useRef<UseFormReturn<Fields> | null>(null);

  const onSuccess = useOnSuccess<AddContributorFormMutation, Fields>(() => {
    formRef.current?.reset();
    onClose();
  }, [onClose]);

  const toVariables = useToVariables<AddContributorFormMutation, Fields>(
    (data) => ({
      input: {
        contributableId: itemId,
        contributorId: data.contributorId,
        roleId: data.roleId || undefined,
        outerPosition:
          data.outerPosition === undefined || Number.isNaN(data.outerPosition)
            ? undefined
            : data.outerPosition,
      },
    }),
    [itemId],
  );

  const renderForm = useRenderForm<Fields>(
    ({ form }) => {
      formRef.current = form;
      return (
        <Forms.Grid>
          <Forms.ContributorTypeahead<Fields>
            control={form.control}
            name="contributorId"
            label="forms.fields.name"
            required
          />
          <Forms.ContributionRoleSelect
            id={itemId}
            label="forms.fields.role"
            {...form.register("roleId")}
          />
          <Forms.Input
            type="number"
            label="forms.fields.position"
            description="forms.fields.order_description_submission"
            {...form.register("outerPosition", { valueAsNumber: true })}
          />
        </Forms.Grid>
      );
    },
    [itemId],
  );

  return (
    <MutationForm<AddContributorFormMutation, Fields>
      name="upsertContribution"
      mutation={mutation}
      toVariables={toVariables}
      onSuccess={onSuccess}
      onCancel={onClose}
      saveLabel="common.save"
      successNotification="messages.create.contribution_success"
      failureNotification="messages.create.contribution_failure"
      refetchTags={["contributions"]}
    >
      {renderForm}
    </MutationForm>
  );
}

const mutation = graphql`
  mutation AddContributorFormMutation($input: UpsertContributionInput!) {
    upsertContribution(input: $input) {
      contribution {
        ... on ItemContribution {
          id
          outerPosition
          contributionRole {
            id
            label
          }
          item {
            ...SubmissionContributorsFragment
          }
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;
