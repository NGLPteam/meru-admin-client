import { useFragment, graphql } from "react-relay";
import { useFormContext } from "react-hook-form";
import Input from "components/forms/Input";
import type { FloatPropertyFragment$key } from "@/relay/FloatPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function FloatProperty(props: Props) {
  const field = useFragment<FloatPropertyFragment$key>(fragment, props.field);

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
  field: FloatPropertyFragment$key;
}

const fragment = graphql`
  fragment FloatPropertyFragment on FloatProperty {
    ...ScalarPropertyFragment

    floatValue
    defaultFloat
  }
`;
