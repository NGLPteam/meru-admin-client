import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import {
  useDestroyer,
  useDrawerHelper,
  useMaybeFragment,
  useRouteSlug,
} from "hooks";
import capitalize from "lodash/capitalize";
import ModelColumns from "components/composed/model/ModelColumns";
import ModelListPage from "components/composed/model/ModelListPage";
import {
  ButtonControlDrawer,
  ButtonControlGroup,
  NamedLink,
} from "components/atomic";
import {
  UserCommunitiesListFragment$data,
  UserCommunitiesListFragment$key,
} from "@/relay/UserCommunitiesListFragment.graphql";
import type { CellContext, ModelTableActionProps } from "@tanstack/react-table";

const UserCommunitiesList = ({ data }: Props) => {
  const communities = useMaybeFragment<UserCommunitiesListFragment$key>(
    fragment,
    data,
  );

  const { t } = useTranslation();
  const destroy = useDestroyer();
  const drawerHelper = useDrawerHelper();
  const slug = useRouteSlug();

  const columns = [
    ModelColumns.NameColumn<Node>({
      route: "community",
      accessorKey: "community",
      cell: ({ row, getValue }: CellContext<Node, unknown>) => {
        if (!row?.original?.community?.slug) return getValue() || null;
        return (
          <NamedLink
            route="community"
            routeParams={{ slug: row.original.community.slug }}
            passHref
          >
            <a className="t-weight-md a-link">{row.original.community.title}</a>
          </NamedLink>
        );
      },
    }),
    ModelColumns.StringColumn<Node>({
      header: () => <>{t("lists.role_column")}</>,
      id: "role",
      accessorFn: (row: Node) => {
        return row?.role.name;
      },
    }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<Node>) =>
      drawerHelper.open("editRoleAccess", {
        drawerSlug: row.original.community?.slug || "",
        drawerUserSlug: row.original.user?.slug || "",
        drawerEntity: "community",
        drawerRoleId: row.original.role?.id,
      }),
    handleDelete: ({ row }: ModelTableActionProps<Node>) => {
      const { community, role, user } = row.original;

      if (community && role && user) {
        return destroy.access(
          {
            entityId: community.id,
            roleId: role.id,
            userId: user.id,
          },
          "glossary.access",
        );
      }

      console.warn("No entity, role or user defined.");
    },
  };

  const buttons = slug && (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <ButtonControlDrawer
        drawer="addUserCommunityAccess"
        drawerQuery={{ drawerSlug: slug }}
        icon="plus"
      >
        {t("actions.add.community")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<UserCommunitiesListFragment$data, Node>
      modelName="role"
      columns={columns}
      data={communities}
      headerStyle="secondary"
      header={capitalize(t("glossary.community_other"))}
      disableSortBy
      buttons={buttons}
      actions={actions}
    />
  );
};

interface Props {
  data?: UserCommunitiesListFragment$key | null;
}

type Node = UserCommunitiesListFragment$data["edges"][number]["node"];

const fragment = graphql`
  fragment UserCommunitiesListFragment on UserCommunityAccessGrantConnection {
    edges {
      node {
        id
        community {
          id
          title
          slug
        }
        role {
          id
          name
        }
        user {
          id
          slug
        }
      }
    }
    ...ModelListPageFragment
  }
`;

export default UserCommunitiesList;
