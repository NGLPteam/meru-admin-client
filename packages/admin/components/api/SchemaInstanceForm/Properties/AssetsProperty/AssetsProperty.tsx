import { useFragment, graphql } from "react-relay";
import { AssetsPropertyControl } from "components/forms";
import type { AssetsPropertyFragment$key } from "@/relay/AssetsPropertyFragment.graphql";
import { useSchemaFormContext } from "../../Context";
import ScalarProperty from "../ScalarProperty";

export default function AssetsProperty(props: Props) {
  const { assets: options } = useSchemaFormContext();

  const field = useFragment<AssetsPropertyFragment$key>(fragment, props.field);

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <AssetsPropertyControl
          label={label}
          required={required}
          description={instructions}
          options={options}
          isWide={isWide}
          name={name}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: AssetsPropertyFragment$key;
}

const fragment = graphql`
  fragment AssetsPropertyFragment on AssetsProperty {
    ...ScalarPropertyFragment
  }
`;
