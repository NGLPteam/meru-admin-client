import { useFragment, graphql } from "react-relay";
import { readInlineData, GraphQLTaggedNode } from "relay-runtime";
import pick from "lodash/pick";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
  useIsSuccess,
  useOnFailure,
} from "components/api/MutationForm";
import {
  communityHeroFieldDescription,
  logoFieldDescription,
} from "helpers/i18n";
import SchemaFormFields from "components/api/SchemaFormFields";
import { useSchemaContext, useSchemaProperties } from "components/api/hooks";
import { convertSchemaErrors } from "components/api/SchemaInstanceForm/convertSchemaErrors";
import { LoadingCircle } from "components/atomic";
import type {
  UpdateCommunityInput,
  CommunityUpdateFormMutation,
} from "@/relay/CommunityUpdateFormMutation.graphql";
import type { CommunityUpdateFormFragment$key } from "@/relay/CommunityUpdateFormFragment.graphql";
import type { CommunityUpdateFormFieldsFragment$key } from "@/relay/CommunityUpdateFormFieldsFragment.graphql";
import {
  CommunityUpdateFormSchemaErrorsFragment$data,
  CommunityUpdateFormSchemaErrorsFragment$key,
} from "@/relay/CommunityUpdateFormSchemaErrorsFragment.graphql";

type SchemaErrors =
  CommunityUpdateFormSchemaErrorsFragment$data["schemaErrors"];

export default function CommunityUpdateForm({
  data,
  onSuccess,
  onCancel,
}: Props) {
  const { communityId = "", ...fieldsData } =
    useFragment<CommunityUpdateFormFragment$key>(fragment, data);

  const { heroImage, logo, ...values } =
    useFragment<CommunityUpdateFormFieldsFragment$key>(
      fieldsFragment,
      fieldsData,
    );

  const schemaProperties = useSchemaProperties(fieldsData);

  const mutationName = "updateCommunity";

  const { fieldValues: schemaFieldValues, defaultValues: schemaDefaultValues } =
    useSchemaContext(fieldsData.context);

  const defaultValues = {
    ...values,
    ...schemaDefaultValues,
    ...schemaFieldValues,
  };
  const toVariables = useToVariables<CommunityUpdateFormMutation, Fields>(
    (data) => {
      const { heroImage, heroImageMetadata, ...inputValues } = pick(data, [
        "title",
        "tagline",
        "logo",
        "clearLogo",
        "summary",
        "heroImage",
        "clearHeroImage",
        "heroImageMetadata",
        "heroImageLayout",
        "position",
      ]);

      const schemaValues = pick(data, schemaProperties);

      return {
        input: {
          ...inputValues,
          ...(heroImage && { heroImage }),
          ...(heroImageMetadata && { heroImageMetadata }),
          schemaProperties: { ...schemaValues },
          communityId,
        },
      };
    },
    [schemaProperties],
  );

  const isSuccess = useIsSuccess<CommunityUpdateFormMutation, Fields>(
    function (response) {
      const errors =
        readInlineData<CommunityUpdateFormSchemaErrorsFragment$key>(
          schemaErrorsFragment as GraphQLTaggedNode,
          response[mutationName] ?? null,
        );

      return !errors?.schemaErrors || errors.schemaErrors.length === 0;
    },
    [mutationName],
  );

  const onFailure = useOnFailure<CommunityUpdateFormMutation, Fields>(
    function ({ response, setError }) {
      const errors =
        readInlineData<CommunityUpdateFormSchemaErrorsFragment$key>(
          schemaErrorsFragment as GraphQLTaggedNode,
          response[mutationName] ?? null,
        );

      if (errors?.schemaErrors) {
        const convertedErrors = convertSchemaErrors<SchemaErrors>(
          errors.schemaErrors,
        );

        for (const { path, error } of convertedErrors) {
          setError(path as keyof Fields, error);
        }
      }
    },
    [],
  );

  const renderForm = useRenderForm<Fields>(
    ({ form: { register } }) => (
      <>
        <Forms.Grid>
          <Forms.Input
            label="forms.fields.title"
            {...register("title")}
            isWide
            required
          />
          <Forms.Input
            label="forms.fields.tagline"
            {...register("tagline")}
            isWide
          />
          <Forms.FileImageUpload
            label="forms.fields.logo"
            name="logo"
            data={logo}
            clearName="clearLogo"
            description={logoFieldDescription}
            isWide
          />
          <Forms.Textarea
            label="forms.fields.summary"
            {...register("summary")}
            isWide
          />
          <Forms.Fieldset label="Hero">
            <Forms.FileImageUpload
              label="forms.fields.hero_image"
              name="heroImage"
              data={heroImage}
              clearName="clearHeroImage"
              description={communityHeroFieldDescription}
            />
            <Forms.AltText {...register("heroImageMetadata.alt")} />
            <Forms.Select
              label="forms.fields.hero_layout"
              options={[
                { label: "One Column", value: "ONE_COLUMN" },
                { label: "Two Column", value: "TWO_COLUMN" },
              ]}
              isWide
              required
              defaultValue="ONE_COLUMN"
              {...register("heroImageLayout")}
            />
          </Forms.Fieldset>
          <Forms.Input
            type="number"
            label="forms.fields.position"
            {...register("position", {
              valueAsNumber: true,
            })}
          />
        </Forms.Grid>
        <SchemaFormFields data={fieldsData} schemaKind="COMMUNITY" />
      </>
    ),
    [fieldsData],
  );

  // Don't load the form in until defaultValues and schemaFieldValues are defined
  return defaultValues.title && schemaFieldValues ? (
    <MutationForm<CommunityUpdateFormMutation, Fields>
      name={mutationName}
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.update.community_success"
      mutation={mutation}
      toVariables={toVariables}
      defaultValues={defaultValues}
      isSuccess={isSuccess}
      onFailure={onFailure}
      refetchTags={["communities"]}
    >
      {renderForm}
    </MutationForm>
  ) : (
    <LoadingCircle />
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  data: CommunityUpdateFormFragment$key;
}

type Fields = Omit<UpdateCommunityInput, "communityId">;

const fieldsFragment = graphql`
  fragment CommunityUpdateFormFieldsFragment on Community {
    title
    tagline
    summary
    heroImageLayout
    position
    heroImage {
      ...FileUploadFragment
    }
    logo {
      ...FileUploadFragment
    }
    heroImageMetadata {
      alt
    }
  }
`;

const mutation = graphql`
  mutation CommunityUpdateFormMutation($input: UpdateCommunityInput!) {
    updateCommunity(input: $input) {
      community {
        position
        ...CommunityUpdateFormFieldsFragment
        ...SchemaFormFieldsFragment
      }
      ...MutationForm_mutationErrors
      ...CommunityUpdateFormSchemaErrorsFragment
    }
  }
`;

const fragment = graphql`
  fragment CommunityUpdateFormFragment on Community {
    communityId: id
    ...CommunityUpdateFormFieldsFragment
    ...SchemaFormFieldsFragment
    ...useSchemaPropertiesFragment

    context: schemaInstanceContext {
      ...useSchemaContextFragment
    }
  }
`;

const schemaErrorsFragment = graphql`
  fragment CommunityUpdateFormSchemaErrorsFragment on UpdateCommunityPayload
  @inline {
    schemaErrors {
      hint
      message
      metadata
      path
    }
  }
`;
