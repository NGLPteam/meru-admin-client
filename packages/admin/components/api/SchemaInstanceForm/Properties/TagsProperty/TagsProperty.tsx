import { useFragment, graphql } from "react-relay";
import { Controller, useFormContext } from "react-hook-form";
import { useSchemaFormFieldsContext } from "components/api/SchemaFormFields/SchemaFormFieldsContext";
import TagsInput from "components/forms/TagsInput";
import type { TagsPropertyFragment$key } from "@/relay/TagsPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

/**
 * @todo This needs to be an actual tags input—allowing a user to input an arbitrary
 * array of strings that do not contain the `,` character.
 */
export default function TagsProperty(props: Props) {
  const field = useFragment<TagsPropertyFragment$key>(fragment, props.field);

  const { control } = useFormContext();
  const { isSubmission } = useSchemaFormFieldsContext();

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TagsInput
              label={label}
              required={required}
              description={instructions}
              isWide={isWide || isSubmission}
              {...field}
            />
          )}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: TagsPropertyFragment$key;
}

const fragment = graphql`
  fragment TagsPropertyFragment on TagsProperty {
    ...ScalarPropertyFragment

    tags
  }
`;
