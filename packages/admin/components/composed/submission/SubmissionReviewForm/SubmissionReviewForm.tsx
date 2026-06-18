import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import MutationForm, { Forms } from "components/api/MutationForm";
import BaseMarkdown from "components/atomic/Markdown/BaseMarkdown";
import type {
  SubmissionReviewFormMutation as Mutation,
  SubmissionLeaveReviewInput,
  SubmissionReviewState,
} from "@/relay/SubmissionReviewFormMutation.graphql";
import * as Styled from "./SubmissionReviewForm.styles";

type Fields = {
  decision: SubmissionReviewState;
  comment: string;
};

export default function SubmissionReviewForm({
  submissionId,
  onSuccess,
  onCancel,
  instructions,
}: {
  submissionId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  instructions?: string;
}) {
  const { t } = useTranslation();

  const decisionOptions = [
    { label: t("forms.fields.decision_approve"), value: "APPROVED" },
    { label: t("forms.fields.decision_revise"), value: "REVISION_REQUESTED" },
    { label: t("forms.fields.decision_reject"), value: "REJECTED" },
  ];

  const toVariables = (data: Fields): Mutation["variables"] => ({
    input: {
      submissionId,
      toState: data.decision,
      comment: data.comment || undefined,
    } satisfies SubmissionLeaveReviewInput,
  });

  return (
    <MutationForm<Mutation, Fields>
      name="submissionLeaveReview"
      mutation={mutation}
      toVariables={toVariables}
      onSuccess={() => onSuccess?.()}
      onCancel={onCancel}
      successNotification="messages.review_submitted"
      refetchTags={["submissions"]}
      saveLabel="common.submit"
    >
      {({ form: { register } }) => (
        <Forms.Grid>
          {!!instructions && (
            <Styled.Box>
              <BaseMarkdown>{instructions}</BaseMarkdown>
            </Styled.Box>
          )}
          <Forms.Select
            label="forms.fields.decision"
            options={decisionOptions}
            placeholder={t("forms.fields.select_placeholder")}
            required
            isWide
            {...register("decision", { required: true })}
          />
          <Forms.Textarea
            label="forms.fields.comments_for_depositor"
            description="forms.fields.comments_for_depositor_description"
            isWide
            {...register("comment")}
          />
        </Forms.Grid>
      )}
    </MutationForm>
  );
}

const mutation = graphql`
  mutation SubmissionReviewFormMutation($input: SubmissionLeaveReviewInput!) {
    submissionLeaveReview(input: $input) {
      submission {
        id
        state
      }
      submissionReview {
        id
        state
        comment
      }
      ...MutationForm_mutationErrors
    }
  }
`;
