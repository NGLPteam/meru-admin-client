import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { useBaseListQueryVars } from "hooks";
import { LoadingPage } from "components/atomic/loading";
import SubmissionList from "components/composed/submission/SubmissionList";
import HtmlHead from "components/global/HtmlHead";
import { mySubmissionsQuery as Query } from "@/relay/mySubmissionsQuery.graphql";

export default function MySubmissions() {
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
  const {
    viewer: { items },
  } = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionList data={items} mode="my-submissions" />;
};

const query = graphql`
  query mySubmissionsQuery($page: Int!) {
    viewer {
      items(page: $page, perPage: 20) {
        ...SubmissionListFragment
      }
    }
  }
`;
