import { pxToRem } from "@wdp/lib/theme/functions";
import styled from "styled-components";
import { fluidScale, respond } from "theme/mixins/base";

export const BannerArea = styled.div`
  grid-column: 1 / -1;

  > * {
    margin-block-end: 0;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  gap: ${fluidScale("52px", "24px")};
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-rows: repeat(2, auto);
  padding-block-start: ${pxToRem(80)};

  &:has(${BannerArea}) {
    padding-block-start: ${pxToRem(40)};
  }

  ${respond(`grid-template-columns: 1fr;`, 40)}

  > *:first-child {
    grid-row: -1 / 1;
  }
`;
