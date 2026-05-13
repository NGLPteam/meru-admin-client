import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import SubmissionTransitionList from "components/composed/submission/SubmissionTransitionList";
import type { historySubmissionQuery as Query } from "@/relay/historySubmissionQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionHistory({ queryRef }: Props) {
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

SubmissionHistory.getLayout = getLayout;

export default SubmissionHistory;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query historySubmissionQuery($slug: Slug!) {
    submission(slug: $slug) {
      ...SubmissionTransitionListFragment
    }
  }
`;
