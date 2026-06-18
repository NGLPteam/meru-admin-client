import { useFragment, graphql } from "react-relay";
import { useFormContext } from "react-hook-form";
import { DatePicker } from "components/forms/Input";
import type { DatePropertyFragment$key } from "@/relay/DatePropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function DateProperty(props: Props) {
  const field = useFragment<DatePropertyFragment$key>(fragment, props.field);

  const { register } = useFormContext();

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <DatePicker
          label={label}
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
  field: DatePropertyFragment$key;
}

const fragment = graphql`
  fragment DatePropertyFragment on DateProperty {
    ...ScalarPropertyFragment

    date
  }
`;
