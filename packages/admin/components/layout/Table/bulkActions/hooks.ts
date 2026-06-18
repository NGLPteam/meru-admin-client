import {
  useState,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/router";
import isEqual from "lodash/isEqual";
import { bulkActionsReducer, type BulkSelectionState } from "./reducer";

interface BulkActionsReturn {
  bulkActionsActive: boolean;
  toggleBulkActions: () => void;
  resetBulkSelection: () => void;
  handleSelectAll: () => void;
  handleSelectAllUncheck: (removeId: string) => void;
  bulkSelection: BulkSelectionState;
  bulkSelectionEmpty: boolean;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  addPage: (ids: string[]) => void;
}

export default function useBulkActions(
  records: { id: string }[] | undefined,
  filters: Record<string, unknown>,
): BulkActionsReturn {
  const [bulkActionsActive, setBulkActionsActive] = useState(false);

  const toggleBulkActions = useCallback(
    () => setBulkActionsActive(!bulkActionsActive),
    [bulkActionsActive, setBulkActionsActive],
  );

  const initSelectionState = useMemo<BulkSelectionState>(
    () => ({
      ids: [],
      filters: null,
    }),
    [],
  );

  const [bulkSelection, dispatchSelection] = useReducer(
    bulkActionsReducer,
    initSelectionState,
  );

  const bulkSelectionEmpty = isEqual(initSelectionState, bulkSelection);

  const visibleIds = useMemo(() => records?.map((a) => a.id), [records]);

  const handleSelectAll = useCallback(() => {
    const { order, ...selectionFilters } = filters;
    return dispatchSelection({
      type: "setFilters",
      payload: selectionFilters,
    });
  }, [filters]);

  const handleSelectAllUncheck = (removeId: string) => {
    dispatchSelection({
      type: "removeAndClear",
      payload: visibleIds?.filter((id) => id !== removeId) ?? [],
    });
  };

  const resetBulkSelection = useCallback(
    () =>
      dispatchSelection({
        type: "reset",
        payload: initSelectionState,
      }),
    [initSelectionState],
  );

  const addItem = (id: string) =>
    dispatchSelection({ type: "add", payload: id });
  const removeItem = (id: string) =>
    bulkSelection?.filters
      ? handleSelectAllUncheck(id)
      : dispatchSelection({ type: "remove", payload: id });
  const addPage = (ids: string[]) =>
    dispatchSelection({ type: "addPage", payload: ids });

  const router = useRouter();
  const page = (router.query.page as string) ?? "1";
  const pageRef = useRef(page);

  useEffect(() => {
    if (page && page !== pageRef.current) {
      resetBulkSelection();
    }
  }, [page, resetBulkSelection]);

  return {
    bulkActionsActive,
    toggleBulkActions,
    resetBulkSelection,
    handleSelectAll,
    handleSelectAllUncheck,
    bulkSelection,
    bulkSelectionEmpty,
    addItem,
    removeItem,
    addPage,
  };
}

export const useClearBulkSelectionWithFilters = (
  baseOnReset: () => void,
  baseSetFilter: (param: string, value: unknown) => void,
  resetBulkSelection: () => void,
  bulkSelectionEmpty: boolean,
) => {
  const setParam = useCallback(
    (param: string, value: unknown) => {
      baseSetFilter(param, value);

      if (!bulkSelectionEmpty) resetBulkSelection();
    },
    [bulkSelectionEmpty, resetBulkSelection, baseSetFilter],
  );

  const onReset = useCallback(() => {
    baseOnReset();

    if (!bulkSelectionEmpty) resetBulkSelection();
  }, [bulkSelectionEmpty, resetBulkSelection, baseOnReset]);

  return { setParam, onReset };
};
