import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { ButtonControl } from "components/atomic";
import { FormFieldSkeleton } from "components/atomic/loading";
import Modal from "components/layout/Modal";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
} from "components/api/MutationForm";
import UserTypeahead from "components/forms/UserTypeahead";
import type {
  SubmissionRequestReviewInput,
  RequestReviewButtonMutation,
} from "@/relay/RequestReviewButtonMutation.graphql";
import * as Styled from "./RequestReviewButton.styles";

export default function RequestReviewButton({ submissionId }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogState({ visible: false, animated: true });

  const defaultValues: SubmissionRequestReviewInput = {
    submissionId,
    userId: "",
  };

  const toVariables = useToVariables<
    RequestReviewButtonMutation,
    SubmissionRequestReviewInput
  >((data) => ({ input: data }), []);

  const renderForm = useRenderForm<SubmissionRequestReviewInput>(
    ({ form: { register, control } }) => (
      <Forms.Grid>
        <input type="hidden" {...register("submissionId")} />
        <Styled.TypeaheadWrapper>
          <Suspense fallback={<FormFieldSkeleton />}>
            <UserTypeahead
              label="forms.fields.user"
              name="userId"
              control={control}
            />
          </Suspense>
        </Styled.TypeaheadWrapper>
      </Forms.Grid>
    ),
    [],
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dialog.show();
  };

  return (
    <>
      <DialogDisclosure
        as={ButtonControl}
        icon="plus"
        onClick={handleClick}
        aria-label={t("actions.submissions.request_review")}
        {...dialog}
      >
        {t("actions.submissions.request_review")}
      </DialogDisclosure>
      <Modal
        label={t("actions.submissions.request_review")}
        dialog={dialog}
        hideOnClickOutside={false}
      >
        <MutationForm<RequestReviewButtonMutation, SubmissionRequestReviewInput>
          name="submissionRequestReview"
          mutation={mutation}
          toVariables={toVariables}
          defaultValues={defaultValues}
          successNotification="messages.review_requested"
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
  submissionId: string;
}

const mutation = graphql`
  mutation RequestReviewButtonMutation($input: SubmissionRequestReviewInput!) {
    submissionRequestReview(input: $input) {
      submissionReview {
        id
      }
      ...MutationForm_mutationErrors
    }
  }
`;
