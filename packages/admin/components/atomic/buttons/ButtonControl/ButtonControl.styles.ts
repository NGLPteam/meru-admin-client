import styled, { css } from "styled-components";
import { pxToRem } from "theme/mixins/functions";
import { tLabel } from "theme/mixins/typography";
import { aGlow } from "theme/mixins/appearance";
import BaseButtonControl from "./ButtonControl";

type BaseProps = React.ComponentProps<typeof BaseButtonControl>;

export const ButtonControl = styled.button<{
  $size?: BaseProps["size"];
  $icon?: BaseProps["icon"];
}>`
  min-height: ${pxToRem(32)};
  display: inline-block;
  border: 1px solid transparent;
  border-radius: ${pxToRem(4)};
  background-color: var(--button-background);
  padding: ${pxToRem(5)} ${pxToRem(8)};
  ${tLabel("sm")}
  text-align: start;
  color: var(--accent-color);
  transition:
    var(--color-transition), var(--border-transition),
    var(--background-transition), var(--opacity-transition);
  opacity: var(--button-control-opacity, 1);
  visibility: var(--button-control-visibility, visible);

  ${({ $size }) =>
    $size === "large" &&
    css`
      padding: ${pxToRem(12)};
    `}

  ${({ $icon }) =>
    $icon &&
    css`
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
    `}

    &:focus {
    outline: 0;
  }

  &:disabled:not([aria-pressed="true"]),
  &[aria-disabled="true"]:not([aria-pressed="true"]),
  [aria-disabled="true"] &:not([aria-pressed="true"]) {
    opacity: var(--button-disabled-opacity);
    cursor: default;
    pointer-events: none;
  }

  &:focus-visible:not(:hover) {
    background-color: var(--brand20);
    border-color: var(--brand100);
    ${aGlow("lightMode")}
  }

  &:hover:not(:disabled):not([aria-disabled="true"]) {
    background-color: var(--brand100);
    color: var(--neutral00);
  }

  &[aria-pressed="true"] {
    background-color: var(--brand100);
    color: var(--neutral00);
    opacity: 1;
    cursor: default;
    pointer-events: none;
  }
`;

export const ButtonText = styled.span<{
  $size?: BaseProps["size"];
  $icon?: BaseProps["icon"];
  $iconLeft?: boolean;
}>`
  display: inline-block;
  white-space: nowrap;

  ${({ $size }) =>
    $size === "large" &&
    css`
      padding-inline-start: ${pxToRem(4)};
    `}

  ${({ $icon, $iconLeft }) =>
    $icon &&
    ($iconLeft
      ? css`
          padding-inline-start: ${pxToRem(10)};
        `
      : css`
          padding-inline-end: ${pxToRem(10)};
        `)}
`;
