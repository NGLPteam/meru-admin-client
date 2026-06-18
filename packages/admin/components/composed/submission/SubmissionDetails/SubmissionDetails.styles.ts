import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";

export const Wrapper = styled.div`
  > * + * {
    margin-block-start: ${pxToRem(20)};
  }

  > section > h2 {
    margin-block-end: var(--form-grid-row-gap);
  }
`;

export const Image = styled.img`
  object-fit: contain;
  height: 300px;
  width: 300px;
`;
