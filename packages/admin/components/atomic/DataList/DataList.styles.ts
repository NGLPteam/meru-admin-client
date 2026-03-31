import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";
import { tLabel } from "theme/mixins/typography";

export const List = styled.dl<{ $boxed?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${pxToRem(20)} ${pxToRem(20)};

  ${({ $boxed }) =>
    $boxed &&
    `
      border: 1px solid var(--neutral60);
      border-radius: var(--border-radius-sm);
      background-color: var(--fieldset-bg-color, var(--neutral05));
      padding-block-start: ${pxToRem(24)};
      padding-block-end: ${pxToRem(28)};
      padding-inline-start: ${pxToRem(40)};
      padding-inline-end: ${pxToRem(40)};
    `}
`;

export const Item = styled.div<{ $wide?: boolean }>`
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
`;

export const Term = styled.dt`
  ${tLabel("sm")};
  color: var(--color-light);
  padding-block-end: ${pxToRem(6)};
`;

export const Description = styled.dd`
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-base);
`;
