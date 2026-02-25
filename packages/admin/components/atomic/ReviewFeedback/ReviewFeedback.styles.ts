import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";

export const Wrapper = styled.div`
  border-radius: ${pxToRem(10)};
  padding: ${pxToRem(20)} ${pxToRem(24)};
  background-color: var(--yellowtint);
  border: 1px solid var(--yellowdark);
  margin-block-end: var(--form-grid-row-gap);
`;

export const Header = styled.h3`
  padding-block-end: ${pxToRem(12)};
  color: var(--yellowdark);
`;

export const Message = styled.div``;
