import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify } from "hooks";
import MessageBlock from "components/atomic/MessageBlock";
import ButtonControl from "components/atomic/buttons/ButtonControl";
import type { InvalidTargetRequestAccessMutation } from "@/relay/InvalidTargetRequestAccessMutation.graphql";
import * as Styled from "./InvalidTarget.styles";
import type { SubmissionTargetNode } from "../types";

type Props = {
  preselectedTarget?: SubmissionTargetNode;
  hasDepositableTargets: boolean;
};

export default function InvalidTarget({
  preselectedTarget,
  hasDepositableTargets,
}: Props) {
  const { t } = useTranslation();
  const notify = useNotify();
  const [requested, setRequested] = useState(false);

  const [mutate, loading] =
    useLoadingMutation<InvalidTargetRequestAccessMutation>(mutation);

  const handleRequestAccess = useCallback(() => {
    if (!preselectedTarget) return;

    mutate({
      variables: {
        input: { submissionTargetId: preselectedTarget.id },
      },
      onCompleted: () => {
        setRequested(true);
      },
      onError: (err) => {
        console.error(err);
        notify.error(t("messages.deposit_access_request_failed"));
      },
    });
  }, [mutate, preselectedTarget, notify, t]);

  // Preselected target exists but user can't deposit to it
  if (preselectedTarget && !preselectedTarget.canDeposit.value) {
    if (requested) {
      return (
        <MessageBlock
          type="empty"
          name={t("messages.deposit_access_requested_heading")}
          message={t("messages.deposit_access_requested_message")}
        />
      );
    }

    return (
      <MessageBlock
        type="empty"
        name={t("messages.no_deposit_access_heading")}
        message={
          preselectedTarget.canRequestDepositAccess.value ? (
            <Styled.Message>
              <p>{t("messages.no_deposit_access_message")}</p>
              <ButtonControl
                onClick={handleRequestAccess}
                disabled={loading}
                aria-label={t("actions.request_deposit_access")}
              >
                {t("actions.submissions.request_deposit_access")}
              </ButtonControl>
            </Styled.Message>
          ) : (
            t("messages.no_deposit_access_message")
          )
        }
      />
    );
  }

  // No depositable targets available
  if (!preselectedTarget && !hasDepositableTargets) {
    return (
      <MessageBlock
        type="empty"
        name={t("messages.no_targets_heading")}
        message={t("messages.no_targets_message")}
      />
    );
  }

  return null;
}

const mutation = graphql`
  mutation InvalidTargetRequestAccessMutation(
    $input: DepositorRequestCreateInput!
  ) {
    depositorRequestCreate(input: $input) {
      depositorRequest {
        id
      }
      ...MutationForm_mutationErrors
    }
  }
`;
