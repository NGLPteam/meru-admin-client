import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import SubmissionTransitionList from "components/composed/submission/SubmissionTransitionList";
import type { historyMySubmissionQuery as Query } from "@/relay/historyMySubmissionQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function MySubmissionHistory({ queryRef }: Props) {
  const { submission } = usePreloadedQuery<Query>(query, queryRef);

  return submission ? <SubmissionTransitionList data={submission} /> : null;
}

const getLayout: GetLayout = (props) => {
  return (
    <Layout
      query={query}
      refetchTags={["submissions"]}
      showLoadingCircle
      {...props}
    />
  );
};

MySubmissionHistory.getLayout = getLayout;

export default MySubmissionHistory;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query historyMySubmissionQuery($slug: Slug!) {
    submission(slug: $slug) {
      ...SubmissionTransitionListFragment
    }
  }
`;
