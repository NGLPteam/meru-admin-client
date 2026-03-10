import { ButtonControl } from "components/atomic";
import * as Styled from "./FilterTagList.styles";

export interface FilterTag {
  key: string;
  label: string;
  onRemove: () => void;
}

interface Props {
  tags: FilterTag[];
}

export default function FilterTagList({ tags }: Props) {
  return tags?.length ? (
    <Styled.Wrapper className="l-flex l-flex--gap-sm">
      {tags.map((tag) => (
        <ButtonControl
          type="button"
          key={tag.key}
          icon="close"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            tag.onRemove();
          }}
        >
          {tag.label}
        </ButtonControl>
      ))}
    </Styled.Wrapper>
  ) : null;
}
