import { useFragment, graphql } from "react-relay";
import DataList from "components/atomic/DataList";
import { Legend } from "components/forms/FieldsetSection/FieldsetSection.styles";
import type { SchemaFieldsDisplayFragment$key } from "@/relay/SchemaFieldsDisplayFragment.graphql";
import { isScalarProp, type SchemaProperty, type Value } from "./helpers";
import ScalarField from "./ScalarField";

export default function SchemaFields({
  data,
}: {
  data: SchemaFieldsDisplayFragment$key;
}) {
  const { schemaProperties, schemaInstanceContext } = useFragment(
    fragment,
    data,
  );

  const fieldValues = (schemaInstanceContext?.fieldValues ?? {}) as Record<
    string,
    Value
  >;

  if (!schemaProperties.length) return null;

  const ungrouped: SchemaProperty[] = [];
  const groups: SchemaProperty[] = [];

  for (const prop of schemaProperties) {
    if (prop.__typename === "GroupProperty") {
      groups.push(prop);
    } else {
      ungrouped.push(prop);
    }
  }

  const scalarProps = ungrouped.filter(isScalarProp);

  return (
    <>
      {!!scalarProps.length && (
        <section>
          <Legend as="h2">{"Properties"}</Legend>
          <DataList>
            {scalarProps.map((prop) => (
              <ScalarField
                key={prop.fullPath}
                prop={prop}
                value={fieldValues[prop.fullPath]}
              />
            ))}
          </DataList>
        </section>
      )}
      {groups.map((group) => {
        if (group.__typename !== "GroupProperty") return null;
        const childProps = group.properties ?? [];
        if (!childProps.length) return null;

        return (
          <section key={group.fullPath}>
            <Legend as="h2">{group.legend}</Legend>
            <DataList>
              {childProps.map((child) => (
                <ScalarField
                  key={child.fullPath}
                  prop={child}
                  value={fieldValues[child.fullPath]}
                />
              ))}
            </DataList>
          </section>
        );
      })}
    </>
  );
}

const fragment = graphql`
  fragment SchemaFieldsDisplayFragment on SchemaInstance {
    schemaInstanceContext {
      fieldValues
    }
    schemaProperties {
      __typename
      ... on ScalarProperty {
        fullPath
        label
        type
        isWide
      }
      ... on GroupProperty {
        fullPath
        legend
        properties {
          fullPath
          label
          type
          isWide
        }
      }
    }
  }
`;
