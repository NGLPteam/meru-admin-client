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
  schemaVersionId: string;
};
