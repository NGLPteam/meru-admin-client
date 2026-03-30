import { useState, useCallback } from "react";
import { useMutation, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useNotify } from "hooks";
import MessageBlock from "components/atomic/MessageBlock";
import type { SubmissionCreateFormRequestAccessMutation } from "@/relay/SubmissionCreateFormRequestAccessMutation.graphql";
import TargetStep from "./steps/TargetStep";
import DetailsStep from "./steps/DetailsStep";
import type { SubmissionTargetNode } from "./types";

type Props = {
  targets: SubmissionTargetNode[];
  preselectedTargetId?: string;
  onSuccess: (slug: string) => void;
  onCancel: () => void;
};

export default function SubmissionCreateForm({
  targets,
  preselectedTargetId,
  onSuccess,
  onCancel,
}: Props) {
  const { t } = useTranslation();
  const notify = useNotify();

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [requestPending, setRequestPending] = useState(false);

  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    preselectedTargetId ?? "",
  );
  const [selectedDescendantId, setSelectedDescendantId] = useState<string>("");
  const [certificationAccepted, setCertificationAccepted] = useState(false);

  const [requestAccess] =
    useMutation<SubmissionCreateFormRequestAccessMutation>(
      requestAccessMutation,
    );

  const selectedTarget = targets.find((t) => t.id === selectedTargetId);

  const handleContinue = useCallback(() => {
    if (!selectedTarget) return;

    // If user already has deposit access, go straight to step 2
    if (selectedTarget.canDeposit.value) {
      setCurrentStep(2);
      return;
    }

    // Request deposit access
    requestAccess({
      variables: {
        input: { submissionTargetId: selectedTarget.id },
      },
      onCompleted: (response) => {
        const canDeposit =
          response?.depositorRequestCreate?.depositorRequest?.submissionTarget
            ?.canDeposit?.value;

        if (canDeposit) {
          // Auto-approved — proceed to step 2
          setCurrentStep(2);
        } else {
          // Not auto-approved — show pending message
          setRequestPending(true);
        }
      },
      onError: (err) => {
        console.error(err);
        notify.error(t("messages.deposit_access_request_failed"));
      },
    });
  }, [selectedTarget, requestAccess, notify, t]);

  if (requestPending) {
    return (
      <MessageBlock
        type="empty"
        name={t("messages.deposit_access_requested_heading")}
        message={t("messages.deposit_access_requested_message")}
      />
    );
  }

  if (currentStep === 1) {
    return (
      <TargetStep
        targets={targets}
        selectedTarget={selectedTarget}
        selectedDescendantId={selectedDescendantId}
        certificationAccepted={certificationAccepted}
        setSelectedDescendantId={setSelectedDescendantId}
        setSelectedTargetId={setSelectedTargetId}
        setCertificationAccepted={setCertificationAccepted}
        setRequestPending={setRequestPending}
        onContinue={handleContinue}
        onCancel={onCancel}
      />
    );
  }

  return (
    <DetailsStep
      selectedTarget={selectedTarget}
      selectedDescendantId={selectedDescendantId}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
}

const requestAccessMutation = graphql`
  mutation SubmissionCreateFormRequestAccessMutation(
    $input: DepositorRequestCreateInput!
  ) {
    depositorRequestCreate(input: $input) {
      depositorRequest {
        submissionTarget {
          canDeposit {
            value
          }
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;
