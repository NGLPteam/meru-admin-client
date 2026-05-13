import { Suspense } from "react";
import MutationForm, { Forms } from "components/api/MutationForm";
import UserTypeahead from "components/forms/UserTypeahead";
import { FormFieldSkeleton } from "components/atomic/loading";
import { graphql } from "react-relay";
import type {
  SubmissionTargetReviewerCreateInput,
  SubmissionTargetReviewerAddFormMutation as Mutation,
} from "@/relay/SubmissionTargetReviewerAddFormMutation.graphql";

export default function SubmissionTargetReviewerAddForm({
  submissionTargetId,
  closeDrawer,
}: Props) {
  return (
    <MutationForm<Mutation, SubmissionTargetReviewerCreateInput>
      name="submissionTargetReviewerCreate"
      mutation={mutation}
      defaultValues={{ submissionTargetId, userId: "" }}
      onSuccess={closeDrawer}
      onCancel={closeDrawer}
      successNotification="messages.add.reviewer_success"
      failureNotification="messages.add.reviewer_failure"
      refetchTags={["reviewers"]}
    >
      {({ form: { control } }) => (
        <Forms.Grid>
          <Suspense fallback={<FormFieldSkeleton />}>
            <UserTypeahead
              label="forms.fields.user"
              name="userId"
              control={control}
            />
          </Suspense>
        </Forms.Grid>
      )}
    </MutationForm>
  );
}

interface Props {
  submissionTargetId: string;
  closeDrawer?: () => void;
}

const mutation = graphql`
  mutation SubmissionTargetReviewerAddFormMutation(
    $input: SubmissionTargetReviewerCreateInput!
  ) {
    submissionTargetReviewerCreate(input: $input) {
      submissionTargetReviewer {
        id
        user {
          id
          name
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;
