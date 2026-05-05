import { useFragment, graphql } from "react-relay";
import { useFormContext } from "react-hook-form";
import Input from "components/forms/Input";
import type { StringPropertyFragment$key } from "@/relay/StringPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function StringProperty(props: Props) {
  const field = useFragment<StringPropertyFragment$key>(fragment, props.field);
  const { register } = useFormContext();

  return (
    <ScalarProperty field={field}>
      {({ name, label, required, isWide, instructions }) => (
        <Input
          label={label}
          required={required}
          description={instructions}
          isWide={isWide || register.name === "title"}
          {...register(name)}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: StringPropertyFragment$key;
}

const fragment = graphql`
  fragment StringPropertyFragment on StringProperty {
    ...ScalarPropertyFragment

    content
    default
  }
`;
