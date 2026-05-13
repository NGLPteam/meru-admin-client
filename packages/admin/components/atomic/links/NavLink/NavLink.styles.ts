import styled, { css } from "styled-components";
import { aTextGlow } from "theme/mixins/appearance";
import { tLabel } from "theme/mixins/typography";

export const Link = styled.a<{ $active?: boolean }>`
  --nav-link-border: 2px solid transparent;
  display: inline-block;
  color: var(--accent-light);

  &:hover {
    --nav-link-border: 2px solid var(--accent-lighter);
    color: var(--accent-lighter);
  }

  &:focus-visible {
    outline: 0;
    ${aTextGlow("darkMode")}
  }

  &:active,
  &[aria-expanded="true"] {
    --nav-link-border: 2px solid var(--accent-lighter);
    color: var(--accent-color);
    border-color: var(--accent-color);
  }

  ${({ $active }) =>
    $active &&
    css`
      --nav-link-border: 2px solid var(--accent-lighter);
      color: var(--accent-color);
      border-color: var(--accent-color);
    `}
`;

export const LinkText = styled.span`
  transition: var(--border-transition), var(--color-transition);
  border-bottom: var(--nav-link-border);
  padding-block-end: 1px;
  ${tLabel("md")}
  display: inline-flex;
  align-items: center;

  &:focus-visible {
    outline: 0;
    ${aTextGlow("darkMode")}
  }
`;
