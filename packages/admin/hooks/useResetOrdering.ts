import { useCallback } from "react";
import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { GraphQLTaggedNode, readInlineData } from "relay-runtime";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify, usePageContext } from "hooks";

import { ResetOrderingInput } from "types/graphql-schema";
import type { useResetOrderingFragment$key } from "@/relay/useResetOrderingFragment.graphql";
import { useResetOrderingMutation } from "@/relay/useResetOrderingMutation.graphql";

export function useResetOrdering() {
  const notify = useNotify();
  const { t } = useTranslation();
  const { setTriggeredRefetchTags } = usePageContext();

  const handleResponse = useCallback(
    (
      data: useResetOrderingFragment$key | null | undefined,
      name: string,
      refetchTags: string[],
    ) => {
      if (!data) return;
      const results = readInlineData<useResetOrderingFragment$key>(
        fragment as GraphQLTaggedNode,
        data,
      );

      if (results.globalErrors && results.globalErrors.length > 0) {
        notify.mutationGlobalError(results.globalErrors);
      } else if (results) {
        notify.success(t("messages.enable.success", { name }));
        setTriggeredRefetchTags(refetchTags);
      }
    },
    [notify, setTriggeredRefetchTags, t],
  );

  /* Reset an ordering */
  const [commitResetOrdering] = useLoadingMutation<useResetOrderingMutation>(
    resetOrderingMutation,
  );

  const reset = useCallback(
    async (input: ResetOrderingInput, label: string, refetchTags: string[]) => {
      commitResetOrdering({
        variables: { input },
        onCompleted: (response) =>
          handleResponse(response.resetOrdering, label, refetchTags),
      });
    },
    [commitResetOrdering, handleResponse],
  );

  return reset;
}
export default useResetOrdering;

const resetOrderingMutation = graphql`
  mutation useResetOrderingMutation($input: ResetOrderingInput!) {
    resetOrdering(input: $input) {
      ...useResetOrderingFragment
    }
  }
`;

const fragment = graphql`
  fragment useResetOrderingFragment on StandardMutationPayload @inline {
    ... on DestroyMutationPayload {
      destroyed
      globalErrors {
        message
        type
      }
    }
    ... on RevokeAccessPayload {
      revoked
      globalErrors {
        message
        type
      }
    }
    ... on DestroyOrderingPayload {
      disabled
      globalErrors {
        message
        type
      }
    }
  }
`;
