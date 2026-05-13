import styled from "styled-components";
import NavLink from "components/atomic/links/NavLink";
import { aGlow } from "theme/mixins/appearance";
import { globalNavRespond, noFlexGapSupport, respond } from "theme/mixins/base";
import { pxToRem } from "theme/mixins/functions";

export const ProviderBarBlock = styled.div`
  ${globalNavRespond(`display: none`)}
`;

export const Nav = styled.nav`
  padding: 0 var(--container-column-margin);
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: var(--grid-column-gap);
  margin: 0 auto;
  max-width: var(--container-max);
  padding: ${pxToRem(20)} 0;

  ${noFlexGapSupport(`
    > * + * {
      margin-inline-start: var(--grid-column-gap);
    }
  `)}

  /* Push all items after the first child to the right */
  > *:first-child {
    margin-inline-end: auto;
  }
`;

export const SearchBlock = styled.div`
  ${respond(`display: none`, 60)}
`;

export const AccountBlock = styled.div`
  ${globalNavRespond(`display: none`)}
`;

export const DesktopNavBlock = styled.div`
  ${globalNavRespond(`display: none`)}
`;

export const MobileNavBlock = styled.div`
  ${globalNavRespond(`display: none`, "min")}
`;

export const Item = styled.li`
  & + & {
    margin-inline-start: ${pxToRem(28)};
  }
`;

export const AvatarLink = styled(NavLink)<{ $active?: boolean }>`
  position: relative;
  margin-block-start: ${pxToRem(5)};
  border-radius: 50%;

  &:focus-visible {
    outline: 0;
    ${aGlow("darkMode")}
  }

  &[aria-expanded="true"] {
    ${aGlow("darkMode")}
  }
`;
