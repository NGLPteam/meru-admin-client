import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { useSubmissionFilterQueryVars } from "hooks";
import { LoadingPage } from "components/atomic/loading";
import SubmissionList from "components/composed/submission/SubmissionList";
import HtmlHead from "components/global/HtmlHead";
import { reviewQuery as Query } from "@/relay/reviewQuery.graphql";

export default function SubmissionsReview() {
  const { page, order, filters } = useSubmissionFilterQueryVars({
    baseFilters: {
      inState: [
        "SUBMITTED",
        "UNDER_REVIEW",
        "REVISION_REQUESTED",
        "APPROVED",
        "REJECTED",
        "PUBLISHED",
      ],
    },
  });

  return (
    <>
      <HtmlHead />
      <QueryTransitionWrapper<Query>
        query={query}
        variables={{ page, order, filters }}
        loadingFallback={<LoadingPage />}
      >
        {({ queryRef }) =>
          queryRef ? (
            <ListQuery queryRef={queryRef} />
          ) : (
            <SubmissionList mode="review" />
          )
        }
      </QueryTransitionWrapper>
    </>
  );
}

const ListQuery = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const { submissions } = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionList data={submissions} mode="review" />;
};

const query = graphql`
  query reviewQuery(
    $page: Int!
    $order: SubmissionOrder!
    $filters: SubmissionFilterInput
  ) {
    submissions(page: $page, perPage: 20, order: $order, filters: $filters) {
      ...SubmissionListFragment
    }
  }
`;
