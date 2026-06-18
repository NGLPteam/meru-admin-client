import styled from "styled-components";
import { pxToRem } from "@wdp/lib/theme/functions";

export const ColumnWrapper = styled.div<{ $oneCol?: boolean }>`
  columns: ${({ $oneCol }) => ($oneCol ? 1 : 2)};

  > * + * {
    margin-top: ${pxToRem(16)};
  }

  & + & {
    margin-top: ${pxToRem(8)};
  }
`;
