import { useCallback, useId } from "react";
import { useFragment, useMutation, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDialogState } from "reakit/Dialog";
import { useNotify } from "hooks";
import {
  SwitchWrapper,
  Icon as ToggleIcon,
} from "components/forms/Switch/Switch.styles";
import Modal from "components/layout/Modal";
import ConfirmModal from "components/layout/ConfirmModal";
import type { SubmissionTargetStateToggleFragment$key } from "@/relay/SubmissionTargetStateToggleFragment.graphql";
import type {
  SubmissionTargetStateToggleOpenMutation,
  SubmissionTargetStateToggleOpenMutation$data,
} from "@/relay/SubmissionTargetStateToggleOpenMutation.graphql";
import type {
  SubmissionTargetStateToggleCloseMutation,
  SubmissionTargetStateToggleCloseMutation$data,
} from "@/relay/SubmissionTargetStateToggleCloseMutation.graphql";

export default function SubmissionTargetStateToggle({ data }: Props) {
  const { t } = useTranslation();
  const notify = useNotify();
  const dialog = useDialogState({ visible: false, animated: true });
  const uid = useId();

  const target = useFragment<SubmissionTargetStateToggleFragment$key>(
    fragment,
    data ?? null,
  );

  const { submissionTargetId, state } = target ?? {};
  const isOpen = state === "OPEN";
  const isConfigured = !!target;

  const [commitOpen, openLoading] =
    useMutation<SubmissionTargetStateToggleOpenMutation>(openMutation);
  const [commitClose, closeLoading] =
    useMutation<SubmissionTargetStateToggleCloseMutation>(closeMutation);

  const loading = openLoading || closeLoading;

  const handleToggleClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (isConfigured) dialog.show();
    },
    [dialog, isConfigured],
  );

  const handleOpenResponse = useCallback(
    (response: SubmissionTargetStateToggleOpenMutation$data) => {
      const { submissionTarget, globalErrors } =
        response.submissionTargetOpen ?? {};

      if (submissionTarget) {
        notify.success(t("actions.submissions.submissions_opened"));
        dialog.hide();
      } else if (globalErrors?.length) {
        notify.mutationGlobalError(globalErrors);
      }
    },
    [notify, t, dialog],
  );

  const handleCloseResponse = useCallback(
    (response: SubmissionTargetStateToggleCloseMutation$data) => {
      const { submissionTarget, globalErrors } =
        response.submissionTargetClose ?? {};

      if (submissionTarget) {
        notify.success(t("actions.submissions.submissions_closed"));
        dialog.hide();
      } else if (globalErrors?.length) {
        notify.mutationGlobalError(globalErrors);
      }
    },
    [notify, t, dialog],
  );

  const handleConfirm = useCallback(() => {
    if (!submissionTargetId) return;
    if (isOpen) {
      commitClose({
        variables: { input: { submissionTargetId } },
        onCompleted: handleCloseResponse,
        onError: (err) => notify.error(err.message),
      });
    } else {
      commitOpen({
        variables: { input: { submissionTargetId } },
        onCompleted: handleOpenResponse,
        onError: (err) => notify.error(err.message),
      });
    }
  }, [
    isOpen,
    submissionTargetId,
    commitOpen,
    commitClose,
    handleOpenResponse,
    handleCloseResponse,
    notify,
  ]);

  return (
    <>
      <SwitchWrapper as="label" htmlFor={uid}>
        <span>{t("forms.fields.submissions_enabled")}</span>
        <input
          id={uid}
          type="checkbox"
          className="a-hidden"
          checked={isOpen}
          onChange={handleToggleClick}
          disabled={loading || !isConfigured}
        />
        <ToggleIcon icon="toggle" />
      </SwitchWrapper>
      <Modal
        label={
          isOpen
            ? t("actions.submissions.disable_submissions")
            : t("actions.submissions.enable_submissions")
        }
        dialog={dialog}
        hideOnClickOutside={false}
      >
        {({ handleClose }) => (
          <ConfirmModal
            modalBody={
              isOpen
                ? t("messages.submissions_close_confirm")
                : t("messages.submissions_open_confirm")
            }
            onClick={handleConfirm}
            handleClose={handleClose}
            loading={loading}
          />
        )}
      </Modal>
    </>
  );
}

interface Props {
  data: SubmissionTargetStateToggleFragment$key | null;
}

const fragment = graphql`
  fragment SubmissionTargetStateToggleFragment on SubmissionTarget {
    submissionTargetId: id
    state
  }
`;

const openMutation = graphql`
  mutation SubmissionTargetStateToggleOpenMutation(
    $input: SubmissionTargetOpenInput!
  ) {
    submissionTargetOpen(input: $input) {
      submissionTarget {
        id
        state
      }
      globalErrors {
        message
        type
      }
    }
  }
`;

const closeMutation = graphql`
  mutation SubmissionTargetStateToggleCloseMutation(
    $input: SubmissionTargetCloseInput!
  ) {
    submissionTargetClose(input: $input) {
      submissionTarget {
        id
        state
      }
      globalErrors {
        message
        type
      }
    }
  }
`;
