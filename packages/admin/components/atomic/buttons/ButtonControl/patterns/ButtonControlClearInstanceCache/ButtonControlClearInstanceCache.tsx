import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, graphql } from "react-relay";
import { useNotify } from "hooks";
import { ButtonControl, Button } from "components/atomic";
import { Authorize } from "components/auth";
import Dialog from "components/layout/Dialog";
import {
  ButtonControlClearInstanceCacheMutation as Mutation,
  ButtonControlClearInstanceCacheMutation$data as Mutation$data,
} from "@/relay/ButtonControlClearInstanceCacheMutation.graphql";
import * as Styled from "./ButtonControlClearInstanceCache.styles";

export default function ButtonControlClearInstanceCache() {
  const { t } = useTranslation();
  const notify = useNotify();

  const [commitClearCache, inFlight] = useMutation<Mutation>(mutation);

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

  const handleClearCache = (
    onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void,
    homepage?: boolean,
  ) => {
    commitClearCache({
      variables: {
        // @ts-expect-error homepage flag not yet in schema
        input: homepage ? { homepage: true } : {},
      },
      onCompleted: (response) =>
        handleResponse(response["frontendCacheRevalidateInstance"]),
    });
    onClose();
  };

  return (
    <Authorize actions="self.update">
      <Dialog.Provider
        options={{ modal: true, scrollLockClassName: "has-scroll-lock" }}
      >
        <Dialog.Toggle>
          <ButtonControl icon="clear" disabled={inFlight}>
            {t("common.clear_cache")}
          </ButtonControl>
        </Dialog.Toggle>
        <Styled.Content
          button={(
            onClose: (e: React.MouseEvent<HTMLButtonElement>) => void,
          ) => {
            return (
              <Styled.LabelWrapper>
                <span className="t-label-sm">
                  {t("messages.cache.instance_confirm_label")}
                </span>
                <ButtonControl icon="close" iconRotate={0} onClick={onClose}>
                  {t("common.close")}
                </ButtonControl>
              </Styled.LabelWrapper>
            );
          }}
        >
          {(onClose) => (
            <>
              <Styled.Message>
                {t("messages.cache.instance_confirm_body")}
              </Styled.Message>
              <Styled.ButtonWrapper>
                <Button
                  onClick={() => handleClearCache(onClose)}
                  disabled={inFlight}
                >
                  {t("messages.cache.entire_instance")}
                </Button>
                <Button
                  onClick={() => handleClearCache(onClose, true)}
                  disabled={inFlight}
                >
                  {t("messages.cache.homepage_only")}
                </Button>
                <Button $secondary onClick={onClose}>
                  {t("common.cancel")}
                </Button>
              </Styled.ButtonWrapper>
            </>
          )}
        </Styled.Content>
      </Dialog.Provider>
    </Authorize>
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
