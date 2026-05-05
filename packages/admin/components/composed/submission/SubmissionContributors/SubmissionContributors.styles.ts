import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";
import { tLabel } from "theme/mixins/typography";

export const Wrapper = styled.section`
  flex-basis: var(--form-grid-item-width-wide);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${pxToRem(16)};
  padding-block-end: ${pxToRem(6)};
`;

export const Label = styled.span`
  ${tLabel("sm")};
  color: var(--color-light);
`;

export const Box = styled.div<{ $readonly: boolean }>`
  border: 1px solid var(--neutral60);
  border-radius: var(--border-radius-sm);
  background-color: var(--fieldset-bg-color, var(--neutral05));
  padding-block-start: ${pxToRem(16)};
  padding-block-end: ${pxToRem(16)};
  padding-inline-start: ${pxToRem(20)};
  padding-inline-end: ${pxToRem(20)};

  ${({ $readonly }) =>
    $readonly && `border: none; background: none; padding-inline: 0;`}
`;

export const Table = styled.table`
  width: 100%;
`;

export const HeaderCell = styled.th`
  ${tLabel("sm")}
  text-align: start;
  padding-block-end: ${pxToRem(8)};
  border-bottom: 1px solid var(--neutral60);
  white-space: nowrap;

  &[data-cell-type="position"] {
    text-align: center;
  }

  &[data-cell-type="actions"] {
    width: ${pxToRem(32)};
  }
`;

export const Cell = styled.td`
  padding-block-start: ${pxToRem(8)};
  padding-block-end: ${pxToRem(8)};
  padding-inline-end: ${pxToRem(16)};
  vertical-align: middle;

  &[data-cell-type="position"] {
    text-align: center;
  }

  &[data-cell-type="actions"] {
    padding-inline-end: 0;
    text-align: end;
    width: ${pxToRem(32)};
  }
`;

export const Empty = styled.p`
  text-align: center;
  color: var(--color-light);
`;

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${pxToRem(4)};
  color: var(--neutral80);
  border: 1px solid transparent;
  border-radius: ${pxToRem(4)};

  &:hover,
  &:focus-visible {
    color: var(--accent-color);
    background-color: var(--button-background);
  }

  &:focus-visible {
    border-color: var(--accent-color);
  }
`;
