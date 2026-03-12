import { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { graphql, useMutation } from "react-relay";
import { Grid, Select, Textarea } from "components/forms";
import { Button } from "components/atomic";
import * as Styled from "components/api/MutationForm/MutationForm.styles";
import { useNotify } from "hooks";
import type {
  SubmissionReviewFormMutation as Mutation,
  SubmissionReviewFormMutation$data as Mutation$data,
  SubmissionReviewState,
} from "@/relay/SubmissionReviewFormMutation.graphql";
import type { MutationAttributeError } from "types/graphql-schema";

type Fields = {
  decision: SubmissionReviewState;
  comment: string;
};

export default function SubmissionReviewForm({
  submissionId,
  onSuccess,
  onCancel,
}: {
  submissionId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const { t } = useTranslation();
  const notify = useNotify();
  const form = useForm<Fields>();
  const { register, handleSubmit } = form;

  const [commit, inFlight] = useMutation<Mutation>(mutation);

  const handleResponse = useCallback(
    (data: Mutation$data["submissionLeaveReview"] | null | undefined) => {
      if (!data) return;

      const { globalErrors, attributeErrors, submission } = data;

      if (submission) {
        notify.success(t("messages.review_submitted"));
        onSuccess?.();
      } else if (globalErrors?.length) {
        notify.mutationGlobalError(globalErrors);
      } else if (attributeErrors?.length) {
        notify.mutationAttributeError(
          attributeErrors as MutationAttributeError[],
        );
      }
    },
    [notify, t, onSuccess],
  );

  const onSubmit = (data: Fields) => {
    commit({
      variables: {
        input: {
          submissionId,
          toState: data.decision,
          comment: data.comment || undefined,
        },
      },
      onCompleted: (response) => handleResponse(response.submissionLeaveReview),
      onError: (err) => notify.error(err.message),
    });
  };

  const decisionOptions = [
    { label: t("forms.fields.decision_approve"), value: "APPROVED" },
    { label: t("forms.fields.decision_reject"), value: "REJECTED" },
  ];

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Select
            label="forms.fields.decision"
            options={decisionOptions}
            placeholder={t("forms.fields.select_placeholder")}
            required
            isWide
            {...register("decision", { required: true })}
          />
          <Textarea
            label="forms.fields.comments_for_depositor"
            isWide
            {...register("comment")}
          />
        </Grid>
        <Styled.Footer className="l-flex l-flex--gap">
          <Button type="submit" disabled={inFlight}>
            {t("common.submit")}
          </Button>
          {onCancel && (
            <Button type="button" onClick={onCancel} $secondary>
              {t("common.cancel")}
            </Button>
          )}
        </Styled.Footer>
      </form>
    </FormProvider>
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
