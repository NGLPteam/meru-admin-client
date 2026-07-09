import { graphql } from "react-relay";
import MutationForm, {
  useRenderForm,
  Forms,
} from "components/api/MutationForm";
import type {
  ContributorCreatePersonFormMutation,
  CreatePersonContributorInput,
} from "@/relay/ContributorCreatePersonFormMutation.graphql";

export default function ContributorCreatePersonForm({
  onSuccess,
  onCancel,
}: Props) {
  const renderForm = useRenderForm<Fields>(
    ({ form: { register, control } }) => (
      <Forms.Grid>
        <Forms.Input
          label="forms.fields.given_name"
          {...register("givenName")}
        />
        <Forms.Input
          label="forms.fields.family_name"
          {...register("familyName")}
        />
        <Forms.FileImageUpload label="forms.fields.image" name="image" />
        <Forms.Input label="forms.fields.title" {...register("title")} />
        <Forms.Email
          label="forms.fields.email"
          {...register("email")}
          description="Format: example@email.com"
        />
        <Forms.Input
          label="forms.fields.orcid"
          description="forms.fields.orcid_description"
          {...register("orcid")}
        />
        <Forms.Input
          label="forms.fields.affiliation"
          {...register("affiliation")}
        />
        <Forms.Textarea label="forms.fields.bio" {...register("bio")} />
        <Forms.LinksRepeater<Fields>
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
    <MutationForm<ContributorCreatePersonFormMutation, Fields>
      mutation={mutation}
      name="createPersonContributor"
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.create.contributor_success"
      refetchTags={["contributors"]}
    >
      {renderForm}
    </MutationForm>
  );
}

type Props = Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
>;

type Fields = Omit<CreatePersonContributorInput, "clientMutationId" | "image">;

const mutation = graphql`
  mutation ContributorCreatePersonFormMutation(
    $input: CreatePersonContributorInput!
  ) {
    createPersonContributor(input: $input) {
      contributor {
        __typename
        givenName
        familyName
        title
        email
        affiliation
        bio
        orcid
        image {
          thumb {
            png {
              alt
              url
            }
          }
        }
        links {
          title
          url
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;
