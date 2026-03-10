import type { CanSubmitCheckFragment$data } from "@/relay/CanSubmitCheckFragment.graphql";
import type { newSubmissionCollectionQuery$data } from "@/relay/newSubmissionCollectionQuery.graphql";

export type SubmissionTargetNode =
  CanSubmitCheckFragment$data["submissionTargets"]["nodes"][number];

export type PreselectedTarget = NonNullable<
  NonNullable<
    newSubmissionCollectionQuery$data["collection"]
  >["submissionTarget"]
>;

export type Fields = {
  title: string;
  /** The selected submission target's ID (used as-is for DIRECT, overridden for DESCENDANT) */
  submissionTargetId: string;
  /** For DESCENDANT mode, the selected deposit target's ID */
  depositTargetId: string;
  schemaVersionId: string;
};
