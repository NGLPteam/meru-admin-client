import styled, { css } from "styled-components";

export const Badge = styled.span<{ $variant: "overlay" | "inline" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  border-radius: var(--border-radius-xlg);
  background-color: var(--yellowdark);
  color: var(--neutral90);
  font-size: 11px;
  font-weight: var(--font-weight-medium);

  ${({ $variant }) =>
    $variant === "overlay"
      ? css`
          position: absolute;
          inset-block-start: -8px;
          inset-inline-end: -8px;
          pointer-events: none;
          border: 1px solid var(--neutral90);
        `
      : css`
          margin-inline-start: 8px;
          margin-block-start: -2px;
        `}
`;
