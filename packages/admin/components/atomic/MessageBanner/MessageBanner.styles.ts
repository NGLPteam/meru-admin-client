import styled, { css } from "styled-components";
import { pxToRem } from "theme/mixins/functions";
import { aButton } from "theme/mixins/appearance";

type Variant = "warning" | "info";

const variantColors = {
  warning: {
    bg: "var(--yellowtint)",
    border: "var(--yellowdark)",
    header: "var(--yellowdark)",
  },
  info: {
    bg: "var(--brand10)",
    border: "transparent",
    header: "var(--brand100)",
  },
};

export const Wrapper = styled.div<{ $variant: Variant }>`
  display: flex;
  gap: ${pxToRem(12)};
  align-items: flex-start;
  border-radius: ${pxToRem(10)};
  padding: ${pxToRem(20)} ${pxToRem(24)};
  margin-block-end: var(--form-grid-row-gap);

  ${({ $variant }) => {
    const colors = variantColors[$variant];
    return css`
      background-color: ${colors.bg};
      border: 1px solid ${colors.border};
    `;
  }}
`;

export const Icon = styled.span<{ $variant: Variant }>`
  flex-shrink: 0;
  color: ${({ $variant }) => variantColors[$variant].header};
  --icon-background-color: ${({ $variant }) => variantColors[$variant].header};
  --icon-foreground-color: ${({ $variant }) => variantColors[$variant].bg};
`;

export const Content = styled.div`
  flex: 1;
`;

export const Header = styled.h3<{ $variant: Variant; $hasMessage: boolean }>`
  color: ${({ $variant }) => variantColors[$variant].header};

  ${({ $hasMessage }) =>
    $hasMessage &&
    css`
      padding-block-end: ${pxToRem(12)};
    `}
`;

export const DismissButton = styled.button`
  ${aButton(true)}
  padding: ${pxToRem(5)};
  height: ${pxToRem(26)};
  width: ${pxToRem(26)};
  border-radius: ${pxToRem(4)};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-start: -6px;
`;

export const Message = styled.div``;
