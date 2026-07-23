import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify } from "hooks";
import {
  ButtonControlClearInstanceCacheMutation as Mutation,
  ButtonControlClearInstanceCacheMutation$data as Mutation$data,
} from "@/relay/ButtonControlClearInstanceCacheMutation.graphql";
import ButtonControlConfirm from "./ButtonControlConfirm";

export default function ButtonControlClearInstanceCache() {
  const { t } = useTranslation();
  const notify = useNotify();

  const [commitClearCache, inFlight] = useLoadingMutation<Mutation>(mutation);

  const handleResponse = useCallback(
    (
      data: Mutation$data["frontendCacheRevalidateInstance"] | null | undefined,
    ) => {
      if (!data) return;

      const { globalErrors, revalidated } = data ?? {};

      if (revalidated) {
        notify.success(t("messages.cache.instance_success"));
      } else if (globalErrors?.length) {
        notify.mutationGlobalError(globalErrors);
      }
    },
    [notify, t],
  );

  const handleClearCache = (hideDialog: () => void) => {
    commitClearCache({
      variables: {
        input: {},
      },
      onCompleted: (response) =>
        handleResponse(response["frontendCacheRevalidateInstance"]),
    });
    hideDialog();
  };

  return (
    <ButtonControlConfirm
      modalLabel={t("messages.cache.instance_confirm_label")}
      modalBody={t("messages.cache.instance_confirm_body")}
      icon="clear"
      onClick={handleClearCache}
      actions="self.update"
      disabled={inFlight}
    >
      {t("common.clear_cache")}
    </ButtonControlConfirm>
  );
}

const mutation = graphql`
  mutation ButtonControlClearInstanceCacheMutation(
    $input: FrontendCacheRevalidateInstanceInput!
  ) {
    frontendCacheRevalidateInstance(input: $input) {
      revalidated
      globalErrors {
        message
        type
      }
    }
  }
`;
