import { useFragment, graphql } from "react-relay";
import { useFormContext } from "react-hook-form";
import Switch from "components/forms/Switch";
import type { BooleanPropertyFragment$key } from "@/relay/BooleanPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

/**
 * A simple boolean switch.
 */
export default function BooleanProperty(props: Props) {
  const field = useFragment<BooleanPropertyFragment$key>(fragment, props.field);

  const { register } = useFormContext();

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <Switch
          label={label}
          hideLabel
          text={label}
          required={required}
          description={instructions}
          isWide={isWide}
          {...register(name)}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: BooleanPropertyFragment$key;
}

const fragment = graphql`
  fragment BooleanPropertyFragment on BooleanProperty {
    ...ScalarPropertyFragment

    checked
    checkedByDefault
  }
`;
