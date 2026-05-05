import { useFragment, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { FieldsetSection, FormGrid } from "components/forms";
import { SchemaKind } from "types/graphql-schema";
import { useSchemaFormFieldsContext } from "components/api/SchemaFormFields/SchemaFormFieldsContext";
import type { GroupPropertyFragment$key } from "@/relay/GroupPropertyFragment.graphql";
import SchemaProperty from "../SchemaProperty";

export default function GroupProperty(props: Props) {
  const group = useFragment<GroupPropertyFragment$key>(fragment, props.group);
  const { t } = useTranslation();
  const { isSubmission } = useSchemaFormFieldsContext();

  const visible = isSubmission
    ? group.properties.filter((p) => p.submittable)
    : group.properties;

  if (visible.length === 0) return null;

  // Schema property inputs should be laid out in a grid,
  // same as the global properties
  return (
    <FieldsetSection label={group.legend ?? t("forms.fields.fields")}>
      <FormGrid>
        {visible.map((prop, index) => (
          <SchemaProperty
            field={prop}
            key={index}
            schemaKind={props.schemaKind}
          />
        ))}
      </FormGrid>
    </FieldsetSection>
  );
}

interface Props {
  group: GroupPropertyFragment$key;
  schemaKind: SchemaKind;
}

const fragment = graphql`
  fragment GroupPropertyFragment on GroupProperty {
    legend
    path
    properties {
      submittable
      ...SchemaPropertyFragment
    }
  }
`;
