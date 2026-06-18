import { graphql, useFragment } from "react-relay";
import { useLatestPresentValue } from "@wdp/lib/hooks";
import { useDestroyer, useDrawerHelper, useSearchQueryVars } from "hooks";
import { ALL_VIEW_OPTIONS } from "utils/view-options";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import type {
  ItemListFragment$data,
  ItemListFragment$key,
} from "@/relay/ItemListFragment.graphql";
import {
  ItemListSearchFragment$data,
  ItemListSearchFragment$key,
} from "@/relay/ItemListSearchFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function ItemList({ items, search, headerStyle, hideHeader }: ItemListProps) {
  const itemsData = useFragment<ItemListFragment$key>(fragment, items);

  const { current: memoizedData } = useLatestPresentValue(itemsData);

  const searchScope = useFragment<ItemListSearchFragment$key>(
    searchFragment,
    search,
  );

  const { current: memoizedSearch } = useLatestPresentValue(searchScope);

  const destroy = useDestroyer();

  const drawerHelper = useDrawerHelper();

  const searchQuery = useSearchQueryVars();

  const columns = [
    ModelColumns.EntityThumbnailColumn<Node>({
      accessorFn: (row: Node) => row.entity || row,
    }),
    ModelColumns.NameColumn<Node>({
      id: "title",
      route: "item",
      accessorFn: (row: Node) => row.entity?.title || row.title,
      enableSorting: true,
    }),
    ModelColumns.ContributorsColumn<Node>({
      accessorFn: (row: Node) => row.entity || row,
    }),
    ModelColumns.SchemaColumn<Node>({
      accessorFn: (row: Node) =>
        row.entity?.schemaVersion?.name || row.schemaVersion?.name,
    }),
    ModelColumns.PublishedDateColumn<Node>({
      accessorFn: (row: Node) => row.entity || row,
    }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<Node>) =>
      drawerHelper.open("editItem", {
        drawerSlug: row.original.entity?.slug || row.original.slug,
      }),
    handleDelete: ({ row }: ModelTableActionProps<Node>) =>
      destroy.item(
        { itemId: row.original.entity?.id || row.original.id },
        row.original.entity?.title || row.original.title || "glossary.item",
      ),
    purgeProps: ({ row }: ModelTableActionProps<Node>) => ({
      id: row?.original.id,
      title: row?.original.title,
      entityType: "item" as const,
      handleDelete: () => {
        destroy.item(
          { itemId: row?.original.entity?.id || row?.original.id },
          row?.original.entity?.title || row?.original.title || "glossary.item",
        );
      },
      hideLabel: true,
    }),
    handleView: ({ row }: ModelTableActionProps<Node>) =>
      row.original.slug
        ? `/items/${row.original.entity?.slug || row.original.slug}`
        : null,
  };

  return (
    <ModelListPage<ListFragment, Node>
      modelName="item"
      actions={actions}
      columns={columns}
      data={searchQuery.hasQuery ? memoizedSearch?.results : memoizedData}
      searchData={memoizedSearch}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      viewOptions={ALL_VIEW_OPTIONS}
      showSearch
    />
  );
}

interface ItemListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  items?: ItemListFragment$key;
  search?: ItemListSearchFragment$key;
}

type ListFragment =
  | ItemListFragment$data
  | NonNullable<ItemListSearchFragment$data["results"]>;

type ItemNode = ItemListFragment$data["nodes"][number];

type ItemSearchNode = NonNullable<
  ItemListSearchFragment$data["results"]
>["nodes"][number];

type Node = ItemNode & ItemSearchNode;

const fragment = graphql`
  fragment ItemListFragment on ItemConnection {
    nodes {
      id
      slug
      title
      schemaVersion {
        name
        number
      }
      items {
        pageInfo {
          totalCount
        }
      }
      allowedActions
      # eslint-disable-next-line relay/must-colocate-fragment-spreads
      ...ContributorsColumnFragment
      ...EntityThumbnailColumnFragment
      ...PublishedDateColumnFragment
    }
    ...ModelListPageFragment
  }
`;

const searchFragment = graphql`
  fragment ItemListSearchFragment on SearchScope
  @argumentDefinitions(
    query: { type: "String", defaultValue: "" }
    page: { type: "Int", defaultValue: 1 }
    predicates: { type: "[SearchPredicateInput!]", defaultValue: [] }
    order: { type: "EntityOrder", defaultValue: PUBLISHED_ASCENDING }
    hasQuery: { type: "Boolean!" }
    schema: { type: "[String!]", defaultValue: [] }
  ) {
    results(
      access: UPDATE
      query: $query
      page: $page
      perPage: 20
      predicates: $predicates
      order: $order
      scope: ITEM
      schema: $schema
    ) @include(if: $hasQuery) {
      nodes {
        slug
        entity {
          ... on Node {
            id
          }
          ... on Sluggable {
            slug
          }
          ... on Entity {
            title
            schemaVersion {
              name
              number
            }
            allowedActions
            # eslint-disable-next-line relay/must-colocate-fragment-spreads
            ...ContributorsColumnFragment
            ...EntityThumbnailColumnFragment
            ...PublishedDateColumnFragment
          }
          ... on Item {
            items {
              pageInfo {
                totalCount
              }
            }
          }
        }
      }
      ...ModelListPageFragment
    }
    ...ModelListPageSearchFragment
  }
`;

export default ItemList;
