import { GraphQLTaggedNode, readInlineData } from "relay-runtime";
import { useFragment, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { getDateOnly } from "@wdp/lib/helpers";
import pick from "lodash/pick";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
  useIsSuccess,
  useOnFailure,
} from "components/api/MutationForm";
import { sanitizeDateField } from "helpers";
import { useSchemaContext, useSchemaProperties } from "components/api/hooks";
import { convertSchemaErrors } from "components/api/SchemaInstanceForm/convertSchemaErrors";
import SchemaFormFields from "components/api/SchemaFormFields";
import { LoadingCircle } from "components/atomic";
import {
  SubmissionUpdateForm_schemaErrorsFragment$data,
  // eslint-disable-next-line max-len
  SubmissionUpdateForm_schemaErrorsFragment$key as SchemaErrorsFragment$key,
} from "@/relay/SubmissionUpdateForm_schemaErrorsFragment.graphql";
import type { SubmissionUpdateFormFieldsFragment$key } from "@/relay/SubmissionUpdateFormFieldsFragment.graphql";
import type { SubmissionUpdateFormFragment$key } from "@/relay/SubmissionUpdateFormFragment.graphql";
import type {
  UpdateItemInput,
  SubmissionUpdateFormMutation,
} from "@/relay/SubmissionUpdateFormMutation.graphql";
import * as Styled from "./SubmissionUpdateForm.styles";

// eslint-disable-next-line camelcase, prettier/prettier
type SchemaErrors = SubmissionUpdateForm_schemaErrorsFragment$data["schemaErrors"];

