import { useFragment, graphql } from "react-relay";
import { useFormContext } from "react-hook-form";
import { Email } from "components/forms/Input";
import type { EmailPropertyFragment$key } from "@/relay/EmailPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function EmailProperty(props: Props) {
  const field = useFragment<EmailPropertyFragment$key>(fragment, props.field);

  const { register } = useFormContext();

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <Email
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
  field: EmailPropertyFragment$key;
}

const fragment = graphql`
  fragment EmailPropertyFragment on EmailProperty {
    ...ScalarPropertyFragment

    address
    defaultAddress
  }
`;
