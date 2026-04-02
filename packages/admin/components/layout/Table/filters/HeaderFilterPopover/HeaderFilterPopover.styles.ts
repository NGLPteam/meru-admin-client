import styled from "styled-components";
import { aTextGlow } from "theme/mixins/appearance";
import { pxToRem } from "theme/mixins/functions";
import { Popover as BasePopover } from "reakit/Popover";

export const FilterIcon = styled.button`
  display: flex;
  align-items: center;
  padding-inline-start: ${pxToRem(8)};

  &:hover {
    color: var(--accent-light);
  }

  &:focus {
    outline: 0;
  }

  &:focus-visible:not(:hover) {
    color: var(--accent-color);
    ${aTextGlow("lightMode")}
  }
`;

export const FilterPopoverContent = styled.div`
  background-color: var(--neutral05);
  border: 1px solid var(--border-color);
  border-radius: ${pxToRem(4)};
  box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.3);
  min-width: ${pxToRem(250)};
  padding: ${pxToRem(8)};
  z-index: var(--z-index-dropdown);
`;

export const Popover = styled(BasePopover)`
  && {
    margin-inline-start: 0;
  }
  inset: 90% auto auto 0 !important;
  transform: none !important;
`;
