import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";

export const ReviewNav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
  border-block-start: 1px solid var(--border-color);
  padding-block-start: ${pxToRem(24)};

  > a {
    min-width: 170px;
  }
`;
