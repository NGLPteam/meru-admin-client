import { useTranslation } from "react-i18next";
import { Connectionish } from "types/graphql-helpers";
import { NoResultsMessage } from "components/atomic";
import ModelTable from "components/composed/model/ModelTable";
import ModelGrid from "components/composed/model/ModelGrid";
import useModelList from "components/composed/model/ModelList/hooks/useModelList";
import { ModelNames } from "helpers";
import { useQueryStateContext } from "hooks";
import { ViewOptions } from "utils/view-options";
import type { UseModelListProps } from "components/composed/model/ModelList/hooks/useModelList";
import type { PaginatedConnectionish } from "components/composed/model/ModelListPage";

export interface ModelListProps<
  U extends PaginatedConnectionish | Connectionish,
  V extends Record<string, unknown>,
> extends UseModelListProps<U, V> {
  view: ViewOptions;
  modelName?: Lowercase<ModelNames>;
  listId?: string;
}

function ModelList<
  U extends PaginatedConnectionish | Connectionish,
  V extends Record<string, unknown>,
>({
  modelName,
  selectable = false,
  data,
  view,
  columns,
  actions,
  disableSortBy,
  listId,
  rowSelection,
  onRowSelectionChange,
}: ModelListProps<U, V>) {
  const { t } = useTranslation();
  const title = modelName ? t(modelName, { count: 2 }) : "";

  const queryState = useQueryStateContext();

  const { modelGridOrTableProps } = useModelList<U, V>({
    columns,
    actions,
    data,
    selectable,
    disableSortBy,
    rowSelection,
    onRowSelectionChange,
  });

  let ModelListType;
  switch (view) {
    case ViewOptions.table:
      ModelListType = ModelTable;
      break;
    case ViewOptions.grid:
      ModelListType = ModelGrid;
      break;
    default:
      ModelListType = null;
  }

  if (!ModelListType) return null;

  const hasRows = modelGridOrTableProps.rows.length > 0;

  return (
    <>
      {queryState.completed && !hasRows ? (
        <NoResultsMessage />
      ) : (
        <ModelListType<V>
          title={title}
          selectable={selectable}
          listId={listId}
          {...modelGridOrTableProps}
        />
      )}
    </>
  );
}

export default ModelList;
