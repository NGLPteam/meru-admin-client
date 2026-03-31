import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: ${pxToRem(250)};
  max-width: 100%;
  border: 1px solid var(--color-lighter);
  color: var(--color-light);
`;
