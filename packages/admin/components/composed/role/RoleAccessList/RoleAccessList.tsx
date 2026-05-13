import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMaybeFragment, useRouteSlug } from "hooks";

import PageHeader from "components/layout/PageHeader";
import { ButtonControlDrawer, ButtonControlGroup } from "components/atomic";
import { ButtonControl } from "components/atomic/buttons/ButtonControl/ButtonControl.styles";
import { RoleAccessListFragment$key } from "@/relay/RoleAccessListFragment.graphql";
import RoleAssignedUsersList from "../RoleAssignedUsersList";
import RoleAccessGrantsList from "../RoleAccessGrantsList";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

// Lists user access on any type of entity
// entityType must be collection, item, or community for proper labelling
function RoleAccessList({
  data,
  headerStyle,
  hideHeader,
  header = "nav.access",
  entityType,
}: RoleAccessListProps) {
  const entity = useMaybeFragment<RoleAccessListFragment$key>(fragment, data);

  const slug = useRouteSlug();
  const { t } = useTranslation();
  const router = useRouter();

  const buttons =
    slug && entityType ? (
      <ButtonControlGroup
        toggleLabel={t("common.options")}
        menuLabel={t("common.options")}
      >
        <ButtonControlDrawer
          drawer="addRoleAccess"
          drawerQuery={{
            drawerSlug: slug,
            drawerEntity: entityType,
          }}
          icon="plus"
          actions="self.manage_access"
        >
          {t(
            entityType === "community"
              ? "actions.add.member"
              : "actions.add.access",
          )}
        </ButtonControlDrawer>
        <Link
          href={{
            pathname: router.pathname,
            query: router.query.inherited
              ? { slug }
              : { slug, inherited: true },
          }}
          passHref
          legacyBehavior
        >
          <ButtonControl as="a">
            {t(
              `actions.${
                router.query.inherited ? "hide" : "show"
              }.inherited_roles`,
            )}
          </ButtonControl>
        </Link>
      </ButtonControlGroup>
    ) : null;

  return (
    <>
      <PageHeader
        title={t(header)}
        buttons={buttons}
        headerStyle={headerStyle}
        hideHeader={hideHeader}
      />
      {router.query.inherited ? (
        <RoleAssignedUsersList data={entity} hideHeader={true} />
      ) : (
        <RoleAccessGrantsList
          data={entity}
          entityType={entityType}
          hideHeader={true}
        />
      )}
    </>
  );
}

interface RoleAccessListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: RoleAccessListFragment$key | null;
  header?: string;
  // Used to set specific labels on the drawer and form
  entityType?: "community" | "collection" | "item";
}

const fragment = graphql`
  fragment RoleAccessListFragment on Entity {
    ...RoleAccessGrantsListFragment
    ...RoleAssignedUsersListFragment
  }
`;

export default RoleAccessList;