export default function SubmissionUpdateForm({
  data,
  onSuccess,
  onCancel,
  onSaveAndClose,
}: Props) {
  const { t } = useTranslation();

  const mutationName = "updateItem";

  const submission = useFragment<SubmissionUpdateFormFragment$key>(
    fragment,
    data,
  );
  const { itemId = "", ...fieldsData } = submission;

  // eslint-disable prettier/prettier
  const { fieldValues: schemaFieldValues, defaultValues: schemaDefaultValues } =
    useSchemaContext(fieldsData.context);
  // eslint-enable prettier/prettier

  const schemaProperties = useSchemaProperties(fieldsData);

  const {
    thumbnail,
    heroImage,
    visibleAfterAt,
    visibleUntilAt,
    published,
    doiData,
    rawDOI,
    ...values
  } = useFragment<SubmissionUpdateFormFieldsFragment$key>(
    fieldsFragment,
    fieldsData,
  );

  const defaultValues = {
    ...values,
    title: values.title || undefined,
    visibleAfterAt: getDateOnly(visibleAfterAt),
    visibleUntilAt: getDateOnly(visibleUntilAt),
    doi: rawDOI,
    maintainPristineStatus: false,
    ...schemaDefaultValues,
    ...schemaFieldValues,
  };

  const isSuccess = useIsSuccess<SubmissionUpdateFormMutation, Fields>(
    function (response) {
      const errors = readInlineData<SchemaErrorsFragment$key>(
        schemaErrorsFragment as GraphQLTaggedNode,
        response[mutationName] ?? null,
      );

      return !errors?.schemaErrors || errors.schemaErrors.length === 0;
    },
    [mutationName],
  );

  const onFailure = useOnFailure<SubmissionUpdateFormMutation, Fields>(
    function ({ response, setError }) {
      const errors = readInlineData<SchemaErrorsFragment$key>(
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

  const toVariables = useToVariables<SubmissionUpdateFormMutation, Fields>(
    (data) => {
      const inputValues = pick(data, [
        "title",
        "subtitle",
        "doi",
        "thumbnail",
        "clearThumbnail",
        "heroImage",
        "clearHeroImage",
        "summary",
        "published",
        "visibility",
        "visibleAfterAt",
        "visibleUntilAt",
        "maintainPristineStatus",
      ]);

      const schemaValues = pick(data, schemaProperties);

      return {
        input: {
          ...inputValues,
          itemId,
          visibleAfterAt: sanitizeDateField(data.visibleAfterAt),
          visibleUntilAt: sanitizeDateField(data.visibleUntilAt),
          schemaProperties: {
            ...schemaValues,
          },
        },
      };
    },
    [schemaProperties],
  );

  const renderForm = useRenderForm<Fields>(
    ({ form: { register } }) => {
      return (
        <>
          <Styled.Wrapper>
            <Forms.Grid>
              <Forms.Input
                label="forms.fields.title"
                {...register("title")}
                required
                isWide
              />
              <Forms.Input
                label="forms.fields.subtitle"
                isWide
                {...register("subtitle")}
              />
              <Forms.Textarea
                label="forms.fields.short_description"
                description="forms.fields.short_description_description"
                {...register("summary")}
                isWide
                minHeight={124}
              />
              <Forms.FileImageUpload
                label="forms.fields.thumbnail"
                name="thumbnail"
                data={thumbnail}
                clearName="clearThumbnail"
                description="forms.fields.thumbnail_description"
              />
              <Forms.FileImageUpload
                label="forms.fields.hero_image"
                name="heroImage"
                data={heroImage}
                clearName="clearHeroImage"
                description="forms.fields.hero_image_description"
              />
            </Forms.Grid>
          </Styled.Wrapper>
          <SchemaFormFields data={fieldsData} schemaKind="ITEM" isSubmission />
        </>
      );
    },
    [fieldsData],
  );

  // Don't load the form in until defaultValues and schemaFieldValues are defined
  return defaultValues && schemaFieldValues ? (
    <MutationForm<SubmissionUpdateFormMutation, Fields>
      name={mutationName}
      onSuccess={onSuccess}
      onSaveAndClose={onSaveAndClose}
      onCancel={onCancel}
      successNotification={t("messages.update.submission_success")}
      mutation={mutation}
      toVariables={toVariables}
      defaultValues={defaultValues}
      isSuccess={isSuccess}
      onFailure={onFailure}
    >
      {renderForm}
    </MutationForm>
  ) : (
    <LoadingCircle />
  );
}

interface Props
  extends Pick<
    React.ComponentProps<typeof MutationForm>,
    "onSuccess" | "onCancel" | "onSaveAndClose"
  > {
  data: SubmissionUpdateFormFragment$key;
  mode?: "admin" | "depositor";
}

type Fields = Omit<UpdateItemInput, "itemId">;

const fieldsFragment = graphql`
  fragment SubmissionUpdateFormFieldsFragment on Item {
    title
    subtitle
    doiData {
      doi
    }
    rawDOI
    visibility
    summary
    visibleAfterAt
    visibleUntilAt
    thumbnail {
      ...FileUploadFragment
    }
    heroImage {
      ...FileUploadFragment
    }
    published {
      ...VariablePrecisionDateControlFragment
    }
  }
`;

const mutation = graphql`
  mutation SubmissionUpdateFormMutation($input: UpdateItemInput!) {
    updateItem(input: $input) {
      item {
        ...SubmissionUpdateFormFieldsFragment
        ...SchemaFormFieldsFragment
        ...HarvestingStatusFragment
      }
      ...MutationForm_mutationErrors
      ...SubmissionUpdateForm_schemaErrorsFragment
    }
  }
`;

const fragment = graphql`
  fragment SubmissionUpdateFormFragment on Item {
    itemId: id
    ...ParentSelectorFragment
    ...HarvestingStatusFragment

    context: schemaInstanceContext {
      ...useSchemaContextFragment
    }

    ...SubmissionUpdateFormFieldsFragment
    ...SchemaFormFieldsFragment
    ...useSchemaPropertiesFragment
  }
`;

const schemaErrorsFragment = graphql`
  fragment SubmissionUpdateForm_schemaErrorsFragment on UpdateItemPayload
  @inline {
    schemaErrors {
      hint
      message
      metadata
      path
    }
  }
`;
