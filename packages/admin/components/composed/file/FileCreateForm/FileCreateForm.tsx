import { graphql } from "react-relay";
import { Trans } from "react-i18next";
import MutationForm, {
  useRenderForm,
  Forms,
  useToVariables,
} from "components/api/MutationForm";

import type {
  FileCreateFormMutation,
  CreateAssetInput,
} from "@/relay/FileCreateFormMutation.graphql";

export default function FileCreateForm({ entityId, onSuccess }: Props) {
  /** Convert values to variables, pass in entityId */
  const toVariables = useToVariables<FileCreateFormMutation, Fields>(
    (data) => ({ input: { ...data, entityId } }),
    [entityId],
  );

  /** Render the form */
  const renderForm = useRenderForm<Fields>(
    ({ form: { register } }) => (
      <Forms.Grid>
        <Forms.Input label="forms.fields.name" {...register("name")} required />
        <Forms.FileUpload
          label="forms.fields.attachment"
          name="attachment"
          required
        />
        <Forms.Input
          label="forms.fields.alt_text"
          description={
            <Trans
              i18nKey="forms.fields.alt_text_description_file"
              components={[
                <a
                  key="link"
                  href="https://webaim.org/techniques/alttext/"
                  target="_blank"
                  rel="noreferrer"
                  className="a-link"
                >
                  #
                </a>,
              ]}
            />
          }
          {...register("altText")}
        />
        <Forms.Textarea
          label="forms.fields.caption"
          description="forms.fields.caption_description"
          {...register("caption")}
        />
      </Forms.Grid>
    ),
    [],
  );

  return (
    <MutationForm<FileCreateFormMutation, Fields>
      name="createAsset"
      mutation={mutation}
      onSuccess={onSuccess}
      successNotification="messages.add.file_success"
      toVariables={toVariables}
      refetchTags={["assets"]}
    >
      {renderForm}
    </MutationForm>
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess"
> {
  entityId: string;
}

type Fields = Omit<CreateAssetInput, "entityId">;

const mutation = graphql`
  mutation FileCreateFormMutation($input: CreateAssetInput!) {
    createAsset(input: $input) {
      asset {
        ... on Asset {
          id
          name
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;
