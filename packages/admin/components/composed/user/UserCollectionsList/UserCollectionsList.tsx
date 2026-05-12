import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import capitalize from "lodash/capitalize";
import {
  useDestroyer,
  useDrawerHelper,
  useMaybeFragment,
  useRouteSlug,
} from "hooks";
import ModelColumns from "components/composed/model/ModelColumns";
import ModelListPage from "components/composed/model/ModelListPage";
import {
  ButtonControlDrawer,
  ButtonControlGroup,
  NamedLink,
} from "components/atomic";
import {
  UserCollectionsListFragment$data,
  UserCollectionsListFragment$key,
} from "@/relay/UserCollectionsListFragment.graphql";
import type { CellContext, ModelTableActionProps } from "@tanstack/react-table";

const UserCollectionsList = ({ data }: Props) => {
  const communities = useMaybeFragment<UserCollectionsListFragment$key>(
    fragment,
    data,
  );

  const { t } = useTranslation();
  const destroy = useDestroyer();
  const drawerHelper = useDrawerHelper();
  const slug = useRouteSlug();

  const columns = [
    ModelColumns.EntityThumbnailColumn<Node>({
      // Return the data that contains the thumbnail fragment
      accessorFn: (originalRow: Node) => originalRow?.collection,
    }),
    ModelColumns.NameColumn<Node>({
      route: "collection",
      accessorKey: "collection",
      cell: ({ row, getValue }: CellContext<Node, unknown>) => {
        const value = getValue();
        if (!row?.original?.collection?.slug) return value || null;
        return (
          <NamedLink
            route="collection"
            routeParams={{ slug: row.original.collection.slug }}
            passHref
          >
            <a className="t-weight-md a-link">
              {row.original.collection.title}
            </a>
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
        drawerSlug: row.original.collection?.slug || "",
        drawerUserSlug: row.original.user?.slug || "",
        drawerEntity: "collection",
        drawerRoleId: row.original.role?.id,
      }),
    handleDelete: ({ row }: ModelTableActionProps<Node>) => {
      const { collection, role, user } = row.original;

      if (collection && role && user) {
        return destroy.access(
          {
            entityId: collection.id,
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
        drawer="addUserCollectionAccess"
        drawerQuery={{ drawerSlug: slug }}
        icon="plus"
      >
        {t("actions.add.collection")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  return communities ? (
    <ModelListPage<UserCollectionsListFragment$data, Node>
      modelName="role"
      columns={columns}
      data={communities}
      headerStyle="secondary"
      header={capitalize(t("glossary.collection_other"))}
      disableSortBy
      buttons={buttons}
      actions={actions}
    />
  ) : null;
};

interface Props {
  data?: UserCollectionsListFragment$key | null;
}

type Node = UserCollectionsListFragment$data["edges"][number]["node"];

const fragment = graphql`
  fragment UserCollectionsListFragment on UserCollectionAccessGrantConnection {
    edges {
      node {
        id
        collection {
          id
          title
          slug
          ...EntityThumbnailColumnFragment
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

export default UserCollectionsList;
