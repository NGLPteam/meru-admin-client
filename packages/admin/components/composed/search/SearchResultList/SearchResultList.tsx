import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useMaybeFragment, useDrawerHelper, useSearchQueryVars } from "hooks";
import { ALL_VIEW_OPTIONS } from "utils/view-options";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { NamedLink } from "components/atomic";
import type {
  SearchResultListFragment$data,
  SearchResultListFragment$key,
} from "@/relay/SearchResultListFragment.graphql";
import type { Drawers } from "hooks/useDrawerHelper";
import type { CellContext, ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

const VIEW_PATH_BY_TYPENAME: Record<string, string> = {
  Community: "/communities",
  Collection: "/collections",
  Item: "/items",
};

function SearchResultList({
  data,
  headerStyle,
  hideHeader,
}: SearchResultListProps) {
  const { t } = useTranslation();
  const searchQuery = useSearchQueryVars();

  const searchScope = useMaybeFragment<SearchResultListFragment$key>(
    fragment,
    data,
  );

  const drawerHelper = useDrawerHelper();

  const columns = [
    ModelColumns.EntityThumbnailColumn<Node>({
      accessorFn: (row: Node) => row.entity || row,
    }),
    ModelColumns.NameColumn<Node>({
      accessorKey: "entity",
      cell: ({ row, getValue }: CellContext<Node, unknown>) => {
        const value = getValue<Node["entity"]>();
        if (!row?.original?.entity?.slug) return value.slug;

        const route = row.original.entity.__typename.toLowerCase();

        return (
          <NamedLink
            route={route}
            routeParams={{ slug: row.original.entity.slug }}
            passHref
          >
            <a className="t-weight-md a-link">{value.title}</a>
          </NamedLink>
        );
      },
    }),
    ModelColumns.SchemaColumn<Node>({
      accessorFn: (originalRow: Node) => {
        return `${originalRow?.entity?.schemaVersion?.name}`;
      },
    }),
    ModelColumns.PublishedDateColumn<Node>({
      accessorFn: (row: Node) => row.entity || row,
    }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<Node>) =>
      drawerHelper.open(`edit${row.original.entity.__typename}` as Drawers, {
        drawerSlug: row.original.entity.slug,
      }),
    handleView: ({ row }: ModelTableActionProps<Node>) => {
      const { __typename, slug } = row.original.entity;
      if (!slug) return null;
      const basePath = VIEW_PATH_BY_TYPENAME[__typename];
      return basePath ? `${basePath}/${slug}` : null;
    },
  };

  const resultsI18nKey = searchQuery.query
    ? "search.results_for_name"
    : "search.results";

  return (
    <ModelListPage<SearchResultListFragment$data["results"], Node>
      modelName="item"
      header={t(resultsI18nKey, {
        name: searchQuery.query,
      })}
      actions={actions}
      columns={columns}
      data={searchScope?.results}
      searchData={searchScope}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      viewOptions={ALL_VIEW_OPTIONS}
      showSearch
    />
  );
}

interface SearchResultListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: SearchResultListFragment$key | null;
  searchQuery?: string | null;
  isLoading?: boolean;
}

type Node = SearchResultListFragment$data["results"]["nodes"][number];

const fragment = graphql`
  fragment SearchResultListFragment on SearchScope
  @argumentDefinitions(
    query: { type: "String", defaultValue: "" }
    page: { type: "Int", defaultValue: 1 }
    predicates: { type: "[SearchPredicateInput!]", defaultValue: [] }
    order: { type: "EntityOrder", defaultValue: PUBLISHED_ASCENDING }
    schema: { type: "[String!]", defaultValue: [] }
  ) {
    results(
      access: UPDATE
      query: $query
      page: $page
      predicates: $predicates
      order: $order
      perPage: 20
      schema: $schema
    ) {
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
            __typename
            title
            schemaVersion {
              name
              number
              kind
            }
            allowedActions
            # eslint-disable-next-line relay/must-colocate-fragment-spreads
            ...EntityThumbnailColumnFragment
            ...PublishedDateColumnFragment
          }
        }
      }
      pageInfo {
        totalCount
      }
      ...ModelListPageFragment
    }
    ...ModelListPageSearchFragment
  }
`;

export default SearchResultList;
