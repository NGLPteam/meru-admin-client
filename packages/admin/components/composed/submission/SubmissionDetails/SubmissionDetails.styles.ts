import styled from "styled-components";

export const Wrapper = styled.div`
  > * + * {
    margin-block-start: var(--form-grid-row-gap);
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
