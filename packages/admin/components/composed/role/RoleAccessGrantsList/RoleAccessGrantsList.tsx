import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import {
  useDestroyer,
  useDrawerHelper,
  useMaybeFragment,
  useRouteSlug,
} from "hooks";

import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { Role } from "types/graphql-schema";
import {
  RoleAccessGrantsListDataFragment$data,
  RoleAccessGrantsListDataFragment$key,
} from "@/relay/RoleAccessGrantsListDataFragment.graphql";
import { RoleAccessGrantsListFragment$key } from "@/relay/RoleAccessGrantsListFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

// Lists user access on any type of entity
function RoleAccessGrantsList({
  data,
  headerStyle,
  hideHeader,
  header = "nav.access",
  entityType,
}: RoleAccessGrantsListProps) {
  const entity = useMaybeFragment<RoleAccessGrantsListFragment$key>(
    fragment,
    data,
  );
  const roles = useMaybeFragment<RoleAccessGrantsListDataFragment$key>(
    listDataFragment,
    entity?.allAccessGrants,
  );

  const { t } = useTranslation();
  const drawerHelper = useDrawerHelper();
  const destroy = useDestroyer();
  const slug = useRouteSlug();

  const columns = [
    ModelColumns.UserNameColumn<Node>({
      // Return the data where the user fragment is defined
      accessorFn: ({ user }: Node) => user,
      enableSorting: false,
    }),
    ModelColumns.EmailColumn<Node>({
      id: "user.email",
      accessorFn: ({ user }: Node) => user?.email,
      enableSorting: false,
    }),
    ModelColumns.StringColumn<Node>({
      header: () => <>{t("lists.role_column")}</>,
      id: "role",
      accessorKey: "role",
      cell: (info) => info.getValue<Role>()?.name || "",
    }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<Node>) =>
      drawerHelper.open("editRoleAccess", {
        drawerSlug: slug || "",
        drawerUserSlug: row.original.user?.slug || "",
        drawerEntity: entityType,
        drawerRoleId: row.original.role?.id,
      }),
    handleDelete: ({ row }: ModelTableActionProps<Node>) => {
      const { entity, role, user } = row.original;

      if (entity && role && user) {
        return destroy.access(
          {
            entityId: entity.id,
            roleId: role.id,
            userId: user.id,
          },
          "glossary.access",
        );
      }

      console.warn("No entity, role or user defined.");
    },
  };

  return (
    <ModelListPage<RoleAccessGrantsListDataFragment$data, Node>
      modelName="role"
      columns={columns}
      data={roles}
      header={t(header)}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      actions={actions}
    />
  );
}

interface RoleAccessGrantsListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: RoleAccessGrantsListFragment$key | null;
  header?: string;
  entityType?: "collection" | "community" | "item";
}

type Node = RoleAccessGrantsListDataFragment$data["edges"][number]["node"];

const fragment = graphql`
  fragment RoleAccessGrantsListFragment on Entity {
    allAccessGrants(page: $page, perPage: 20) {
      ...RoleAccessGrantsListDataFragment
    }
  }
`;

const listDataFragment = graphql`
  fragment RoleAccessGrantsListDataFragment on AnyAccessGrantConnection {
    edges {
      node {
        ... on UserCollectionAccessGrant {
          id
          slug
          role {
            id
            name
          }
          user {
            id
            slug
            name
            email
            ...UserNameColumnFragment
          }
          entity: collection {
            id
          }
        }
        ... on UserItemAccessGrant {
          id
          slug
          role {
            id
            name
          }
          user {
            id
            slug
            name
            email
            ...UserNameColumnFragment
          }
          entity: item {
            id
          }
        }
        ... on UserCommunityAccessGrant {
          id
          slug
          role {
            id
            name
          }
          user {
            id
            slug
            name
            email
            ...UserNameColumnFragment
          }
          entity: community {
            id
          }
        }
      }
    }
    ...ModelListPageFragment
  }
`;

export default RoleAccessGrantsList;
