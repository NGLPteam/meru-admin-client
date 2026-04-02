import styled from "styled-components";
import { aBaseInput } from "theme/mixins/appearance";
import { pxToRem } from "theme/mixins/functions";

export const Wrapper = styled.div`
  min-width: ${pxToRem(220)};
`;

export const SearchInput = styled.input`
  --input-min-height: ${pxToRem(32)};
  --input-padding: 0 ${pxToRem(8)};
  --input-focus-background: var(--brand10);
  --input-border-radius: ${pxToRem(4)};
  width: 100%;
  ${aBaseInput()}
  font-size: var(--font-size-label-sm);
`;

export const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${pxToRem(4)} 0 0;
  max-height: ${pxToRem(300)};
  overflow-y: auto;
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
  padding: ${pxToRem(6)} ${pxToRem(8)} ${pxToRem(6)} ${pxToRem(4)};
  cursor: pointer;
  border-radius: ${pxToRem(4)};

  &:hover {
    background-color: var(--brand10);
  }

  > *:last-child {
    flex-grow: 1;
  }
`;

export const CheckMark = styled.span<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
`;
