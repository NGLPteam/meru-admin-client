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
import type {
  HarvestMetadataMappingCreateInput,
  HarvestMetadataMappingCreateFormMutation,
} from "@/relay/HarvestMetadataMappingCreateFormMutation.graphql";
import { METADATA_MAPPING_FIELD_OPTS } from "../constants";
import * as Styled from "./HarvestMetadataMappingCreateForm.styles";

export default function HarvestMetadataMappingCreateForm({ sourceId }: Props) {
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
    HarvestMetadataMappingCreateFormMutation,
    HarvestMetadataMappingCreateInput
  >(
    ({
      response,
    }: {
      response: HarvestMetadataMappingCreateFormMutation["response"];
    }) => {
      if (response?.harvestMetadataMappingCreate?.harvestMetadataMapping)
        redirect("harvestSource.metadataMappings", slug as string);
    },
    [redirect, slug],
  );

  const toVariables = useToVariables<
    HarvestMetadataMappingCreateFormMutation,
    HarvestMetadataMappingCreateInput
  >(
    (data) => ({
      input: {
        ...data,
        harvestSourceId: sourceId,
      },
    }),
    [],
  );

  const renderForm = useRenderForm<HarvestMetadataMappingCreateInput>(
    ({ form: { register, setValue } }) => {
      const onSelect = (id: string) => setValue("targetEntityId", id);
      return (
        <Forms.Grid>
          <Styled.Disclaimer>
            This is an advanced use case. Most harvests do not require this
            level of complexity. Verify your harvest requires a metadata mapping
            before proceeding.
          </Styled.Disclaimer>
          <EntitySelectorDisclosure
            {...register("targetEntityId", { required: true })}
            onSelect={onSelect}
            label={t("forms.fields.target_entity")}
            selectableTypes={{}}
            required
          />
          <Forms.Select
            label="forms.fields.field"
            {...register("field", { required: true })}
            options={METADATA_MAPPING_FIELD_OPTS}
            required
          />
          <Forms.Input
            label="forms.fields.pattern"
            description="forms.fields.pattern_description"
            {...register("pattern", { required: true })}
            required
            isWide
          />
        </Forms.Grid>
      );
    },
    [],
  );

  return (
    <MutationForm<
      HarvestMetadataMappingCreateFormMutation,
      HarvestMetadataMappingCreateInput
    >
      name="harvestMetadataMappingCreate"
      mutation={mutation}
      onSuccess={onSuccess}
      onCancel={() =>
        redirect("harvestSource.metadataMappings", slug as string)
      }
      successNotification="messages.create.harvest_metadata_mapping_success"
      toVariables={toVariables}
      refetchTags={["harvestMetadataMappings"]}
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
  mutation HarvestMetadataMappingCreateFormMutation(
    $input: HarvestMetadataMappingCreateInput!
  ) {
    harvestMetadataMappingCreate(input: $input) {
      harvestMetadataMapping {
        id
        slug
        field
        pattern
        targetEntity {
          slug
          title
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;
