import { useFragment, graphql } from "react-relay";
import compact from "lodash/compact";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
} from "components/api/MutationForm";

import type { ContributorUpdateOrganizationFormFragment$key } from "@/relay/ContributorUpdateOrganizationFormFragment.graphql";
import type {
  UpdateOrganizationContributorInput,
  ContributorUpdateOrganizationFormMutation,
} from "@/relay/ContributorUpdateOrganizationFormMutation.graphql";
import type { ContributorUpdateOrganizationFormFieldsFragment$key } from "@/relay/ContributorUpdateOrganizationFormFieldsFragment.graphql";

export default function ContributorUpdateOrganizationForm({
  data,
  onSuccess,
  onCancel,
}: Props) {
  const { contributorId = "", ...fieldsData } = useFragment(fragment, data);

  const { image, links, ...otherValues } =
    useFragment<ContributorUpdateOrganizationFormFieldsFragment$key>(
      fieldsFragment,
      fieldsData,
    );

  // We need to transform the links value to a mutable value and remove nulls to satisfy
  // our type checker.
  const defaultValues = {
    ...otherValues,
    links: links ? [...compact(links)] : [],
  };

  const toVariables = useToVariables<
    ContributorUpdateOrganizationFormMutation,
    Fields
  >((data) => ({ input: { ...data, contributorId } }), []);

  const renderForm = useRenderForm<Fields>(
    ({ form: { register, control } }) => (
      <Forms.Grid>
        <Forms.Input
          label="forms.fields.legal_name"
          isWide
          {...register("legalName")}
        />
        <Forms.Email
          label="forms.fields.email"
          description="Format: example@email.com"
          {...register("email")}
        />
        <Forms.Input
          label="forms.fields.orcid"
          description="forms.fields.orcid_description"
          {...register("orcid")}
        />
        <Forms.Input label="forms.fields.location" {...register("location")} />
        <Forms.Input label="forms.fields.url" {...register("url")} />
        <Forms.FileImageUpload
          name="image"
          data={image}
          clearName="clearImage"
        />
        <Forms.Textarea label="forms.fields.bio" {...register("bio")} />
        <Forms.LinksRepeater
          label="forms.fields.links"
          itemLabel="forms.fields.link"
          name="links"
          register={register}
          control={control}
        />
      </Forms.Grid>
    ),
    [],
  );

  return (
    <MutationForm<ContributorUpdateOrganizationFormMutation, Fields>
      name="updateOrganizationContributor"
      mutation={mutation}
      toVariables={toVariables}
      defaultValues={defaultValues}
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.update.contributor_success"
      refetchTags={["contributors"]}
    >
      {renderForm}
    </MutationForm>
  );
}

type Fields = Omit<
  UpdateOrganizationContributorInput,
  "contributorId" | "image"
>;

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  data: ContributorUpdateOrganizationFormFragment$key;
}

const fieldsFragment = graphql`
  fragment ContributorUpdateOrganizationFormFieldsFragment on Contributor {
    ... on OrganizationContributor {
      legalName
      email
      location
      bio
      url
      orcid
      image {
        ...FileUploadFragment
      }
      links {
        title
        url
      }
    }
  }
`;

const mutation = graphql`
  mutation ContributorUpdateOrganizationFormMutation(
    $input: UpdateOrganizationContributorInput!
  ) {
    updateOrganizationContributor(input: $input) {
      contributor {
        ...ContributorUpdateOrganizationFormFieldsFragment
      }
      ...MutationForm_mutationErrors
    }
  }
`;

const fragment = graphql`
  fragment ContributorUpdateOrganizationFormFragment on Contributor {
    ... on OrganizationContributor {
      contributorId: id
      ...ContributorUpdateOrganizationFormFieldsFragment
    }
  }
`;
