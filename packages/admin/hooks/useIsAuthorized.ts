import { useMemo } from "react";
import { useViewerContext } from "contexts";
import { normalizeArray } from "helpers";
import useAuthContext from "./useAuthContext";

/**
 * Determine if the user is authorized to perform an action.
 * Pass in allowedActions to compare against an array of actions.
 * Leave empty to compare against global viewer actions.
 *
 * @returns boolean
 */
export const useIsAuthorized = ({
  actions,
  allowedActions,
}: useIsAuthorizedProps) => {
  // Global viewer permissions
  const {
    allowedActions: viewerAllowedActions,
    globalAdmin,
    canReceiveReviewRequests,
  } = useViewerContext();
  // Entity level permissions
  const { allowedActions: entityAllowedActions } = useAuthContext();

  return useMemo(() => {
    if (globalAdmin || !actions) return true;

    const checkActions = normalizeArray(actions);
    const permissions = entityAllowedActions
      ? [
          ...viewerAllowedActions,
          ...entityAllowedActions,
          ...(canReceiveReviewRequests?.value ? ["submissions.review"] : []),
        ]
      : [
          ...viewerAllowedActions,
          ...(canReceiveReviewRequests?.value ? ["submissions.review"] : []),
        ];
    const actionsList = allowedActions || permissions;

    return actionsList?.some((action) => checkActions.includes(action));
  }, [
    viewerAllowedActions,
    entityAllowedActions,
    allowedActions,
    actions,
    globalAdmin,
    canReceiveReviewRequests?.value,
  ]);
};

export interface useIsAuthorizedProps {
  actions: string[] | string | null;
  allowedActions?: string[] | readonly string[];
}

export default useIsAuthorized;
