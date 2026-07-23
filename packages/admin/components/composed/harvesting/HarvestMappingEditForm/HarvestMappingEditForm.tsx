import { graphql, useFragment } from "react-relay";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
} from "components/api/MutationForm";
import MockInput from "components/forms/MockInput";
import { formatDate } from "@wdp/lib/helpers";
import { useTranslation } from "react-i18next";
import EntitySelectorDisclosure from "components/forms/EntitySelector/EntitySelectorDisclosure";
import ExtractionMappingTemplateInput from "components/forms/ExtractionMappingTemplateInput";
import { Controller } from "react-hook-form";
import BaseInputLabel from "components/forms/BaseInputLabel";
import type {
  HarvestMappingUpdateInput,
  HarvestMappingEditFormMutation,
} from "@/relay/HarvestMappingEditFormMutation.graphql";
import type { HarvestMappingEditFormFragment$key } from "@/relay/HarvestMappingEditFormFragment.graphql";
import type { HarvestMappingEditFormFieldsFragment$key } from "@/relay/HarvestMappingEditFormFieldsFragment.graphql";
import * as Styled from "./HarvestMappingEditForm.styles";
import type {
  HarvestMetadataFormat,
  HarvestProtocol,
} from "types/graphql-schema";
import type { EntityOption } from "components/forms/EntitySelector/EntitySelectorController";

export default function HarvestMappingEditForm({
  data,
  onSuccess,
  onCancel,
}: Props) {
  const { t } = useTranslation();

  const { id, ...fieldsData } = useFragment<HarvestMappingEditFormFragment$key>(
    fragment,
    data,
  );

  const {
    targetEntity,
    harvestSet,
    lastScheduledAt,
    scheduleChangedAt,
    harvestSource,
    ...defaultValues
  } = useFragment<HarvestMappingEditFormFieldsFragment$key>(
    fieldsFragment,
    fieldsData,
  );

  const toVariables = useToVariables<HarvestMappingEditFormMutation, Fields>(
    (data) => {
      const { metadataFormat, protocol, frequencyExpression, ...rest } = data;
      const submitFE =
        !!frequencyExpression ||
        (!frequencyExpression && !!defaultValues.frequencyExpression);
      return {
        input: {
          ...rest,
          targetEntityId: data.targetEntityId ?? targetEntity.id,
          harvestMappingId: id,
          frequencyExpression: submitFE ? frequencyExpression : undefined,
        },
      };
    },
    [targetEntity],
  );

  const renderForm = useRenderForm<Fields>(
    ({ form: { register, setValue, control } }) => {
      const onSelect = (id: string) => setValue("targetEntityId", id);
      return (
        <Forms.Grid>
          <EntitySelectorDisclosure
            {...register("targetEntityId")}
            onSelect={onSelect}
            startSlug={targetEntity?.slug}
            startEntity={targetEntity as EntityOption}
            label={t("forms.fields.target_entity")}
            selectableTypes={{}}
            required
          />
          <MockInput
            label="glossary.harvest_set"
            value={harvestSet?.identifier}
            description="harvesting.unchangeable"
          />
          <MockInput
            label="forms.fields.metadata_format"
            value={defaultValues.metadataFormat}
            description="harvesting.unchangeable"
          />
          <Controller
            name="extractionMappingTemplate"
            control={control}
            render={({ field: { ref, ...fieldProps } }) => (
              <ExtractionMappingTemplateInput
                label="forms.extraction_mapping_template.label"
                sourceSlug={harvestSource.slug}
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
          <Forms.Fieldset label={t("forms.fields.schedule")}>
            <Styled.ScheduleGroup>
              <div>
                <BaseInputLabel>
                  {t("harvesting.current_schedule")}
                </BaseInputLabel>
                <span>
                  {defaultValues.frequencyExpression ??
                    t("harvesting.mode_manual")}
                </span>
              </div>
              <div>
                <BaseInputLabel>
                  {t("harvesting.last_scheduled")}
                </BaseInputLabel>
                <span>
                  {lastScheduledAt
                    ? formatDate(lastScheduledAt)
                    : t("harvesting.not_applicable")}
                </span>
              </div>
              <div>
                <BaseInputLabel>
                  {t("harvesting.schedule_changed")}
                </BaseInputLabel>
                <span>
                  {scheduleChangedAt
                    ? formatDate(scheduleChangedAt)
                    : t("harvesting.not_applicable")}
                </span>
              </div>
            </Styled.ScheduleGroup>
            <Forms.Input
              label="forms.fields.frequency_expression"
              description="forms.fields.frequency_expression_description"
              {...register("frequencyExpression")}
              isWide
            />
          </Forms.Fieldset>
        </Forms.Grid>
      );
    },
    [],
  );

  return (
    <MutationForm<HarvestMappingEditFormMutation, Fields>
      name="harvestMappingUpdate"
      mutation={mutation}
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.update.harvest_mapping_success"
      toVariables={toVariables}
      defaultValues={defaultValues}
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
  data: HarvestMappingEditFormFragment$key;
}

type Fields = HarvestMappingUpdateInput & {
  protocol: HarvestProtocol;
  metadataFormat: HarvestMetadataFormat;
  harvestSetId: string;
};

const fieldsFragment = graphql`
  fragment HarvestMappingEditFormFieldsFragment on HarvestMapping {
    targetEntity {
      slug
      title

      ... on Community {
        id
      }
      ... on Collection {
        id
      }
    }
    harvestSet {
      identifier
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
    lastScheduledAt
    scheduleChangedAt
    harvestSource {
      slug
    }
  }
`;

const mutation = graphql`
  mutation HarvestMappingEditFormMutation($input: HarvestMappingUpdateInput!) {
    harvestMappingUpdate(input: $input) {
      harvestMapping {
        ...HarvestMappingEditFormFieldsFragment
      }
      ...MutationForm_mutationErrors
    }
  }
`;

const fragment = graphql`
  fragment HarvestMappingEditFormFragment on HarvestMapping {
    id
    ...HarvestMappingEditFormFieldsFragment
  }
`;
