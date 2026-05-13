import { useFragment, graphql } from "react-relay";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
} from "components/api/MutationForm";
import MockInput from "components/forms/MockInput";
import { useTranslation } from "react-i18next";
import ExtractionMappingTemplateInput from "components/forms/ExtractionMappingTemplateInput";
import { Controller } from "react-hook-form";
import type {
  HarvestSourceUpdateInput,
  HarvestSourceUpdateFormMutation,
} from "@/relay/HarvestSourceUpdateFormMutation.graphql";
import type { HarvestSourceUpdateFormFragment$key } from "@/relay/HarvestSourceUpdateFormFragment.graphql";
import type { HarvestSourceUpdateFormFieldsFragment$key } from "@/relay/HarvestSourceUpdateFormFieldsFragment.graphql";
import { PROTOCOL_FORMAT_OPTS } from "../constants";
import type {
  HarvestMetadataFormat,
  HarvestProtocol,
} from "types/graphql-schema";

export default function HarvestSourceUpdateForm({
  data,
  onSuccess,
  onCancel,
}: Props) {
  const { t } = useTranslation();

  const { id, ...fieldsData } =
    useFragment<HarvestSourceUpdateFormFragment$key>(fragment, data);

  const { protocol, metadataFormat, ...defaultValues } =
    useFragment<HarvestSourceUpdateFormFieldsFragment$key>(
      fieldsFragment,
      fieldsData,
    );

  const toVariables = useToVariables<
    HarvestSourceUpdateFormMutation,
    HarvestSourceUpdateInput
  >((data) => ({ input: { ...data, harvestSourceId: id } }), []);

  const preventEditorClear = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if ("tagName" in e.target && e.target?.tagName === "BUTTON") return;
    e.stopPropagation();
    e.preventDefault();
  };

  const renderForm = useRenderForm<Fields>(
    ({ form: { register, control } }) => (
      <Forms.Grid onKeyDown={preventEditorClear}>
        <Forms.Input
          label="forms.fields.name"
          {...register("name")}
          required
          isWide
        />
        <Forms.Input
          label="forms.fields.url"
          {...register("baseURL")}
          isWide
          required
        />
        <Forms.Textarea
          label="forms.fields.description"
          {...register("description")}
          isWide
        />
        <MockInput
          label="forms.fields.protocol"
          description="harvesting.unchangeable"
          value={
            PROTOCOL_FORMAT_OPTS.find((opt) => opt.value === protocol)?.label
          }
        />
        <MockInput
          label="forms.fields.metadata_format"
          value={metadataFormat}
          description="harvesting.unchangeable"
        />
        <Controller
          name="extractionMappingTemplate"
          control={control}
          defaultValue={defaultValues.extractionMappingTemplate}
          render={({ field: { ref, ...fieldProps } }) => (
            <ExtractionMappingTemplateInput
              label={t("forms.extraction_mapping_template.label")}
              {...fieldProps}
            />
          )}
        />
        <Forms.Fieldset label={t("forms.fields.mapping_options")}>
          <Forms.Checkbox
            label="forms.fields.auto_create_vol_iss"
            {...register("mappingOptions.autoCreateVolumesAndIssues")}
          />
          <Forms.Checkbox
            label="forms.fields.link_ids_globally"
            {...register("mappingOptions.linkIdentifiersGlobally")}
          />
          <Forms.Checkbox
            label="forms.fields.metadata_mappings"
            {...register("mappingOptions.useMetadataMappings")}
          />
        </Forms.Fieldset>
        <Forms.Fieldset label={t("forms.fields.read_options")}>
          <Forms.Input
            type="number"
            label="forms.fields.max_records"
            {...register("readOptions.maxRecords", { valueAsNumber: true })}
          />
        </Forms.Fieldset>
      </Forms.Grid>
    ),
    [],
  );

  return (
    <MutationForm<HarvestSourceUpdateFormMutation, Fields>
      name="harvestSourceUpdate"
      mutation={mutation}
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.update.harvest_source_success"
      toVariables={toVariables}
      defaultValues={defaultValues}
      refetchTags={["harvestSources"]}
    >
      {renderForm}
    </MutationForm>
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  data: HarvestSourceUpdateFormFragment$key;
}

type Fields = HarvestSourceUpdateInput & {
  protocol: HarvestProtocol;
  metadataFormat: HarvestMetadataFormat;
};

const fieldsFragment = graphql`
  fragment HarvestSourceUpdateFormFieldsFragment on HarvestSource {
    name
    baseURL
    description
    extractionMappingTemplate
    protocol
    metadataFormat
    mappingOptions {
      autoCreateVolumesAndIssues
      linkIdentifiersGlobally
      useMetadataMappings
    }
    readOptions {
      maxRecords
    }
  }
`;

const mutation = graphql`
  mutation HarvestSourceUpdateFormMutation($input: HarvestSourceUpdateInput!) {
    harvestSourceUpdate(input: $input) {
      harvestSource {
        ...HarvestSourceUpdateFormFieldsFragment
      }
      ...MutationForm_mutationErrors
    }
  }
`;

const fragment = graphql`
  fragment HarvestSourceUpdateFormFragment on HarvestSource {
    id
    ...HarvestSourceUpdateFormFieldsFragment
  }
`;
