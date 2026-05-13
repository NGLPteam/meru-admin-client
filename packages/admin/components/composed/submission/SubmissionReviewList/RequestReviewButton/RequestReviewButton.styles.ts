import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";

export const TypeaheadWrapper = styled.div`
  flex-basis: var(--form-grid-item-width-wide);

  ul {
    max-height: ${pxToRem(200)};
  }
`;
