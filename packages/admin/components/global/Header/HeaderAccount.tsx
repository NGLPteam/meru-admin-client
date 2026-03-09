import { useTranslation } from "react-i18next";
import SignInOut from "components/auth/SignInOut";
import {
  DrawerLink,
  Dropdown,
  NamedLink,
  NavLink,
  Avatar,
} from "components/atomic";
import { Authorize } from "components/auth";
import { RouteHelper } from "routes";
import { useIsAuthenticated } from "hooks";
import { useGlobalContext, useViewerContext } from "contexts";
import * as Styled from "./Header.styles";
type NamedLinkProps = React.ComponentProps<typeof NamedLink>;
type AuthorizeProps = React.ComponentProps<typeof Authorize>;

interface HeaderNavParent extends HeaderNavItem {
  route?: never;
  children: HeaderNavLink[];
}

interface HeaderNavLink extends HeaderNavItem {
  route: NamedLinkProps["route"];
  children?: never;
}

interface HeaderNavItem {
  label: string;
  actions?: AuthorizeProps["actions"];
  depositing?: boolean;
}

interface Props {
  accountNav: HeaderNavParent;
}

const HeaderAccount = ({ accountNav }: Props) => {
  const { t } = useTranslation();

  const isAuthenticated = useIsAuthenticated();

  const globalData = useGlobalContext();
  const depositingEnabled =
    globalData?.globalConfiguration?.depositing?.enabled ?? false;

  const { avatar } = useViewerContext();

  const renderSignInOut = () => (
    <NavLink key="auth" as="span">
      <SignInOut className="t-label-md" />
    </NavLink>
  );

  const filterDepositing = <T extends { depositing?: boolean }>(
    items: T[],
  ): T[] =>
    depositingEnabled ? items : items.filter((item) => !item.depositing);

  const renderDropdown = (item: HeaderNavParent) => {
    const filteredChildren = filterDepositing(item.children);

    // Check if the disclosure should be active
    const active = filteredChildren.some((item) => {
      return RouteHelper.isRouteNameFuzzyActive(item.route);
    });

    return (
      <Dropdown
        label={t(item.label)}
        disclosure={
          <Styled.AvatarLink as="button" $active={active}>
            <Avatar data={avatar} placeholder />
          </Styled.AvatarLink>
        }
        menuItems={[
          ...filteredChildren.map(renderLink),
          <DrawerLink key="profile" drawer="editProfile" passHref>
            <NavLink>{t("nav.edit_profile")}</NavLink>
          </DrawerLink>,
          renderSignInOut(),
        ]}
        alignRight
      />
    );
  };

  const renderLink = (item: HeaderNavLink) => {
    // Check if the individual route link should be active
    const route = RouteHelper.findRouteByName(item.route);
    if (!route) return null;

    const active = RouteHelper.isRouteFuzzyActive(route);

    return (
      <NamedLink route={route.name} passHref>
        <NavLink active={active}>{t(item.label || "")}</NavLink>
      </NamedLink>
    );
  };

  return isAuthenticated ? renderDropdown(accountNav) : renderSignInOut();
};

export default HeaderAccount;
