import { useCallback } from "react";
import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify, usePageContext } from "hooks";
import type { usePublishSubmissionMutation as PublishMutation } from "@/relay/usePublishSubmissionMutation.graphql";
import type { MutationAttributeError } from "types/graphql-schema";

export default function usePublishSubmission() {
  const { t } = useTranslation();
  const notify = useNotify();
  const { setTriggeredRefetchTags } = usePageContext();

  const [commitPublish] = useLoadingMutation<PublishMutation>(mutation);

  return useCallback(
    ({ id, title }: { id: string; title: string }) => {
      commitPublish({
        variables: { input: { submissionId: id } },
        onCompleted: (response) => {
          const data = response.submissionPublish;
          if (!data) return;
          const { globalErrors, attributeErrors, submission } = data;
          if (submission) {
            notify.success(t("actions.submissions.publish_success", { title }));
            setTriggeredRefetchTags(["submissions"]);
          } else if (globalErrors?.length) {
            notify.mutationGlobalError(globalErrors);
          } else if (attributeErrors?.length) {
            notify.mutationAttributeError(
              attributeErrors as MutationAttributeError[],
            );
          }
        },
      });
    },
    [commitPublish, notify, t, setTriggeredRefetchTags],
  );
}

const mutation = graphql`
  mutation usePublishSubmissionMutation($input: SubmissionPublishInput!) {
    submissionPublish(input: $input) {
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
