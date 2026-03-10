import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import SubmissionDetailsView from "components/composed/submission/SubmissionDetails";
import type { detailsSubmissionQuery as Query } from "@/relay/detailsSubmissionQuery.graphql";
import Layout from "../_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionDetails({ queryRef }: Props) {
  const { submission } = usePreloadedQuery<Query>(query, queryRef);

  return submission ? <SubmissionDetailsView data={submission} /> : null;
}

const getLayout: GetLayout = (props) => {
  return <Layout query={query} showLoadingCircle {...props} />;
};

SubmissionDetails.getLayout = getLayout;

export default SubmissionDetails;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query detailsSubmissionQuery($slug: Slug!) {
    submission(slug: $slug) {
      ...SubmissionDetailsFragment
    }
  }
`;
