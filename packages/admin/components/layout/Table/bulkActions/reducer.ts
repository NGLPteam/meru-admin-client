export interface BulkSelectionState {
  ids: string[];
  filters: Record<string, unknown> | null;
}

export type BulkAction =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: string }
  | { type: "addPage"; payload: string[] }
  | { type: "removeAndClear"; payload: string[] }
  | { type: "setFilters"; payload: Record<string, unknown> }
  | { type: "reset"; payload: BulkSelectionState };

export function bulkActionsReducer(
  state: BulkSelectionState,
  action: BulkAction,
): BulkSelectionState {
  switch (action.type) {
    case "add":
      return { ...state, ids: [...state.ids, action.payload] };
    case "remove":
      return { ...state, ids: state.ids.filter((id) => id !== action.payload) };
    case "addPage":
      return { filters: null, ids: action.payload };
    case "removeAndClear":
      return { filters: null, ids: action.payload };
    case "setFilters":
      return { ids: [], filters: action.payload };
    case "reset":
      return action.payload;
    default:
      return state;
  }
}
