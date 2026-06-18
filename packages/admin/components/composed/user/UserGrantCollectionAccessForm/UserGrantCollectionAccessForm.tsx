import { Suspense } from "react";
import { graphql } from "react-relay";
import MutationForm, { Forms } from "components/api/MutationForm";
import { NodeRoleSelect } from "components/forms/RoleSelect";
import { FormFieldSkeleton } from "components/atomic/loading";
import type {
  UserGrantCollectionAccessFormMutation as Mutation,
  GrantAccessInput as Fields,
} from "@/relay/UserGrantCollectionAccessFormMutation.graphql";

const UserGrantCollectionAccessForm = ({
  onSuccess,
  onCancel,
  userId,
}: Props) => {
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
      {({ form: { register, watch, control } }) => {
        const entityId = watch("entityId");

        return (
          <Forms.Grid>
            <input type="hidden" {...register("userId")} />
            <Suspense fallback={<FormFieldSkeleton />}>
              <Forms.CollectionTypeahead
                label="forms.fields.collection"
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

export default UserGrantCollectionAccessForm;

const mutation = graphql`
  mutation UserGrantCollectionAccessFormMutation($input: GrantAccessInput!) {
    grantAccess(input: $input) {
      ...MutationForm_mutationErrors
    }
  }
`;
