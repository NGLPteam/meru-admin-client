import { Suspense } from "react";
import { graphql } from "react-relay";
import MutationForm, { Forms } from "components/api/MutationForm";
import { FormFieldSkeleton } from "components/atomic/loading";
import { NodeRoleSelect } from "components/forms/RoleSelect";
import type {
  UserGrantItemAccessFormMutation as Mutation,
  GrantAccessInput as Fields,
} from "@/relay/UserGrantItemAccessFormMutation.graphql";

const UserGrantItemAccessForm = ({ onSuccess, onCancel, userId }: Props) => {
  const defaultValues = {
    userId,
  };

  return (
    <MutationForm<Mutation, Fields>
      mutation={mutation}
      name="grantAccess"
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.add.access_success"
      defaultValues={defaultValues}
      refetchTags={["allAccessGrants"]}
    >
      {({ form: { register, control, watch } }) => {
        const entityId = watch("entityId");

        return (
          <Forms.Grid>
            <input type="hidden" {...register("userId")} />
            <Suspense fallback={<FormFieldSkeleton />}>
              <Forms.ItemTypeahead
                label="forms.fields.item"
                name="entityId"
                control={control}
              />
            </Suspense>
            <Suspense fallback={<FormFieldSkeleton />}>
              <NodeRoleSelect nodeId={entityId} name="roleId" required />
            </Suspense>
          </Forms.Grid>
        );
      }}
    </MutationForm>
  );
};

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  userId?: string;
}

export default UserGrantItemAccessForm;

const mutation = graphql`
  mutation UserGrantItemAccessFormMutation($input: GrantAccessInput!) {
    grantAccess(input: $input) {
      ...MutationForm_mutationErrors
    }
  }
`;
