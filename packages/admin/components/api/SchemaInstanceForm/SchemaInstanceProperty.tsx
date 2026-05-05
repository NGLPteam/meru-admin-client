import { useFragment, graphql } from "react-relay";

import { SchemaKind } from "types/graphql-schema";
import type { SchemaInstancePropertyFragment$key } from "@/relay/SchemaInstancePropertyFragment.graphql";
import * as Factories from "./Factories";

/**
 * A component that renders either a single property or a group of properties
 * at the top level of a schema instance form.
 */
export default function SchemaInstanceProperty(props: Props) {
  const property = useFragment(fragment, props.property);

  if (property.__typename === "GroupProperty") {
    return <Factories.Group group={property} schemaKind={props.schemaKind} />;
  } else {
    return <Factories.Single field={property} schemaKind={props.schemaKind} />;
  }
}

interface Props {
  property: SchemaInstancePropertyFragment$key;
  schemaKind: SchemaKind;
}

const fragment = graphql`
  fragment SchemaInstancePropertyFragment on SchemaProperty {
    __typename

    ... on ScalarProperty {
      submittable
    }

    ... on GroupProperty {
      properties {
        submittable
      }
      # eslint-disable-next-line relay/must-colocate-fragment-spreads
      ...GroupPropertyFragment
    }

    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...SchemaPropertyFragment
  }
`;
