import styled from "styled-components";

export const ToggleWrapper = styled.section`
  > * + * {
    margin-block-start: 0.75rem;
  }

  > *:only-child {
    margin-block-end: var(--form-grid-row-gap);
  }
`;
