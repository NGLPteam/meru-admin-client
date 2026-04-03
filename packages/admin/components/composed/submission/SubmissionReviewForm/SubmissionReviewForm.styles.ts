import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";

export const Box = styled.div`
  border: 1px solid var(--neutral60);
  border-radius: var(--border-radius-sm);
  background-color: var(--fieldset-bg-color, var(--neutral05));
  padding-block-start: ${pxToRem(16)};
  padding-block-end: ${pxToRem(20)};
  padding-inline-start: ${pxToRem(24)};
  padding-inline-end: ${pxToRem(24)};
`;
