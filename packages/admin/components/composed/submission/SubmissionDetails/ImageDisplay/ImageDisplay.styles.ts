import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: relative;
  max-height: ${pxToRem(175)};
  max-width: 100%;
  color: var(--color-light);
`;
