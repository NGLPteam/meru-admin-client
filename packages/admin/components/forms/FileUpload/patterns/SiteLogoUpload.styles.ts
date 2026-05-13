import styled from "styled-components";
import { respond } from "theme/mixins/base";
import { pxToRem } from "theme/mixins/functions";
import {
  Wrapper as InputWrapper,
  Description,
} from "components/forms/BaseInputWrapper/BaseInputWrapper.styles";

export const Wrapper = styled.div`
  ${InputWrapper} {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--form-grid-column-gap);

    > label {
      grid-column: 1 / span 2;
    }

    ${Description} {
      padding-block-start: 0;

      ${respond(`padding-block-start: ${pxToRem(8)};`, 50)}
    }

    ${respond(`display: flex;`, 50)}
  }
`;
