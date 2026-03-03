import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { useBaseListQueryVars } from "hooks";
import { LoadingPage } from "components/atomic/loading";
import PublishList from "components/composed/submission/PublishList";
import HtmlHead from "components/global/HtmlHead";
import { publishQuery as Query } from "@/relay/publishQuery.graphql";

export default function SubmissionsPublish() {
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
          queryRef ? <ListQuery queryRef={queryRef} /> : <PublishList />
        }
      </QueryTransitionWrapper>
    </>
  );
}

const ListQuery = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const {
    viewer: { items },
  } = usePreloadedQuery<Query>(query, queryRef);

  return <PublishList data={items} />;
};

const query = graphql`
  query publishQuery($page: Int!) {
    viewer {
      items(page: $page, perPage: 20) {
        ...PublishListFragment
      }
    }
  }
`;
