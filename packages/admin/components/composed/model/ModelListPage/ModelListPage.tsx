import { graphql } from "react-relay";
import startCase from "lodash/startCase";
import { useTranslation } from "react-i18next";
import { useId } from "react";
import { Connectionish } from "types/graphql-helpers";
import ModelList from "components/composed/model/ModelList";
import ModelListActions from "components/composed/model/ModelListActions";
import { PageHeader } from "components/layout";
import { useIsMobile, useMaybeFragment, useViewPreference } from "hooks";
import { ViewOptions } from "utils/view-options";
import CurrentSearchFilters from "components/composed/search/CurrentSearchFilters";
import SearchWithFilters from "components/composed/search/SearchWithFilters";
import Search from "components/composed/search/Search";
import OrderSelect from "components/forms/OrderSelect";
import { ModelListPageFragment$key } from "@/relay/ModelListPageFragment.graphql";
import { ModelListPageSearchFragment$key } from "@/relay/ModelListPageSearchFragment.graphql";
import ModelPagination from "../ModelPagination";
import ModelPageCountActions from "../ModelPageCountActions";
import type { ModelListActionsProps } from "components/composed/model/ModelListActions";
import type { ModelListProps } from "components/composed/model/ModelList";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

export type PaginatedConnectionish = Connectionish & ModelListPageFragment$key;

type ModelListPageProps<
  U extends PaginatedConnectionish,
  V extends Record<string, unknown> = Record<string, unknown>,
> = Omit<ModelListProps<U, V>, "view"> &
  Pick<ModelListActionsProps, "viewOptions"> &
  Pick<
    HeaderProps,
    "headerStyle" | "hideHeader" | "tabRoutes" | "tabLinksOnly"
  > & {
    buttons?: React.ReactNode;
    header?: string | null;
    showSearch?: boolean;
    hideFilters?: boolean;
    searchData?: ModelListPageSearchFragment$key | null;
    countActions?: React.JSX.Element;
    /** Number of selected items, passed to PageCountActions */
    selectedCount?: number;
    /** Rendered between count row and table (e.g. SelectAll bar) */
    selectionBar?: React.ReactNode;
    /** Custom search element; overrides showSearch/hideFilters when provided */
    searchOverride?: React.ReactNode;
    /** Additional filter tags rendered below the search bar */
    currentFiltersOverride?: React.ReactNode;
  };

function ModelListPage<
  U extends PaginatedConnectionish,
  V extends Record<string, unknown>,
>({
  modelName,
  buttons,
  viewOptions,
  headerStyle,
  hideHeader,
  header,
  tabRoutes,
  tabLinksOnly,
  showSearch,
  hideFilters,
  data,
  searchData,
  countActions,
  selectedCount,
  selectionBar,
  searchOverride,
  currentFiltersOverride,
  ...modelListProps
}: ModelListPageProps<U, V>) {
  const { t } = useTranslation();

  const instance = useMaybeFragment<U>(fragment, data);

  const searchScope = useMaybeFragment(searchFragment, searchData);

  const [selectedView, setView] = useViewPreference(
    `nglp::${modelName}.listView`,
  );

  const isMobile = useIsMobile();

  // Lists should always display as grid on mobile
  const view = isMobile ? ViewOptions.grid : selectedView;

  // List ID needed for view controls to reference table or grid area
  const listId = useId();

  const pageHeader = modelName
    ? startCase(t(`glossary.${modelName}`, { count: 2 }))
    : "";

  const pageCountActions =
    selectedView === "grid" ? <OrderSelect /> : countActions;

  const kindFilter =
    modelName === "item"
      ? ("ITEM" as const)
      : modelName === "collection"
        ? ("COLLECTION" as const)
        : undefined;

  const CurrentFiltersComponent = searchScope ? (
    <CurrentSearchFilters data={searchScope} />
  ) : currentFiltersOverride ? (
    currentFiltersOverride
  ) : undefined;

  return (
    <section>
      <PageHeader
        title={header || pageHeader}
        buttons={buttons}
        headerStyle={headerStyle}
        hideHeader={hideHeader}
        tabRoutes={tabRoutes}
        tabLinksOnly={tabLinksOnly}
      />
      <ModelListActions
        viewOptions={viewOptions}
        selectedView={selectedView}
        setView={setView}
        listId={listId}
        search={
          searchOverride ? (
            searchOverride
          ) : hideFilters ? (
            <Search />
          ) : (
            showSearch && (
              <SearchWithFilters data={searchScope} kindFilter={kindFilter} />
            )
          )
        }
      />
      {CurrentFiltersComponent}
      <ModelPageCountActions
        data={instance}
        actions={pageCountActions}
        selectedCount={selectedCount}
      />
      {selectionBar}
      <ModelList<U, V>
        {...modelListProps}
        data={data}
        modelName={modelName}
        view={view}
        listId={listId}
      />
      <ModelPagination data={instance} />
    </section>
  );
}

export default ModelListPage;

const fragment = graphql`
  fragment ModelListPageFragment on Paginated {
    ...ModelPageCountActionsFragment
    ...ModelPaginationFragment
  }
`;

const searchFragment = graphql`
  fragment ModelListPageSearchFragment on SearchScope {
    ...CurrentSearchFiltersFragment
    ...SearchWithFiltersFragment
  }
`;
