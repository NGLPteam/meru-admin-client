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
import HarvestingStatus from "components/api/HarvestingStatus";
import { ParentSelector } from "components/forms";
import { LoadingCircle } from "components/atomic";
import {
  ItemUpdateForm_schemaErrorsFragment$data,
  // eslint-disable-next-line max-len
  ItemUpdateForm_schemaErrorsFragment$key as SchemaErrorsFragment$key,
} from "@/relay/ItemUpdateForm_schemaErrorsFragment.graphql";
import type { ItemUpdateFormFieldsFragment$key } from "@/relay/ItemUpdateFormFieldsFragment.graphql";
import type { ItemUpdateFormFragment$key } from "@/relay/ItemUpdateFormFragment.graphql";
import type {
  UpdateItemInput,
  ItemUpdateFormMutation,
} from "@/relay/ItemUpdateFormMutation.graphql";

// eslint-disable-next-line camelcase, prettier/prettier
type SchemaErrors = ItemUpdateForm_schemaErrorsFragment$data["schemaErrors"];

export default function ItemUpdateForm({
  data,
  onSuccess,
  onCancel,
  onSaveAndClose,
  mode = "admin",
}: Props) {
  const isDepositor = mode === "depositor";
  const { t } = useTranslation();

  const mutationName = "updateItem";

  const item = useFragment<ItemUpdateFormFragment$key>(fragment, data);
  const { itemId = "", ...fieldsData } = item;

  // eslint-disable-next-line prettier/prettier
  const {
    fieldValues: schemaFieldValues,
    defaultValues: schemaDefaultValues,
  } = useSchemaContext(fieldsData.context);

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
  } = useFragment<ItemUpdateFormFieldsFragment$key>(fieldsFragment, fieldsData);

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

  const isSuccess = useIsSuccess<ItemUpdateFormMutation, Fields>(
    function (response) {
      const errors = readInlineData<SchemaErrorsFragment$key>(
        schemaErrorsFragment as GraphQLTaggedNode,
        response[mutationName] ?? null,
      );

      return !errors?.schemaErrors || errors.schemaErrors.length === 0;
    },
    [mutationName],
  );

  const onFailure = useOnFailure<ItemUpdateFormMutation, Fields>(function ({
    response,
    setError,
  }) {
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
  }, []);

  const toVariables = useToVariables<ItemUpdateFormMutation, Fields>(
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
              {...register("title")}
              required
              isWide
            />
            <Forms.Input
              label="forms.fields.subtitle"
              isWide
              {...register("subtitle")}
            />
            {!isDepositor && <Forms.VisibilityFields />}
            {!isDepositor && (
              <Forms.Input
                label="forms.fields.doi"
                {...register("doi")}
                isWide
              />
            )}
            <Forms.FileImageUpload
              label="forms.fields.thumbnail"
              name="thumbnail"
              data={thumbnail}
              clearName="clearThumbnail"
            />
            <Forms.FileImageUpload
              label="forms.fields.hero_image"
              name="heroImage"
              data={heroImage}
              clearName="clearHeroImage"
              description="forms.fields.hero_image_description"
            />
            <Forms.Textarea
              label="forms.fields.summary"
              {...register("summary")}
              isWide
            />
            {!isDepositor && (
              <Forms.VariablePrecisionDateControl
                name="published"
                data={published}
                label="forms.fields.published"
                isWide
              />
            )}
          </Forms.Grid>
          <SchemaFormFields data={fieldsData} schemaKind="ITEM" />
          {!isDepositor && <HarvestingStatus data={item} />}
        </>
      );
    },
    [fieldsData],
  );

  // Don't load the form in until defaultValues and schemaFieldValues are defined
  return defaultValues && schemaFieldValues ? (
    <>
      {!isDepositor && <ParentSelector data={item} />}
      <MutationForm<ItemUpdateFormMutation, Fields>
        name={mutationName}
        onSuccess={onSuccess}
        onSaveAndClose={onSaveAndClose}
        onCancel={onCancel}
        successNotification={t("messages.update.item_success")}
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

interface Props
  extends Pick<
    React.ComponentProps<typeof MutationForm>,
    "onSuccess" | "onCancel" | "onSaveAndClose"
  > {
  data: ItemUpdateFormFragment$key;
  mode?: "admin" | "depositor";
}

type Fields = Omit<UpdateItemInput, "itemId">;

const fieldsFragment = graphql`
  fragment ItemUpdateFormFieldsFragment on Item {
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
  mutation ItemUpdateFormMutation($input: UpdateItemInput!) {
    updateItem(input: $input) {
      item {
        ...ItemUpdateFormFieldsFragment
        ...SchemaFormFieldsFragment
        ...HarvestingStatusFragment
      }
      ...MutationForm_mutationErrors
      ...ItemUpdateForm_schemaErrorsFragment
    }
  }
`;

const fragment = graphql`
  fragment ItemUpdateFormFragment on Item {
    itemId: id
    ...ParentSelectorFragment
    ...HarvestingStatusFragment

    context: schemaInstanceContext {
      ...useSchemaContextFragment
    }

    ...ItemUpdateFormFieldsFragment
    ...SchemaFormFieldsFragment
    ...useSchemaPropertiesFragment
  }
`;

const schemaErrorsFragment = graphql`
  fragment ItemUpdateForm_schemaErrorsFragment on UpdateItemPayload @inline {
    schemaErrors {
      hint
      message
      metadata
      path
    }
  }
`;
