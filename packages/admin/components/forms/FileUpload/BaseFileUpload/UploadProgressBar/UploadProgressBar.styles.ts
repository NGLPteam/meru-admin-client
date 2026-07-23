import styled from "styled-components";
import { pxToRem } from "@wdp/lib/theme/functions";
import { noInsetSupport } from "theme/mixins/base";

export const BarRoot = styled.div`
  position: sticky;
  inset-block-start: 0;
  height: ${pxToRem(4)};
  background: var(--brand30);
  width: 100%;

  ${noInsetSupport(`top: 0;`)}
`;

export const Placeholder = styled.div`
  position: sticky;
  inset-block-start: 0;
  height: ${pxToRem(4)};
`;

export const Percent = styled.span`
  display: block;
  height: 100%;
  width: 0px;
  transition: width var(--base-duration) var(--base-timing);
  background: var(--brand50);
`;
