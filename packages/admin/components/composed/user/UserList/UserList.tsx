import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDrawerHelper } from "hooks";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import type {
  UserListFragment$data,
  UserListFragment$key,
} from "@/relay/UserListFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function UserList({ data, headerStyle, hideHeader }: UserListProps) {
  const { users } = useFragment<UserListFragment$key>(fragment, data) ?? {};

  const { t } = useTranslation();
  const drawerHelper = useDrawerHelper();

  const columns = [
    ModelColumns.UserNameColumn<UserNode>(),
    ModelColumns.EmailColumn<UserNode>(),
    ModelColumns.BooleanColumn<UserNode>({
      header: () => <>{t("lists.admin_column")}</>,
      id: "globalAdmin",
      enableSorting: true,
    }),
    ModelColumns.CreatedAtColumn<UserNode>({ enableSorting: true }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<UserNode>) => {
      drawerHelper.open("editUser", { drawerSlug: row.original.slug });
    },
  };

  return (
    <ModelListPage<UserListFragment$data["users"], UserNode>
      modelName="user"
      columns={columns}
      data={users}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      actions={actions}
    />
  );
}

interface UserListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: UserListFragment$key;
}

type UserNode = UserListFragment$data["users"]["nodes"][number];

const fragment = graphql`
  fragment UserListFragment on Query {
    users(order: $order, page: $page, perPage: 20) {
      nodes {
        email
        globalAdmin
        name
        slug
        createdAt
        updatedAt
        ...UserNameColumnFragment
      }
      ...ModelListPageFragment
    }
  }
`;

export default UserList;
