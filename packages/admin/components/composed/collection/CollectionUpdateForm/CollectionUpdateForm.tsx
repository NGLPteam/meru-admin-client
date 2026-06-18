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
import SchemaFormFields from "components/api/SchemaFormFields";
import HarvestingStatus from "components/api/HarvestingStatus";
import { useSchemaContext, useSchemaProperties } from "components/api/hooks";
import { sanitizeDateField } from "helpers";
import { convertSchemaErrors } from "components/api/SchemaInstanceForm/convertSchemaErrors";
import { ParentSelector } from "components/forms";
import { LoadingCircle } from "components/atomic";
import {
  CollectionUpdateForm_schemaErrorsFragment$data,
  // eslint-disable-next-line max-len
  CollectionUpdateForm_schemaErrorsFragment$key as SchemaErrorsFragment$key,
} from "@/relay/CollectionUpdateForm_schemaErrorsFragment.graphql";
import type { CollectionUpdateFormFieldsFragment$key } from "@/relay/CollectionUpdateFormFieldsFragment.graphql";
import type { CollectionUpdateFormFragment$key } from "@/relay/CollectionUpdateFormFragment.graphql";
import type {
  UpdateCollectionInput,
  CollectionUpdateFormMutation,
} from "@/relay/CollectionUpdateFormMutation.graphql";

// eslint-disable-next-line camelcase, prettier/prettier
type SchemaErrors = CollectionUpdateForm_schemaErrorsFragment$data["schemaErrors"];

export default function CollectionUpdateForm({
  data,
  onSuccess,
  onSaveAndClose,
  onCancel,
}: Props) {
  const { t } = useTranslation();

  const collection = useFragment<CollectionUpdateFormFragment$key>(
    fragment,
    data,
  );
  const { collectionId = "", ...fieldsData } = collection;

  const {
    thumbnail,
    heroImage,
    visibleAfterAt,
    visibleUntilAt,
    published,
    doiData,
    rawDOI,
    ...values
  } = useFragment<CollectionUpdateFormFieldsFragment$key>(
    fieldsFragment,
    fieldsData,
  );

  const mutationName = "updateCollection";

  // eslint-disable prettier/prettier
  const { fieldValues: schemaFieldValues, defaultValues: schemaDefaultValues } =
    useSchemaContext(fieldsData.context);
  // eslint-enable prettier/prettier

  const schemaProperties = useSchemaProperties(fieldsData);

  const isSuccess = useIsSuccess<CollectionUpdateFormMutation, Fields>(
    function (response) {
      const errors = readInlineData<SchemaErrorsFragment$key>(
        schemaErrorsFragment as GraphQLTaggedNode,
        response[mutationName] ?? null,
      );

      return !errors?.schemaErrors || errors.schemaErrors.length === 0;
    },
    [mutationName],
  );

  const onFailure = useOnFailure<CollectionUpdateFormMutation, Fields>(
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

  const toVariables = useToVariables<CollectionUpdateFormMutation, Fields>(
    (data) => {
      const inputValues = pick(data, [
        "title",
        "subtitle",
        "doi",
        "thumbnail",
        "heroImage",
        "summary",
        "published",
        "visibility",
        "visibleAfterAt",
        "visibleUntilAt",
        "clearThumbnail",
        "clearHeroImage",
        "maintainPristineStatus",
      ]);

      const schemaValues = pick(data, schemaProperties);

      return {
        input: {
          ...inputValues,
          visibleAfterAt: sanitizeDateField(data.visibleAfterAt),
          visibleUntilAt: sanitizeDateField(data.visibleUntilAt),
          schemaProperties: { ...schemaValues },
          collectionId,
        },
      };
    },
    [schemaProperties],
  );

  const renderForm = useRenderForm<Fields>(
    ({ form: { register, setError } }) => {
      if (!!rawDOI && !doiData?.doi)
        setError(
          "doi",
          {
            type: "custom",
            message: t("forms.fields.doi_invalid"),
          },
          { shouldFocus: false },
        );

      return (
        <>
          <Forms.Grid>
            <Forms.Input
              label="forms.fields.title"
              isWide
              {...register("title")}
            />
            <Forms.Input
              label="forms.fields.subtitle"
              isWide
              {...register("subtitle")}
            />
            <Forms.VisibilityFields />
            <Forms.Input label="forms.fields.doi" {...register("doi")} isWide />
            <Forms.FileImageUpload
              data={thumbnail}
              label="forms.fields.thumbnail"
              name="thumbnail"
              clearName="clearThumbnail"
            />
            <Forms.FileImageUpload
              data={heroImage}
              label="forms.fields.hero_image"
              name="heroImage"
              clearName="clearHeroImage"
              description="forms.fields.hero_image_description"
            />
            <Forms.Textarea
              label="forms.fields.summary"
              isWide
              {...register("summary")}
            />
            <Forms.VariablePrecisionDateControl
              name="published"
              data={published}
              label="forms.fields.published"
              isWide
            />
          </Forms.Grid>
          <SchemaFormFields data={fieldsData} schemaKind="COLLECTION" />
          <HarvestingStatus data={collection} />
        </>
      );
    },
    [fieldsData],
  );

  // Don't load the form in until defaultValues and schemaFieldValues are defined
  return defaultValues && schemaFieldValues ? (
    <>
      <ParentSelector data={collection} />
      <MutationForm<CollectionUpdateFormMutation, Fields>
        name={mutationName}
        onSuccess={onSuccess}
        onSaveAndClose={onSaveAndClose}
        onCancel={onCancel}
        successNotification="messages.update.collection_success"
        failureNotification="messages.update.collection_failure"
        mutation={mutation}
        toVariables={toVariables}
        defaultValues={defaultValues}
        isSuccess={isSuccess}
        onFailure={onFailure}
      >
        {renderForm}
      </MutationForm>
    </>
  ) : (
    <LoadingCircle />
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onSaveAndClose" | "onCancel"
> {
  data: CollectionUpdateFormFragment$key;
}

type Fields = Omit<UpdateCollectionInput, "collectionId">;

const fieldsFragment = graphql`
  fragment CollectionUpdateFormFieldsFragment on Collection {
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
  mutation CollectionUpdateFormMutation($input: UpdateCollectionInput!) {
    updateCollection(input: $input) {
      collection {
        ...HarvestingStatusFragment
        ...CollectionUpdateFormFieldsFragment
        ...SchemaFormFieldsFragment
      }
      ...MutationForm_mutationErrors
      ...CollectionUpdateForm_schemaErrorsFragment
    }
  }
`;

const schemaErrorsFragment = graphql`
  fragment CollectionUpdateForm_schemaErrorsFragment on UpdateCollectionPayload
  @inline {
    schemaErrors {
      hint
      message
      metadata
      path
    }
  }
`;

const fragment = graphql`
  fragment CollectionUpdateFormFragment on Collection {
    collectionId: id

    ...HarvestingStatusFragment
    ...ParentSelectorFragment

    context: schemaInstanceContext {
      ...useSchemaContextFragment
    }

    ...CollectionUpdateFormFieldsFragment
    ...SchemaFormFieldsFragment
    ...useSchemaPropertiesFragment
  }
`;
