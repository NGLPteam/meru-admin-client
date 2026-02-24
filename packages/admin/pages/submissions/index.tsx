import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { useBaseListQueryVars } from "hooks";
import { LoadingPage } from "components/atomic/loading";
import SubmissionList from "components/composed/submission/SubmissionList";
import HtmlHead from "components/global/HtmlHead";
import { submissionsQuery as Query } from "@/relay/submissionsQuery.graphql";

export default function Submissions() {
  const { page } = useBaseListQueryVars();

  return (
    <>
      <HtmlHead />
      <QueryTransitionWrapper<Query>
        query={query}
        variables={{ page }}
        loadingFallback={<LoadingPage />}
      >
        {({ queryRef }) =>
          queryRef ? <ListQuery queryRef={queryRef} /> : <SubmissionList />
        }
      </QueryTransitionWrapper>
    </>
  );
}

const ListQuery = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const {
    viewer: { items },
  } = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionList data={items} />;
};

const query = graphql`
  query submissionsQuery($page: Int!) {
    viewer {
      items(page: $page, perPage: 20) {
        ...SubmissionListFragment
      }
    }
  }
`;
