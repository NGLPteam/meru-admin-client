import { useCallback, useEffect, useState } from "react";
import { graphql, useRelayEnvironment, fetchQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import { useNotify, usePageContext } from "hooks";
import type { useBatchPublishPollingQuery as PollQuery } from "@/relay/useBatchPublishPollingQuery.graphql";

interface PendingBatch {
  publicationId: string;
  count: number;
  target: string;
}

export default function useBatchPublishPolling() {
  const env = useRelayEnvironment();
  const notify = useNotify();
  const { t } = useTranslation();
  const { setTriggeredRefetchTags } = usePageContext();
  const [pending, setPending] = useState<PendingBatch[]>([]);

  const enqueue = useCallback(
    (batch: PendingBatch) => {
      setPending((prev) => [...prev, batch]);
      notify.success(
        t("actions.submissions.publish_batch_queued", {
          count: batch.count,
          target: batch.target,
        }),
      );
    },
    [notify, t],
  );

  useEffect(() => {
    if (pending.length === 0) return;

    let cancelled = false;
    const interval = setInterval(async () => {
      const finishedIds = new Set<string>();
      for (const batch of pending) {
        const result = await fetchQuery<PollQuery>(
          env,
          query,
          { id: batch.publicationId },
          { networkCacheConfig: { force: true } },
        ).toPromise();
        if (cancelled) return;
        const node = result?.node;
        if (
          node &&
          "state" in node &&
          (node as { state: string }).state === "FINISHED"
        ) {
          finishedIds.add(batch.publicationId);
          notify.success(
            t("actions.submissions.publish_batch_success", {
              count: batch.count,
              target: batch.target,
            }),
          );
        }
      }
      if (cancelled) return;
      if (finishedIds.size > 0) {
        setPending((prev) =>
          prev.filter((b) => !finishedIds.has(b.publicationId)),
        );
        setTriggeredRefetchTags(["submissions"]);
      }
    }, 1500);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [pending, env, notify, t, setTriggeredRefetchTags]);

  return { enqueue };
}

const query = graphql`
  query useBatchPublishPollingQuery($id: ID!) {
    node(id: $id) {
      ... on SubmissionBatchPublication {
        id
        state
      }
    }
  }
`;
