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

  const visibleProperties = isSubmission
    ? properties.filter((p) =>
        p.__typename === "GroupProperty"
          ? !!p.properties?.some((c) => c.submittable)
          : p.submittable,
      )
    : properties;

  return (
    <SchemaFormFieldsContextProvider data={schema} isSubmission={isSubmission}>
      {!isSubmission && (
        <SchemaSelector
          schemaData={schema}
          schemaKind={schemaKind}
          schemaSlugs={schemaSlugs}
          title={title}
          showHeader={!!visibleProperties.length}
        />
      )}
      {!!visibleProperties.length && (
        <FormGrid>
          {visibleProperties.map((prop, index) => (
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
      __typename
      ... on ScalarProperty {
        submittable
      }
      ... on GroupProperty {
        properties {
          submittable
        }
      }
      ...SchemaInstancePropertyFragment
    }
    ...SchemaSelectorDataFragment
    ...SchemaFormFieldsContextFragment
  }
`;
