import { css } from "styled-components";
import { hexToHSLA } from "../mixins/colors";

export const transition = {
  colorMode: {
    duration: 0.17,
    timing: "ease-in",
  },
};

export const colors = {
  brand: {
    100: "#00658F",
    90: "#006E9B",
    70: "#3588AA",
    50: "#6DACC7",
    30: "#B6D6E3",
    20: "#D1E7F0",
    10: "#E9F3F7",
  },
  neutral: {
    100: "#000000",
    90: "#232324",
    80: "#58585C",
    70: "#67676B",
    60: "#87878C",
    50: "#A5A5AB",
    40: "#BCBCC3",
    20: "#E1E1E5",
    10: "#F0F0F5",
    "05": "#FAFAFC",
    "00": "#FFFFFF",
  },
  green: {
    dark: "#3E9460",
    aa: "#48B072",
    tint: "#D9F7E5",
  },
  red: {
    dark: "#C94B42",
    aa: "#E5857E",
    tint: "#F7DBD9",
  },
  yellow: {
    dark: "#fab048",
    tint: "#FFF3E0",
  },
};

export const zIndex = {
  drawer: 200,
  "drawer-backdrop": 199,
  modal: 300,
  dropdown: 400,
};

// Set color variables from colors object
export function setColorVars() {
  let styles = "";

  for (const [colorKey, colorKeyValues] of Object.entries(colors)) {
    // eslint-disable-next-line no-constant-condition
    const delimiter = colorKey === "neutral" || "brand" ? "" : "-";
    for (const [key, hexColor] of Object.entries(colorKeyValues)) {
      styles += `
        --${colorKey}${delimiter}${key}: ${hexToHSLA(hexColor)};
      `;
    }
  }

  return css`
    ${styles}
  `;
}

export function setZIndexVars() {
  let styles = "";

  for (const [key, value] of Object.entries(zIndex)) {
    styles += `
      --z-index-${key}: ${value};
    `;
  }

  return css`
    ${styles}
  `;
}

export const breakpoints: Record<string | number, string> = {
  140: "1400px",
  120: "1280px",
  110: "1100px",
  100: "1024px",
  navBreak: "960px",
  80: "834px",
  70: "768px",
  60: "667px",
  tableBreak: "540px",
  50: "540px",
  40: "414px",
  30: "375px",
  20: "280px",
  10: "140px",
};

// Box shadows
export const boxShadow = {
  popUp: "0px 12px 24px -12px rgba(0, 0, 0, 0.3)",
};
