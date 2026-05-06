import { useCallback } from "react";
import { graphql } from "react-relay";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify } from "hooks";
import type { useBatchPublishSubmissionsMutation as BatchMutation } from "@/relay/useBatchPublishSubmissionsMutation.graphql";
import type { SubmissionBulkPublishListFragment$data } from "@/relay/SubmissionBulkPublishListFragment.graphql";
import useBatchPublishPolling from "./useBatchPublishPolling";
import type { MutationAttributeError } from "types/graphql-schema";

type Row = SubmissionBulkPublishListFragment$data["nodes"][number];

export default function useBatchPublishSubmissions() {
  const notify = useNotify();
  const { enqueue } = useBatchPublishPolling();
  const [commitBatchPublish] = useLoadingMutation<BatchMutation>(mutation);

  return useCallback(
    (records: Row[], selectedSlugs: string[]) => {
      // bulkSelection.ids holds slugs (ModelList's getRowId is row.slug || row.id)
      const slugToRow = new Map(records.map((r) => [r.slug, r]));
      const grouped = new Map<string, string[]>();
      for (const slug of selectedSlugs) {
        const row = slugToRow.get(slug);
        const targetId = row?.submissionTarget?.id;
        if (!row || !targetId) continue;
        const arr = grouped.get(targetId) ?? [];
        arr.push(row.id);
        grouped.set(targetId, arr);
      }
      for (const [submissionTargetId, submissionIds] of grouped) {
        commitBatchPublish({
          variables: { input: { submissionTargetId, submissionIds } },
          onCompleted: (response) => {
            const data = response.submissionBatchPublish;
            if (!data) return;
            const {
              globalErrors,
              attributeErrors,
              submissionBatchPublication,
              submissionTarget,
            } = data;
            if (submissionBatchPublication) {
              enqueue({
                publicationId: submissionBatchPublication.id,
                count: submissionBatchPublication.publicationsCount,
                target: submissionTarget?.entity?.title ?? "",
              });
            } else if (globalErrors?.length) {
              notify.mutationGlobalError(globalErrors);
            } else if (attributeErrors?.length) {
              notify.mutationAttributeError(
                attributeErrors as MutationAttributeError[],
              );
            }
          },
        });
      }
    },
    [commitBatchPublish, notify, enqueue],
  );
}

const mutation = graphql`
  mutation useBatchPublishSubmissionsMutation(
    $input: SubmissionBatchPublishInput!
  ) {
    submissionBatchPublish(input: $input) {
      submissionBatchPublication {
        id
        publicationsCount
      }
      submissionTarget {
        id
        entity {
          ... on Entity {
            title
          }
        }
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
