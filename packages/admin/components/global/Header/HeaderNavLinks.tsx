import { useTranslation } from "react-i18next";
import { Dropdown, NamedLink, NavLink } from "components/atomic";
import { Authorize } from "components/auth";
import { RouteHelper } from "routes";
import { useIsAuthorized } from "hooks";
import { useGlobalContext } from "contexts";
import * as Styled from "./Header.styles";
type NamedLinkProps = React.ComponentProps<typeof NamedLink>;
type AuthorizeProps = React.ComponentProps<typeof Authorize>;

interface HeaderNavItem {
  label: string;
  actions?: AuthorizeProps["actions"];
  depositing?: boolean;
}

interface HeaderNavLink extends HeaderNavItem {
  route: NamedLinkProps["route"];
  children?: never;
}

interface HeaderNavParent extends HeaderNavItem {
  route?: never;
  children: HeaderNavLink[];
}

interface Props {
  navigation: (HeaderNavLink | HeaderNavParent)[];
}

function HeaderNavLinks({ navigation }: Props) {
  const { t } = useTranslation();

  const globalData = useGlobalContext();
  const depositingEnabled =
    globalData?.globalConfiguration?.depositing?.enabled ?? false;

  const canUpdateSettings = useIsAuthorized({
    actions: ["settings.update"],
  });

  const maybeAuthorize = (
    node: AuthorizeProps["children"],
    item: HeaderNavLink | HeaderNavParent,
    index: number,
  ) => {
    if (!item.actions) return node;
    return (
      <Authorize key={index} actions={item.actions}>
        {node}
      </Authorize>
    );
  };

  const renderGlobalSettings = () =>
    canUpdateSettings ? (
      <NamedLink key="settings" route="settings" passHref>
        <NavLink>{t("nav.global_settings")}</NavLink>
      </NamedLink>
    ) : null;

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
          <NavLink as="button" active={active}>
            {t(item.label)}
          </NavLink>
        }
        menuItems={[
          ...filteredChildren.map(
            (c, i) => maybeAuthorize(renderLink(c), c, i) as React.JSX.Element,
          ),
          renderGlobalSettings(),
        ]}
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
        <NavLink active={active}>{t(route.label || "")}</NavLink>
      </NamedLink>
    );
  };

  return (
    <>
      {filterDepositing(navigation).map((item, i) =>
        maybeAuthorize(
          <Styled.Item key={i}>
            {item.children && renderDropdown(item)}
            {item.route && renderLink(item)}
          </Styled.Item>,
          item,
          i,
        ),
      )}
    </>
  );
}

export default HeaderNavLinks;
