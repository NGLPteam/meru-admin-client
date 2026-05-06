import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify } from "hooks";
import {
  ButtonControlClearEntityCacheMutation as Mutation,
  ButtonControlClearEntityCacheMutation$data as Mutation$data,
} from "@/relay/ButtonControlClearEntityCacheMutation.graphql";
import ButtonControlConfirm from "./ButtonControlConfirm";
import type { MutationAttributeError } from "types/graphql-schema";

export default function ButtonControlClearEntityCache({ id }: { id?: string }) {
  const { t } = useTranslation();
  const notify = useNotify();

  const [commitClearCache, inFlight] = useLoadingMutation<Mutation>(mutation);

  const handleResponse = useCallback(
    (
      data: Mutation$data["frontendCacheRevalidateEntity"] | null | undefined,
    ) => {
      if (!data) return;

      const { globalErrors, attributeErrors, revalidated } = data ?? {};

      if (revalidated) {
        notify.success(t("messages.cache.entity_success"));
      } else if (globalErrors?.length) {
        notify.mutationGlobalError(globalErrors);
      } else if (attributeErrors?.length) {
        notify.mutationAttributeError(
          attributeErrors as MutationAttributeError[],
        );
      }
    },
    [notify, t],
  );

  if (!id) return null;

  const handleClearCache = (hideDialog: () => void) => {
    commitClearCache({
      variables: {
        input: { entityId: id },
      },
      onCompleted: (response) =>
        handleResponse(response["frontendCacheRevalidateEntity"]),
    });
    hideDialog();
  };

  return (
    <ButtonControlConfirm
      modalLabel={t("messages.cache.entity_confirm_label")}
      modalBody={t("messages.cache.entity_confirm_body")}
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
  mutation ButtonControlClearEntityCacheMutation(
    $input: FrontendCacheRevalidateEntityInput!
  ) {
    frontendCacheRevalidateEntity(input: $input) {
      revalidated
      globalErrors {
        message
        type
      }
      attributeErrors {
        messages
        path
        type
      }
    }
  }
`;
