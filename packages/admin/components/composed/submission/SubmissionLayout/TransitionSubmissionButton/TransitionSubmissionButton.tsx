import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { ButtonControl } from "components/atomic";
import Modal from "components/layout/Modal";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
} from "components/api/MutationForm";
import type { SubmissionLayoutFragment$data } from "@/relay/SubmissionLayoutFragment.graphql";
import type {
  SubmissionChangeStateInput,
  TransitionSubmissionButtonMutation,
} from "@/relay/TransitionSubmissionButtonMutation.graphql";

export default function TransitionSubmissionButton({ submission }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogState({ visible: false, animated: true });

  const availableTransitions = submission?.availableTransitions;

  const options = useMemo(
    () =>
      availableTransitions?.map((transition) => ({
        label: t(`status.${transition.toState.toLowerCase()}_label`),
        value: transition.toState,
      })) ?? [],
    [availableTransitions, t],
  );

  const defaultValues: SubmissionChangeStateInput = {
    submissionId: submission?.id ?? "",
    toState: availableTransitions?.[0]?.toState ?? "DRAFT",
  };

  const toVariables = useToVariables<
    TransitionSubmissionButtonMutation,
    SubmissionChangeStateInput
  >((data) => ({ input: data }), []);

  const renderForm = useRenderForm<SubmissionChangeStateInput>(
    ({ form: { register } }) => (
      <Forms.Grid>
        <Forms.Select
          label="actions.submissions.transition_select_label"
          options={options}
          required
          isWide
          {...register("toState")}
        />
      </Forms.Grid>
    ),
    [options],
  );

  if (!submission || !availableTransitions?.length) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dialog.show();
  };

  return (
    <>
      <DialogDisclosure
        as={ButtonControl}
        icon="statusCheck"
        onClick={handleClick}
        aria-label={t("actions.submissions.transition")}
        {...dialog}
      >
        {t("actions.submissions.transition")}
      </DialogDisclosure>
      <Modal
        label={t("actions.submissions.transition")}
        dialog={dialog}
        hideOnClickOutside={false}
      >
        <MutationForm<
          TransitionSubmissionButtonMutation,
          SubmissionChangeStateInput
        >
          name="submissionChangeState"
          mutation={mutation}
          toVariables={toVariables}
          defaultValues={defaultValues}
          successNotification="messages.submission_state_changed"
          refetchTags={["submissions"]}
          onSuccess={() => dialog.hide()}
        >
          {renderForm}
        </MutationForm>
      </Modal>
    </>
  );
}

interface Props {
  submission?: SubmissionLayoutFragment$data | null;
}

const mutation = graphql`
  mutation TransitionSubmissionButtonMutation(
    $input: SubmissionChangeStateInput!
  ) {
    submissionChangeState(input: $input) {
      submission {
        ...SubmissionLayoutFragment
      }
      ...MutationForm_mutationErrors
    }
  }
`;
