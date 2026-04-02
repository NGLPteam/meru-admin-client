import styled, { css } from "styled-components";
import { aBgLight, aTextGlow } from "theme/mixins/appearance";
import { pxToRem } from "theme/mixins/functions";
import { tLabel } from "theme/mixins/typography";

export const TableWrapper = styled.div<TableWrapperProps>`
  --table-border: 1px solid var(--border-color);
  --table-border-radius: ${pxToRem(6)};
  --table-column-gap: ${pxToRem(16)};
  --table-margin-left: ${pxToRem(8)};
  --table-margin-right: ${pxToRem(8)};
  --checkbox-opacity: 0;
  --checkbox-visibility: hidden;

  ${({ $selectable }) =>
    $selectable &&
    css`
      --checkbox-opacity: 1;
      --checkbox-visibility: visible;
    `}

  ${({ $showCheckboxes }) =>
    $showCheckboxes &&
    css`
      --checkbox-opacity: 1;
      --checkbox-visibility: visible;
    `}

  border-top: var(--table-border);
`;

interface TableWrapperProps {
  $selectable?: boolean;
  $showCheckboxes?: boolean;
}

export const Table = styled.table`
  margin-inline-start: calc(var(--table-margin-left) * -1);
  margin-inline-end: calc(var(--table-margin-right) * -1);
  width: calc(100% + var(--table-margin-left) + var(--table-margin-right));
  border-collapse: collapse;
`;

export const TableBody = styled.tbody`
  &:before,
  &:after {
    content: "";
    display: block;
    height: ${pxToRem(24)};
  }
`;

export const HeaderCell = styled.th`
  cursor: default;
  border-bottom: var(--table-border);
  white-space: nowrap;

  &[aria-sort] {
    cursor: pointer;
  }

  &[role="presentation"] {
    border-bottom: 0;
  }
`;

export const HeaderCellInner = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  padding-block-start: ${pxToRem(7)};
  padding-block-end: ${pxToRem(7)};
  padding-inline-end: var(--table-column-gap);
  ${tLabel("sm")}
  text-align: start;

  > * + * {
    margin-inline-start: ${pxToRem(8)};
  }
`;

export const Cell = styled.td`
  padding-block-start: ${pxToRem(14)};
  padding-block-end: ${pxToRem(14)};
  padding-inline-end: var(--table-column-gap);
  max-width: 15vw;

  &[data-cell-type="name"] {
    width: 35%;
  }

  &[data-cell-type="position"] {
    text-align: center;
  }

  &[data-cell-type="url"] {
    word-break: break-all;
    width: 20%;
  }

  &[data-cell-type="thumbnail"] {
    padding-block-start: ${pxToRem(8)};
    padding-block-end: ${pxToRem(8)};
    /* First number should be the size of the thumbnail (50px) */
    width: ${50 + 8 * 2}px;
    min-width: ${40 + 8 * 2}px;
    min-height: ${40 + 8 * 2}px;
  }

  &[data-cell-type="actions"] {
    padding-block-start: ${pxToRem(8)};
    padding-block-end: ${pxToRem(8)};
    padding-inline-end: 0;
    text-align: end;
  }

  &:first-child {
    border-top-left-radius: var(--table-border-radius);
    border-bottom-left-radius: var(--table-border-radius);
    width: var(--table-margin-left);
    min-width: var(--table-margin-left);
    padding: 0;
  }

  &:last-child {
    border-top-right-radius: var(--table-border-radius);
    border-bottom-right-radius: var(--table-border-radius);
    width: var(--table-margin-right);
    min-width: var(--table-margin-right);
    padding: 0;
  }
`;

export const SelectCell = styled.td`
  white-space: nowrap;
  padding: ${pxToRem(14)} var(--table-column-gap) 0;
  text-align: center;
`;

export const SelectCellInner = styled.div`
  visibility: var(--checkbox-visibility);
  opacity: var(--checkbox-opacity);
  display: flex;
  justify-content: center;
  margin-block-start: ${pxToRem(4)};

  th & {
    margin-block-start: 0;
  }
`;

export const LoadingRow = styled.tr``;

export const LoadingCell = styled.td`
  padding-block-end: ${pxToRem(16)};
  height: ${pxToRem(32 + 16)};
  --loading-border-radius: var(--table-border-radius);
`;

export const Row = styled.tr`
  --button-control-opacity: 0;
  --button-control-visibility: 0;
  vertical-align: top;

  &:hover,
  &:focus,
  &:focus-within {
    ${aBgLight("brand10")}
    transition: var(--background-transition);

    --button-control-opacity: 1;
    --button-control-visibility: 1;
  }
`;

export const SortIcon = styled.button`
  display: flex;
  align-items: center;
  padding-inline-start: ${pxToRem(8)};

  &:hover {
    color: var(--accent-light);
  }

  &:focus {
    outline: 0;
  }

  &:focus-visible:not(:hover) {
    color: var(--accent-color);
    ${aTextGlow("lightMode")}
  }
`;

export const HeaderRow = styled.tr`
  --button-control-opacity: 0;
  --button-control-visibility: 0;

  &:hover,
  &:focus,
  &:focus-within {
    --button-control-opacity: 1;
    --button-control-visibility: 1;
  }
`;
