import { graphql } from "react-relay";
import { useAuthenticatedQuery } from "@wdp/lib/api/hooks";
import { useGlobalContext, useViewerContext } from "contexts";
import type { usePendingReviewCountQuery as Query } from "@/relay/usePendingReviewCountQuery.graphql";
import useIsAuthorized from "./useIsAuthorized";

export default function usePendingReviewCount(): number {
  const { id } = useViewerContext();
  const canReview = useIsAuthorized({ actions: "submissions.review" });
  const globalData = useGlobalContext();
  const depositingEnabled =
    globalData?.globalConfiguration?.depositing?.enabled ?? false;

  const skip = !id || !canReview || !depositingEnabled;

  const data = useAuthenticatedQuery<Query>(
    query,
    { userIds: id ? [id] : [] },
    { skip, fetchPolicy: "store-and-network" },
  );

  return data?.submissionReviews?.pageInfo?.totalCount ?? 0;
}

const query = graphql`
  query usePendingReviewCountQuery($userIds: [ID!]!) {
    submissionReviews(
      filters: { inState: [PENDING], userIds: $userIds }
      perPage: 1
    ) {
      pageInfo {
        totalCount
      }
    }
  }
`;
