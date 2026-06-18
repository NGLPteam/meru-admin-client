import { useFragment, graphql } from "react-relay";
import { Controller, useFormContext } from "react-hook-form";
import Multiselect from "components/forms/Multiselect";
import { useSchemaFormFieldsContext } from "components/api/SchemaFormFields/SchemaFormFieldsContext";
import type { ContributorsPropertyFragment$key } from "@/relay/ContributorsPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function ContributorsProperty(props: Props) {
  const { assets: options } = useSchemaFormFieldsContext();

  const field = useFragment<ContributorsPropertyFragment$key>(
    fragment,
    props.field,
  );

  const { control } = useFormContext();

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <Multiselect
              label={label}
              required={required}
              description={instructions}
              options={options}
              isWide={isWide}
              {...field}
            />
          )}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: ContributorsPropertyFragment$key;
}

const fragment = graphql`
  fragment ContributorsPropertyFragment on ContributorsProperty {
    ...ScalarPropertyFragment
  }
`;
