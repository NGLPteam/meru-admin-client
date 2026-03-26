import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useId } from "react";
import useFocusTrap from "@castiron/hooks/useFocusTrap";

import { useViewerContext } from "contexts";
import appData from "fixtures/app.data";
import { useToggle } from "hooks";

import MobileMenu, { MobileMenuList } from "components/layout/MobileMenu";
import MobileMenuToggle from "components/layout/MobileMenuToggle";
import { renderNavLink } from "helpers";
import SignInOut from "components/auth/SignInOut";
import { DrawerLink, NamedLink } from "components/atomic";
import SearchModal from "components/composed/search/SearchModal";
import InstallationName from "../InstallationName";
import ProviderBar from "../ProviderBar";
import HeaderWrapper from "./HeaderWrapper";
import HeaderNavLinks from "./HeaderNavLinks";
import * as Styled from "./Header.styles";
import HeaderAccount from "./HeaderAccount";

function Header() {
  const { t } = useTranslation();
  const mobileNavId = useId();
  const mobileNavRef = useRef(null);
  const [isActive, toggleActive, setActive] = useToggle();

  useFocusTrap(mobileNavRef, isActive, {
    onDeactivate: useCallback(() => setActive(false), [setActive]),
  });

  const { headerData, footerData } = appData;
  const { globalAdmin } = useViewerContext();

  const renderGlobalSettings = () =>
    globalAdmin ? (
      <li>
        <NamedLink key="settings" route="settings" passHref>
          <a className="a-link">{t("nav.global_settings")}</a>
        </NamedLink>
      </li>
    ) : null;

  return (
    <HeaderWrapper>
      <Styled.ProviderBarBlock>
        <ProviderBar />
      </Styled.ProviderBarBlock>
      <Styled.Nav className="a-bg-brand100">
        <Styled.Inner>
          <InstallationName />
          <Styled.DesktopNavBlock>
            <ul className="l-flex l-flex--align-center">
              <HeaderNavLinks navigation={headerData.navigation} />
            </ul>
          </Styled.DesktopNavBlock>
          <Styled.SearchBlock>
            <SearchModal routeName="search" clearOnSubmit />
          </Styled.SearchBlock>
          <Styled.AccountBlock>
            <HeaderAccount accountNav={headerData.account} />
          </Styled.AccountBlock>
          <MobileMenuToggle
            onToggle={toggleActive}
            label={t("nav.menu_toggle")}
            icon="menu"
          />
        </Styled.Inner>
      </Styled.Nav>
      <MobileMenu
        ref={mobileNavRef}
        id={mobileNavId}
        active={isActive}
        onClose={toggleActive}
        showGlobalSearch
        showProviderBar
      >
        {footerData.navigation.map((nav, i) => (
          <div key={i}>
            <h3 className="t-label-lg a-color-light">{t(nav.header)}</h3>
            <MobileMenuList>
              {nav.children &&
                nav.children.map((child, i) => renderNavLink(child, i, "li"))}
              {renderGlobalSettings()}
            </MobileMenuList>
          </div>
        ))}
        <div>
          <h3 className="t-label-lg a-color-light">
            {t("nav.account_header")}
          </h3>
          <MobileMenuList>
            <li>
              <DrawerLink drawer="editProfile">
                {t("nav.edit_profile")}
              </DrawerLink>
            </li>
            <li>
              <SignInOut />
            </li>
          </MobileMenuList>
        </div>
      </MobileMenu>
    </HeaderWrapper>
  );
}

export default Header;
