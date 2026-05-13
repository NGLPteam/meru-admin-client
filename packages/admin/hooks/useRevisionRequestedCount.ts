import { graphql } from "react-relay";
import { useAuthenticatedQuery } from "@wdp/lib/api/hooks";
import { useGlobalContext, useViewerContext } from "contexts";
import type { useRevisionRequestedCountQuery as Query } from "@/relay/useRevisionRequestedCountQuery.graphql";

export default function useRevisionRequestedCount(): number {
  const { id } = useViewerContext();
  const globalData = useGlobalContext();
  const depositingEnabled =
    globalData?.globalConfiguration?.depositing?.enabled ?? false;

  const skip = !id || !depositingEnabled;

  const data = useAuthenticatedQuery<Query>(
    query,
    { userIds: id ? [id] : [] },
    { skip, fetchPolicy: "store-and-network" },
  );

  return data?.submissions?.pageInfo?.totalCount ?? 0;
}

const query = graphql`
  query useRevisionRequestedCountQuery($userIds: [ID!]!) {
    submissions(
      filters: { inState: [REVISION_REQUESTED], userIds: $userIds }
      perPage: 1
    ) {
      pageInfo {
        totalCount
      }
    }
  }
`;
