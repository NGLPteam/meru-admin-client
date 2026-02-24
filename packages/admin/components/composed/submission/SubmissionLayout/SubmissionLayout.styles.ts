import styled from "styled-components";

export const NavRow = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ReviewNextLink = styled.a`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  white-space: nowrap;

  > * + * {
    margin-inline-start: 5px;
  }
`;
