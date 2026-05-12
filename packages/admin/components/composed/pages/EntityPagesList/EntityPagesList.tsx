import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDestroyer, useDrawerHelper, useMaybeFragment } from "hooks";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { ButtonControlDrawer, ButtonControlGroup } from "components/atomic";
import type { EntityPagesListFragment$key } from "@/relay/EntityPagesListFragment.graphql";
import type {
  EntityPagesListDataFragment$data,
  EntityPagesListDataFragment$key,
} from "@/relay/EntityPagesListDataFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function EntityPagesList({
  data,
  headerStyle,
  hideHeader,
}: EntityPagesListProps) {
  const { t } = useTranslation();
  const destroy = useDestroyer();
  const drawerHelper = useDrawerHelper();

  /* eslint-disable max-len */
  const sourceEntity = useMaybeFragment<EntityPagesListFragment$key>(
    fragment,
    data,
  );
  const pagesData = useMaybeFragment<EntityPagesListDataFragment$key>(
    linksFragment,
    sourceEntity?.pages,
  );
  /* eslint-enable max-len */

  /** Columns */
  const columns = [
    ModelColumns.PageHeroColumn<Node>(),
    ModelColumns.StringColumn<Node>({
      header: () => <>{t("lists.name_column")}</>,
      id: "title",
    }),
    ModelColumns.StringColumn<Node>({
      header: () => <>{t("lists.slug_column")}</>,
      id: "slug",
    }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<Node>) =>
      drawerHelper.open("editPage", {
        drawerSlug: sourceEntity?.slug,
        drawerPageSlug: row.original.slug,
      }),
    handleDelete: ({ row }: ModelTableActionProps<Node>) =>
      destroy.page(
        { pageId: row.original.id },
        row.original.title || "glossary.page",
      ),
    handleView: ({ row }: ModelTableActionProps<Node>) => {
      const typeRoute =
        row.original.entity?.__typename === "Collection"
          ? "collections"
          : row.original.entity?.__typename === "items"
            ? "items"
            : "communities";

      return row.original.slug
        ? `/${typeRoute}/${row.original.entity?.slug}/page/${row.original.slug}`
        : null;
    },
  };

  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <ButtonControlDrawer
        drawer="addPage"
        drawerQuery={{
          drawerSlug: sourceEntity?.slug ? sourceEntity.slug : "",
        }}
        icon="plus"
        actions="self.update"
      >
        {t("actions.add.page")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<EntityPagesListDataFragment$data, Node>
      modelName={"page"}
      columns={columns}
      data={pagesData}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      buttons={buttons}
      actions={actions}
    />
  );
}

interface EntityPagesListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: EntityPagesListFragment$key | null;
}

type Node = EntityPagesListDataFragment$data["edges"][number]["node"];

const linksFragment = graphql`
  fragment EntityPagesListDataFragment on PageConnection {
    edges {
      node {
        id
        title
        slug
        entity {
          __typename
          ... on Sluggable {
            slug
          }
        }
        ...PageHeroColumnFragment
      }
    }
    ...ModelListPageFragment
  }
`;

const fragment = graphql`
  fragment EntityPagesListFragment on Entity {
    ... on Community {
      slug
      pages(page: $page, perPage: 20) {
        ...EntityPagesListDataFragment
      }
    }
    ... on Collection {
      slug
      pages(page: $page, perPage: 20) {
        ...EntityPagesListDataFragment
      }
    }
    ... on Item {
      slug
      pages(page: $page, perPage: 20) {
        ...EntityPagesListDataFragment
      }
    }
  }
`;

export default EntityPagesList;
