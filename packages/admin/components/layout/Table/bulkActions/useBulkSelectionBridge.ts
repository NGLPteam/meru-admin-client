import { useCallback, useMemo } from "react";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import type { BulkSelectionState } from "./reducer";

/**
 * Bridges useBulkActions state ↔ react-table RowSelectionState.
 *
 * Derives `rowSelection` from the bulk selection and translates
 * react-table checkbox changes back into bulk action dispatches.
 */
export default function useBulkSelectionBridge(
  records: { id: string }[] | undefined,
  bulkSelection: BulkSelectionState,
  addItem: (id: string) => void,
  removeItem: (id: string) => void,
  addPage: (ids: string[]) => void,
) {
  // Derive RowSelectionState from bulkSelection
  const rowSelection = useMemo<RowSelectionState>(() => {
    if (bulkSelection.filters) {
      // Filter mode: all visible rows selected
      return (records ?? []).reduce<RowSelectionState>(
        (acc, r) => ({ ...acc, [r.id]: true }),
        {},
      );
    }
    return bulkSelection.ids.reduce<RowSelectionState>(
      (acc, id) => ({ ...acc, [id]: true }),
      {},
    );
  }, [bulkSelection, records]);

  // Handle changes from react-table checkboxes
  const onRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (updaterOrValue) => {
      const newState =
        typeof updaterOrValue === "function"
          ? updaterOrValue(rowSelection)
          : updaterOrValue;

      const newIds = Object.keys(newState).filter((id) => newState[id]);
      const oldIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);
      const added = newIds.filter((id) => !oldIds.includes(id));
      const removed = oldIds.filter((id) => !newIds.includes(id));

      // Header "select all" checkbox toggles all page rows at once
      if (added.length > 1 && removed.length === 0) {
        addPage(newIds);
      } else {
        added.forEach(addItem);
        removed.forEach(removeItem);
      }
    },
    [rowSelection, addItem, removeItem, addPage],
  );

  return { rowSelection, onRowSelectionChange };
}
