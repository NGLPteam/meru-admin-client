import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify } from "hooks";
import ButtonControlConfirm from "components/atomic/buttons/ButtonControl/patterns/ButtonControlConfirm";
import type { UserResetPasswordModalMutation } from "@/relay/UserResetPasswordModalMutation.graphql";
import type { ClientLocation } from "types/graphql-schema";

const CLIENT_ID = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? "";

export default function ResetPassword({
  userId,
  message,
}: {
  userId?: string;
  message?: string;
}) {
  const { t } = useTranslation();
  const notify = useNotify();

  const [mutate, loading] =
    useLoadingMutation<UserResetPasswordModalMutation>(mutation);

  const handleResponse = useCallback(
    (
      response: UserResetPasswordModalMutation["response"],
      hideDialog: () => void,
    ) => {
      const data = response?.userResetPassword;

      if (data?.success) {
        hideDialog();
        return notify.success(t("actions.reset_password.success_message"));
      }

      const { globalErrors, attributeErrors } =
        response.userResetPassword ?? {};

      if (globalErrors?.length) {
        console.error(globalErrors);
        const message = globalErrors.map((err) => err.message).join(", ");
        return notify.error(message);
      } else if (attributeErrors?.length) {
        console.error(attributeErrors);
        const message = attributeErrors
          .map((err) => err.messages.join(", "))
          .join(", ");
        return notify.error(message);
      }

      return notify.error(t("actions.reset_password.error_message"));
    },
    [notify, t],
  );

  const onSubmit = useCallback(
    (hideDialog: () => void) => {
      const input = {
        userId,
        clientId: CLIENT_ID,
        location: "ADMIN" as ClientLocation,
        redirectPath: "/",
      };

      mutate({
        variables: { input },
        onCompleted: (response) => {
          return handleResponse(response, hideDialog);
        },
        onError: (err) => {
          notify.error(err.message);

          console.warn(
            "[GraphQL Mutation Form Error][%s]",
            "userResetPassword",
          );
          console.error(err);
        },
      });
    },
    [mutate, handleResponse, notify, userId],
  );

  return (
    <ButtonControlConfirm
      icon="linkChain"
      modalLabel={t("actions.reset_password.title")}
      modalBody={message ?? t("actions.reset_password.body")}
      aria-label={t("actions.reset_password.submit_label")}
      onClick={onSubmit}
      loading={loading}
    >
      {t("actions.reset_password.title")}
    </ButtonControlConfirm>
  );
}

const mutation = graphql`
  mutation UserResetPasswordModalMutation($input: UserResetPasswordInput!) {
    userResetPassword(input: $input) {
      success
      attributeErrors {
        path
        type
        messages
      }
      globalErrors {
        message
      }
    }
  }
`;
