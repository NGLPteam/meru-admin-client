import { useFragment, graphql } from "react-relay";
import { useFormContext } from "react-hook-form";
import Select from "components/forms/Select";

import type { MultiselectPropertyFragment$key } from "@/relay/MultiselectPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function MultiselectProperty(props: Props) {
  const field = useFragment<MultiselectPropertyFragment$key>(
    fragment,
    props.field,
  );

  const { register } = useFormContext();

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <Select
          label={label}
          required={required}
          description={instructions}
          options={field.options}
          multiple
          isWide={isWide}
          {...register(name)}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: MultiselectPropertyFragment$key;
}

const fragment = graphql`
  fragment MultiselectPropertyFragment on MultiselectProperty {
    ...ScalarPropertyFragment

    options {
      label
      value
    }
  }
`;
