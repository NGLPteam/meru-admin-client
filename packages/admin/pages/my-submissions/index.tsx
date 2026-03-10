import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { useSubmissionFilterQueryVars } from "hooks";
import useViewerContext from "contexts/useViewerContext";
import { LoadingPage } from "components/atomic/loading";
import SubmissionList from "components/composed/submission/SubmissionList";
import HtmlHead from "components/global/HtmlHead";
import { mySubmissionsQuery as Query } from "@/relay/mySubmissionsQuery.graphql";

export default function MySubmissions() {
  const viewer = useViewerContext();
  const { page, order, filters } = useSubmissionFilterQueryVars({
    baseFilters: viewer?.id ? { userIds: [viewer.id] } : undefined,
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
            <SubmissionList mode="my-submissions" />
          )
        }
      </QueryTransitionWrapper>
    </>
  );
}

const ListQuery = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const { submissions } = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionList data={submissions} mode="my-submissions" />;
};

const query = graphql`
  query mySubmissionsQuery(
    $page: Int!
    $order: SubmissionOrder!
    $filters: SubmissionFilterInput
  ) {
    submissions(page: $page, perPage: 20, order: $order, filters: $filters) {
      ...SubmissionListFragment
    }
  }
`;
