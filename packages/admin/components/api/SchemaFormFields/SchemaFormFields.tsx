import { useFragment, graphql } from "react-relay";
import FormGrid from "components/forms/FormGrid";
import SchemaSelector from "components/forms/SchemaSelector";
import type { SchemaFormFieldsFragment$key } from "@/relay/SchemaFormFieldsFragment.graphql";
import Property from "../SchemaInstanceForm/SchemaInstanceProperty";
import { SchemaFormFieldsContextProvider } from "./SchemaFormFieldsContext";

export default function SchemaFormFields({
  title = "forms.schema.label",
  data,
  schemaKind,
  schemaSlugs,
  isSubmission = false,
}: Props) {
  const { properties, ...schema } = useFragment(fragment, data) ?? {};

  return (
    <SchemaFormFieldsContextProvider data={schema}>
      {!isSubmission && (
        <SchemaSelector
          schemaData={schema}
          schemaKind={schemaKind}
          schemaSlugs={schemaSlugs}
          title={title}
          showHeader={!!properties.length}
        />
      )}
      {!!properties.length && (
        <FormGrid>
          {properties.map((prop, index) => (
            <Property property={prop} key={index} schemaKind={schemaKind} />
          ))}
        </FormGrid>
      )}
    </SchemaFormFieldsContextProvider>
  );
}

interface Props {
  data: SchemaFormFieldsFragment$key;
  title?: string;
  schemaKind: "COLLECTION" | "ITEM" | "COMMUNITY";
  // Filter options by these schema slugs
  schemaSlugs?: string[];
  isSubmission?: boolean;
}

const fragment = graphql`
  fragment SchemaFormFieldsFragment on SchemaInstance {
    properties: schemaProperties {
      ...SchemaInstancePropertyFragment
    }
    ...SchemaSelectorDataFragment
    ...SchemaFormFieldsContextFragment
  }
`;
