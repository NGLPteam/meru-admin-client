import { Suspense } from "react";
import MutationForm, { Forms } from "components/api/MutationForm";
import { graphql } from "react-relay";
import UserTypeahead from "components/forms/UserTypeahead";
import RoleSelect from "components/forms/RoleSelect";
import { useMaybeFragment } from "hooks";
import { FormFieldSkeleton } from "components/atomic/loading";
import type {
  RoleGrantAccessFormMutation as Mutation,
  GrantAccessInput as Fields,
} from "@/relay/RoleGrantAccessFormMutation.graphql";
import { RoleGrantAccessFormRolesFragment$key } from "@/relay/RoleGrantAccessFormRolesFragment.graphql";

const RoleGrantAccessForm = ({
  rolesData,
  onSuccess,
  onCancel,
  entityId,
}: Props) => {
  const roles = useMaybeFragment(rolesFragment, rolesData);

  const defaultValues = {
    entityId,
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
      {({ form: { register, control } }) => (
        <Forms.Grid>
          <input type="hidden" {...register("entityId")} />
          <Suspense fallback={<FormFieldSkeleton />}>
            <UserTypeahead
              label="forms.fields.user"
              name="userId"
              control={control}
            />
          </Suspense>
          <Suspense fallback={<FormFieldSkeleton />}>
            <RoleSelect
              label="forms.fields.role"
              data={roles}
              {...register("roleId")}
            />
          </Suspense>
        </Forms.Grid>
      )}
    </MutationForm>
  );
};

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  entityId?: string;
  rolesData?: RoleGrantAccessFormRolesFragment$key | null;
}

export default RoleGrantAccessForm;

const rolesFragment = graphql`
  fragment RoleGrantAccessFormRolesFragment on Entity {
    ...RoleSelectFragment
  }
`;

const mutation = graphql`
  mutation RoleGrantAccessFormMutation($input: GrantAccessInput!) {
    grantAccess(input: $input) {
      ...MutationForm_mutationErrors
    }
  }
`;
