import { useCallback, useMemo } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PaginatedConnectionish } from "components/composed/model/ModelListPage";
import { Connectionish } from "types/graphql-helpers";
import { toEntities } from "../helpers/toEntities";
import useTableSorting from "./useTableSorting";
import useRowActions, { Actions } from "./useRowActions";
import useTableRowSelection from "./useTableRowSelection";
import type {
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
} from "@tanstack/react-table";

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface UseModelListProps<
  U extends PaginatedConnectionish | Connectionish,
  V extends Record<string, unknown>,
> {
  data?: U | null;
  columns: ColumnDef<V>[];
  actions?: Actions<V>;
  selectable?: boolean;
  /** Disable sorting on all columns */
  disableSortBy?: boolean;
  /** Controlled row selection state (overrides internal state) */
  rowSelection?: RowSelectionState;
  /** Controlled row selection change handler */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
}

function useModelList<
  U extends PaginatedConnectionish | Connectionish,
  V extends Record<string, unknown>,
>({
  data,
  columns,
  actions = {},
  selectable = false,
  disableSortBy,
  rowSelection: controlledRowSelection,
  onRowSelectionChange: controlledOnRowSelectionChange,
}: UseModelListProps<U, V>) {
  // Extract entities from the connectionish data
  const entities = useMemo(() => toEntities<U, V>(data), [data]);

  // Set the row's id to either the slug or item id
  const getRowId = useCallback((orignalRow: V) => {
    return orignalRow?.slug || orignalRow?.id;
  }, []);

  // Set up sorting
  const [sorting, setSorting] = useTableSorting();

  // Set up row selection (internal state, used when not controlled)
  const [internalRowSelection, setInternalRowSelection] =
    useTableRowSelection();

  // Get the columns with actions
  const allColumns = useRowActions(columns, actions);

  const table = useReactTable<V>({
    data: entities,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
    state: {
      sorting,
      rowSelection: controlledRowSelection ?? internalRowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange:
      controlledOnRowSelectionChange ?? setInternalRowSelection,
    enableMultisort: false,
    enableSorting: !disableSortBy,
    enableRowSelection: selectable,
    enableMultiRowSelection: selectable,
  });

  // Prepare rows
  const rows = table.getCoreRowModel().rows;

  // Prepare header groups
  const headerGroups = table.getHeaderGroups();

  // Return props for tables or grids as well as any extras.
  return {
    modelGridOrTableProps: {
      headerGroups,
      rows,
      someRowsSelected: table.getIsSomeRowsSelected(),
      allRowsSelected: table.getIsAllRowsSelected(),
      toggleAllRowsSelectedHandler: table.getToggleAllPageRowsSelectedHandler(),
    },
  };
}

export default useModelList;
