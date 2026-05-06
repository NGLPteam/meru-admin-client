import { css } from "styled-components";
import { pxToRem } from "./functions";
export { aHidden } from "@wdp/lib/theme/mixins";

export function aTextGlow(type: "darkMode" | "lightMode") {
  return type === "lightMode"
    ? css`
        text-shadow: 0 0 ${pxToRem(6)} var(--light-glow-color);
      `
    : css`
        text-shadow: 0 0 ${pxToRem(8)} var(--brand30);
      `;
}

export function aGlow(type: "darkMode" | "lightMode") {
  return type === "lightMode"
    ? css`
        box-shadow: 0 0 ${pxToRem(6)} var(--light-glow-color);
        outline: 0;
        transition: box-shadow var(--base-duration) var(--base-timing);
      `
    : css`
        box-shadow: 0 0 ${pxToRem(8)} var(--brand30);
        outline: 0;
        transition: box-shadow var(--base-duration) var(--base-timing);
      `;
}

export function aBgDark(bgColor = "brand100") {
  return css`
    --background-color: var(--${bgColor});
    --background-light: var(--brand90);
    --color-base: var(--brand20);
    --color-light: var(--brand20); /* Passes AA */
    --color-lighter: var(
      --brand30
    ); /* AA+, Can pass under some circumstances */
    --color-dark: var(--neutral00);
    --header-color: var(--neutral00);
    --accent-color: var(--neutral00);
    --accent-light: var(--brand10);
    --accent-lighter: var(--brand20);
    --button-background: var(--background-light);
    --color-error: var(--neutral00);

    background-color: var(--background-color);
    color: var(--color-base);
  `;
}

export function aBgLight(bgColor = "neutral00") {
  return css`
    --background-color: var(--${bgColor});
    --background-light: var(
      --${bgColor === "neutral00" ? "brand10" : "brand20"}
    );
    --color-base: var(--neutral90);
    --color-light: var(--neutral70); /* Passes AA */
    --color-lighter: var(
      --neutral60
    ); /* AA+, Can pass under some circumstances */
    --color-dark: var(--neutral100);
    --header-color: var(--brand100);
    --accent-color: var(--brand100);
    --accent-light: var(--brand90);
    --accent-lighter: var(--brand80);
    --button-background: var(--background-light);

    background-color: var(--background-color);
    color: var(--color-base);
  `;
}

export function aBaseInput() {
  return css`
    appearance: none;
    min-height: var(--input-min-height);
    background-color: var(--input-background-color);
    border: 1px solid var(--input-border-color);
    border-radius: var(--input-border-radius);
    border-top-right-radius: var(
      --input-border-top-right-radius,
      var(--input-border-radius)
    );
    border-bottom-right-radius: var(
      --input-border-bottom-right-radius,
      var(--input-border-radius)
    );
    padding: var(--input-padding);
    color: var(--color-base);
    text-align: var(--input-text-align, left);
    transition:
      var(--background-transition), var(--color-transition),
      var(--border-transition), var(--opacity-transition);

    &:focus,
    &:hover {
      outline: 0;
      border-color: var(--input-border-hover-color);
    }

    &:focus-visible {
      ${aGlow("lightMode")}
      background-color: var(--input-focus-background);
    }

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &:disabled,
    [aria-disabled="true"] {
      opacity: var(--input-disabled-opacity);
      pointer-events: none;
      cursor: default;
    }
  `;
}

// Base link styling, with color override
export const aLink = (color?: string) => css`
  color: var(--${color || "accent-color"}, inherit);
  transition: var(--color-transition);
  cursor: pointer;

  &:hover {
    color: var(--accent-color);
    text-decoration: underline;
  }

  &[aria-current="true"] {
    font-weight: var(--font-weight-semibold);
  }
`;

export function aButton(secondary?: boolean) {
  return css`
    --button-focus-border: var(--brand100);
    --button-background-color: var(--accent-color);
    --button-text-color: var(--background-color);
    --button-hover-color: var(--brand70);
    --button-focus-color: var(--brand50);
    --button-disabled-opacity: 0.35;

    ${secondary &&
    css`
      --button-background-color: var(--button-background);
      --button-text-color: var(--accent-color);
      --button-hover-color: var(--brand20);
      --button-focus-color: var(--brand20);
      --button-disabled-opacity: 0.4;
    `}

    border: 1px solid transparent;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    transition:
      var(--color-transition), var(--border-transition),
      var(--background-transition), var(--opacity-transition);

    &:hover {
      --button-background-color: var(--button-hover-color);
    }

    &:focus {
      outline: 0;
    }

    &:disabled,
    [data-disabled="true"] {
      opacity: var(--button-disabled-opacity);
    }

    &:focus-visible:not(:hover) {
      --button-background-color: var(--button-focus-color);
      border-color: var(--button-focus-border);
    }
  `;
}
