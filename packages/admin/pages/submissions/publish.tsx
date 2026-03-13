import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { useSubmissionFilterQueryVars } from "hooks";
import { LoadingPage } from "components/atomic/loading";
import SubmissionBulkPublishList from "components/composed/submission/SubmissionBulkPublishList";
import HtmlHead from "components/global/HtmlHead";
import { publishQuery as Query } from "@/relay/publishQuery.graphql";

export default function SubmissionsPublish() {
  const { page, order, filters } = useSubmissionFilterQueryVars({
    baseFilters: { inState: ["APPROVED"] },
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
            <SubmissionBulkPublishList />
          )
        }
      </QueryTransitionWrapper>
    </>
  );
}

const ListQuery = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const { submissions } = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionBulkPublishList data={submissions} />;
};

const query = graphql`
  query publishQuery(
    $page: Int!
    $order: SubmissionOrder!
    $filters: SubmissionFilterInput
  ) {
    submissions(page: $page, perPage: 20, order: $order, filters: $filters) {
      ...SubmissionBulkPublishListFragment
    }
  }
`;
