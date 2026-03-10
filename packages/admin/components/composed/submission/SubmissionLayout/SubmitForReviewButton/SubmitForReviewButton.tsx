import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { graphql, useMutation } from "react-relay";
import { useNotify } from "hooks";
import { ButtonControlConfirm } from "components/atomic";
import type {
  SubmitForReviewButtonMutation as Mutation,
  SubmitForReviewButtonMutation$data as Mutation$data,
} from "@/relay/SubmitForReviewButtonMutation.graphql";
import type { MutationAttributeError } from "types/graphql-schema";

export default function SubmitForReviewButton({ submissionId, state }: Props) {
  const { t } = useTranslation();
  const notify = useNotify();

  const [commitSubmit, inFlight] = useMutation<Mutation>(mutation);

  const handleResponse = useCallback(
    (data: Mutation$data["submissionChangeState"] | null | undefined) => {
      if (!data) return;

      const { globalErrors, attributeErrors, submission } = data;

      if (submission) {
        notify.success(t("messages.submission_submitted"));
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

  const handleSubmitForReview = (hideDialog: () => void) => {
    commitSubmit({
      variables: {
        input: {
          submissionId,
          toState: "SUBMITTED",
        },
      },
      onCompleted: (response) =>
        handleResponse(response["submissionChangeState"]),
    });
    hideDialog();
  };

  return (
    <ButtonControlConfirm
      modalLabel={
        state === "DRAFT"
          ? t("common.submit")
          : t("actions.submissions.resubmit")
      }
      modalBody={
        state === "DRAFT"
          ? t("actions.submissions.submit_for_review_confirm")
          : t("actions.resubmit_for_review_confirm")
      }
      aria-label={
        state === "DRAFT"
          ? t("common.submit")
          : t("actions.resubmit_for_review")
      }
      onClick={handleSubmitForReview}
      icon="arrow"
      disabled={inFlight}
    >
      {state === "DRAFT"
        ? t("common.submit")
        : t("actions.submissions.resubmit")}
    </ButtonControlConfirm>
  );
}

interface Props {
  submissionId: string;
  state: "DRAFT" | "REVISION_REQUESTED";
}

const mutation = graphql`
  mutation SubmitForReviewButtonMutation($input: SubmissionChangeStateInput!) {
    submissionChangeState(input: $input) {
      submission {
        id
        state
      }
      attributeErrors {
        messages
        path
        type
      }
      globalErrors {
        message
        type
      }
    }
  }
`;
