import { useRouter } from "next/router";
import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import useViewerContext from "contexts/useViewerContext";
import { LoadingPage } from "components/atomic/loading";
import SubmissionReviewList from "components/composed/submission/SubmissionReviewList";
import HtmlHead from "components/global/HtmlHead";
import { useBaseListQueryVars } from "hooks";
import { myReviewsQuery as Query } from "@/relay/myReviewsQuery.graphql";

export default function MyReviews() {
  const viewer = useViewerContext();
  const router = useRouter();
  const { page } = useBaseListQueryVars();

  const urlFilters = router.query.filters
    ? JSON.parse(String(router.query.filters))
    : {};

  const inState = urlFilters.inState ?? ["PENDING"];

  const filters = {
    ...(viewer?.id ? { userIds: [viewer.id] } : {}),
    inState,
  };

  return (
    <>
      <HtmlHead />
      <QueryTransitionWrapper<Query>
        query={query}
        variables={{
          page,
          order: "RECENT",
          filters,
        }}
        loadingFallback={<LoadingPage />}
      >
        {({ queryRef }) =>
          queryRef ? (
            <ListQuery queryRef={queryRef} />
          ) : (
            <SubmissionReviewList mode="reviewer" />
          )
        }
      </QueryTransitionWrapper>
    </>
  );
}

const ListQuery = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const { submissionReviews } = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionReviewList data={submissionReviews} mode="reviewer" />;
};

const query = graphql`
  query myReviewsQuery(
    $page: Int!
    $order: SubmissionReviewOrder!
    $filters: SubmissionReviewFilterInput
  ) {
    submissionReviews(
      page: $page
      perPage: 20
      order: $order
      filters: $filters
    ) {
      ...SubmissionReviewListFragment
    }
  }
`;
