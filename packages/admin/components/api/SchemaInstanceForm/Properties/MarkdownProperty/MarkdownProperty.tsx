import { useFragment, graphql } from "react-relay";
import { useFormContext } from "react-hook-form";
import Textarea from "components/forms/Textarea";
import type { MarkdownPropertyFragment$key } from "@/relay/MarkdownPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

/**
 * @todo This should be an actual markdown editor. I don't believe that we've
 * solved for that yet, so it's currently a plain textarea.
 */
export default function MarkdownProperty(props: Props) {
  const field = useFragment<MarkdownPropertyFragment$key>(
    fragment,
    props.field,
  );

  const { register } = useFormContext();

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <Textarea
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
  field: MarkdownPropertyFragment$key;
}

const fragment = graphql`
  fragment MarkdownPropertyFragment on MarkdownProperty {
    ...ScalarPropertyFragment

    content
    default
  }
`;
