import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import ExpandableCheckboxList from "components/forms/ExpandableCheckboxList";
import { SearchSchemaFilterFragment$key } from "@/relay/SearchSchemaFilterFragment.graphql";

export default function SearchSchemaFilter({ data, kindFilter }: Props) {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const schemaData = useFragment<SearchSchemaFilterFragment$key>(
    fragment,
    data,
  );

  const filtered = kindFilter
    ? schemaData?.schemas?.filter((s) => s.kind === kindFilter)
    : schemaData.schemas;

  const options = filtered.map(({ schemaDefinition, name }) => ({
    label: name,
    value: schemaDefinition.slug,
  }));

  return (
    <ExpandableCheckboxList
      name="schema"
      groupLabel={t("glossary.schema")}
      options={options}
      control={control}
    />
  );
}

interface Props {
  data: SearchSchemaFilterFragment$key;
  kindFilter?: "ITEM" | "COLLECTION";
}

const fragment = graphql`
  fragment SearchSchemaFilterFragment on SearchScope {
    schemas: availableSchemaVersions {
      name
      kind
      schemaDefinition {
        slug
      }
    }
  }
`;
