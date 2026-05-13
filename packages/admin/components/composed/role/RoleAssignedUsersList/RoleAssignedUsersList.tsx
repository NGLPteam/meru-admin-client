import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useMaybeFragment } from "hooks";

import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import UserNameColumnCell from "components/composed/model/ModelColumns/UserNameColumnCell";
import {
  RoleAssignedUsersListDataFragment$data,
  RoleAssignedUsersListDataFragment$key,
} from "@/relay/RoleAssignedUsersListDataFragment.graphql";
import { RoleAssignedUsersListFragment$key } from "@/relay/RoleAssignedUsersListFragment.graphql";
import type { CellContext } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

// Lists user access on any type of entity
function RoleAssignedUsersList({
  data,
  headerStyle,
  hideHeader,
  header = "nav.access",
}: RoleAssignedUsersListProps) {
  const entity = useMaybeFragment<RoleAssignedUsersListFragment$key>(
    fragment,
    data,
  );
  const users = useMaybeFragment<RoleAssignedUsersListDataFragment$key>(
    listDataFragment,
    entity?.assignedUsers,
  );

  const { t } = useTranslation();

  const columns = [
    ModelColumns.NameColumn<Node>({
      route: "user",
      accessorKey: "user",
      cell: (info: CellContext<Node, unknown>) => (
        <UserNameColumnCell data={info.row.original.user} />
      ),
      enableSorting: false,
    }),
    ModelColumns.EmailColumn<Node>({
      id: "user.email",
      accessorFn: ({ user }: Node) => user?.email,
      enableSorting: false,
    }),
    ModelColumns.StringColumn<Node>({
      header: () => <>{t("lists.roles_column")}</>,
      id: "roles",
      accessorKey: "roles",
      cell: (info) => {
        const value = info.getValue<Node>()["roles"];
        return value?.map(({ name }: { name: string }) => name).join(",") || "";
      },
    }),
  ];

  return (
    <ModelListPage<RoleAssignedUsersListDataFragment$data, Node>
      modelName="role"
      columns={columns}
      data={users}
      header={t(header)}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
    />
  );
}

interface RoleAssignedUsersListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: RoleAssignedUsersListFragment$key | null;
  header?: string;
}

type Node = RoleAssignedUsersListDataFragment$data["edges"][number]["node"];

const fragment = graphql`
  fragment RoleAssignedUsersListFragment on Entity {
    assignedUsers(page: $page, perPage: 20) {
      ...RoleAssignedUsersListDataFragment
    }
  }
`;

const listDataFragment = graphql`
  fragment RoleAssignedUsersListDataFragment on ContextualPermissionConnection {
    edges {
      node {
        id
        roles {
          name
        }
        user {
          id
          name
          email
          slug
          ...UserNameColumnCellFragment
        }
      }
    }
    ...ModelListPageFragment
  }
`;

export default RoleAssignedUsersList;
