import { useFragment, graphql } from "react-relay";
import { useFormContext } from "react-hook-form";
import Input from "components/forms/Input";
import type { IntegerPropertyFragment$key } from "@/relay/IntegerPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function IntegerProperty(props: Props) {
  const field = useFragment<IntegerPropertyFragment$key>(fragment, props.field);

  const { register } = useFormContext();

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <Input
          label={label}
          required={required}
          description={instructions}
          type="number"
          isWide={isWide}
          {...register(name)}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: IntegerPropertyFragment$key;
}

const fragment = graphql`
  fragment IntegerPropertyFragment on IntegerProperty {
    ...ScalarPropertyFragment

    integerValue
    defaultInteger
  }
`;
