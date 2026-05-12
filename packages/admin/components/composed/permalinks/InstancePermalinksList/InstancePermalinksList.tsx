import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDrawerHelper, useDestroyer } from "hooks";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { ButtonControlDrawer, ButtonControlGroup } from "components/atomic";
import type {
  InstancePermalinksListFragment$data,
  InstancePermalinksListFragment$key,
} from "@/relay/InstancePermalinksListFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function InstancePermalinksList({
  data,
  headerStyle,
  hideHeader,
}: InstancePermalinksListProps) {
  const { permalinks } =
    useFragment<InstancePermalinksListFragment$key>(fragment, data) ?? {};

  const { t } = useTranslation();
  const drawerHelper = useDrawerHelper();
  const destroy = useDestroyer();

  const columns = [
    ModelColumns.StringColumn<PermalinkNode>({
      header: () => <>{t("lists.slug_column")}</>,
      id: "uri",
    }),
    ModelColumns.BooleanColumn<PermalinkNode>({
      header: () => <>{t("lists.canonical_column")}</>,
      id: "canonical",
    }),
    ModelColumns.NameColumn<PermalinkNode>({
      header: () => <>{t("lists.target_column")}</>,
      accessorFn: (row) => row.permalinkable?.title,
      enableSorting: false,
      route: (row) => row?.kind.toLowerCase(),
      slugKey: "permalinkable.slug",
    }),
    ModelColumns.CreatedAtColumn<PermalinkNode>({ enableSorting: true }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<PermalinkNode>) => {
      drawerHelper.open("editPermalink", {
        drawerPermalinkSlug: row.original.slug,
        drawerAllowEntityChange: "true",
      });
    },
    handleDelete: ({ row }: ModelTableActionProps<PermalinkNode>) =>
      destroy.permalink(
        { permalinkId: row.original.id },
        row.original.uri || t("glossary.permalink"),
      ),
    handleView: ({ row }: ModelTableActionProps<PermalinkNode>) => {
      return row.original.uri ? `/permalink/${row.original.uri}` : null;
    },
  };

  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <ButtonControlDrawer
        drawer="addInstancePermalink"
        icon="plus"
        actions="self.update"
      >
        {t("actions.add.permalink")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<
      InstancePermalinksListFragment$data["permalinks"],
      PermalinkNode
    >
      modelName="permalink"
      columns={columns}
      data={permalinks}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      actions={actions}
      buttons={buttons}
    />
  );
}

interface InstancePermalinksListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: InstancePermalinksListFragment$key;
}

type PermalinkNode =
  InstancePermalinksListFragment$data["permalinks"]["nodes"][number];

const fragment = graphql`
  fragment InstancePermalinksListFragment on Query {
    permalinks(order: $order, page: $page, perPage: 30) {
      nodes {
        id
        slug
        uri
        canonical
        kind
        createdAt
        permalinkable {
          ... on Item {
            title
            slug
          }
          ... on Collection {
            title
            slug
          }
          ... on Community {
            title
            slug
          }
        }
      }
      ...ModelListPageFragment
    }
  }
`;

export default InstancePermalinksList;
