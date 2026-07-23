import { useCallback } from "react";
import { graphql } from "react-relay";
import { useRouter } from "next/router";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
  useOnSuccess,
} from "components/api/MutationForm";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { RouteHelper } from "routes";
import EntitySelectorDisclosure from "components/forms/EntitySelector/EntitySelectorDisclosure";
import HarvestSetTypeahead from "components/forms/HarvestSetTypeahead";
import ExtractionMappingTemplateInput from "components/forms/ExtractionMappingTemplateInput";
import { Controller } from "react-hook-form";
import type {
  HarvestMappingCreateInput,
  HarvestMappingCreateFormMutation,
} from "@/relay/HarvestMappingCreateFormMutation.graphql";
import { METADATA_FORMAT_OPTS } from "../constants";

export default function HarvestMappingCreateForm({ sourceId }: Props) {
  const { t } = useTranslation();

  const router = useRouter();
  const { slug } = useParams();

  const redirect = useCallback(
    (routeName: string, slug?: string) => {
      const newRoute = RouteHelper.findRouteByName(routeName);

      router.push({
        pathname: newRoute?.path,
        ...(slug ? { query: { slug } } : {}),
      });
    },
    [router],
  );

  const onSuccess = useOnSuccess<
    HarvestMappingCreateFormMutation,
    HarvestMappingCreateInput
  >(
    ({
      response,
    }: {
      response: HarvestMappingCreateFormMutation["response"];
    }) => {
      if (response?.harvestMappingCreate?.harvestMapping)
        redirect(
          "harvestMapping.details",
          response.harvestMappingCreate.harvestMapping.slug,
        );
    },
    [redirect],
  );

  const toVariables = useToVariables<
    HarvestMappingCreateFormMutation,
    HarvestMappingCreateInput
  >(
    (data) => ({
      input: {
        ...data,
        harvestSourceId: sourceId,
      },
    }),
    [],
  );

  const renderForm = useRenderForm<HarvestMappingCreateInput>(
    ({ form: { register, setValue, control } }) => {
      const onSelect = (id: string) => setValue("targetEntityId", id);
      return (
        <Forms.Grid>
          <EntitySelectorDisclosure
            {...register("targetEntityId", { required: true })}
            onSelect={onSelect}
            label={t("forms.fields.target_entity")}
            selectableTypes={{}}
            required
          />
          {slug && (
            <HarvestSetTypeahead<HarvestMappingCreateInput>
              control={control}
              name="harvestSetId"
              label="glossary.harvest_set"
              slug={slug as string}
            />
          )}
          <Forms.Select
            label="forms.fields.metadata_format"
            {...register("metadataFormat")}
            options={METADATA_FORMAT_OPTS}
            required
          />
          <Controller
            name="extractionMappingTemplate"
            control={control}
            render={({ field: { ref, ...fieldProps } }) => (
              <ExtractionMappingTemplateInput
                label={t("forms.extraction_mapping_template.label")}
                sourceSlug={slug as string}
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
          <Forms.Input
            label="forms.fields.schedule"
            description="forms.fields.frequency_expression_description"
            {...register("frequencyExpression")}
            isWide
          />
        </Forms.Grid>
      );
    },
    [],
  );

  return (
    <MutationForm<HarvestMappingCreateFormMutation, HarvestMappingCreateInput>
      name="harvestMappingCreate"
      mutation={mutation}
      onSuccess={onSuccess}
      onCancel={() => redirect("harvestSource.mappings", slug as string)}
      successNotification="messages.create.harvest_mapping_success"
      toVariables={toVariables}
      refetchTags={["harvestMappings"]}
    >
      {renderForm}
    </MutationForm>
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  sourceId: string;
}

const mutation = graphql`
  mutation HarvestMappingCreateFormMutation(
    $input: HarvestMappingCreateInput!
  ) {
    harvestMappingCreate(input: $input) {
      harvestMapping {
        slug
        targetEntity {
          slug
          title
        }
        harvestSet {
          id
        }
        metadataFormat
        extractionMappingTemplate
        mappingOptions {
          autoCreateVolumesAndIssues
          linkIdentifiersGlobally
          useMetadataMappings
        }
        readOptions {
          maxRecords
        }
        frequencyExpression
      }
      ...MutationForm_mutationErrors
    }
  }
`;
