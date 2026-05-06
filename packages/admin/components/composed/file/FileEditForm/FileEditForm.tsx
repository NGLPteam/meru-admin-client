import { useFragment, graphql } from "react-relay";
import MutationForm, {
  useRenderForm,
  Forms,
  useToVariables,
} from "components/api/MutationForm";

import type {
  FileEditFormMutation,
  UpdateAssetInput,
} from "@/relay/FileEditFormMutation.graphql";
import { FileEditFormFragment$key } from "@/relay/FileEditFormFragment.graphql";

export default function FileEditForm({ data, onSuccess }: Props) {
  const {
    id,
    preview,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    previewMetadata: _previewMetadata,
    kind,
    fileSize,
    ...values
  } = useFragment(fragment, data);

  const toVariables = useToVariables<FileEditFormMutation, Fields>(
    (data) => ({
      input: { ...data, assetId: id },
    }),
    [id],
  );

  /** Render the form */
  const renderForm = useRenderForm<Fields>(
    ({ form: { register } }) => (
      <Forms.Grid>
        <Forms.Input label="forms.fields.name" {...register("name")} required />
        <Forms.FileUpload
          label="forms.fields.attachment"
          name="attachment"
          data={preview}
          kind={kind}
          fileSize={fileSize}
          required
        />
        <Forms.Input label="forms.fields.alt_text" {...register("altText")} />
        <Forms.Textarea label="forms.fields.caption" {...register("caption")} />
      </Forms.Grid>
    ),
    [],
  );

  return (
    <MutationForm<FileEditFormMutation, Fields>
      name="updateAsset"
      mutation={mutation}
      onSuccess={onSuccess}
      successNotification="messages.update.file_success"
      failureNotification="messages.update.file_failure"
      refetchTags={["properties", "assets"]}
      toVariables={toVariables}
      defaultValues={values}
    >
      {renderForm}
    </MutationForm>
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess"
> {
  data: FileEditFormFragment$key;
}

type Fields = Omit<UpdateAssetInput, "entityId">;

const mutation = graphql`
  mutation FileEditFormMutation($input: UpdateAssetInput!) {
    updateAsset(input: $input) {
      asset {
        ... on Asset {
          ...FileEditFormFragment
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;

const fragment = graphql`
  fragment FileEditFormFragment on Asset {
    id
    altText
    name
    caption
    kind
    fileSize
    preview {
      ...FileUploadFragment
    }
    previewMetadata {
      alt
    }
  }
`;
