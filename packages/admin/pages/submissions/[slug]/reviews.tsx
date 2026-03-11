import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import SubmissionReviewList from "components/composed/submission/SubmissionReviewList";
import type { reviewsSubmissionReviewsQuery as Query } from "@/relay/reviewsSubmissionReviewsQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionReviews({ queryRef }: Props) {
  const { submissionReviews } = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionReviewList data={submissionReviews} />;
}

const getLayout: GetLayout = (props) => {
  return <Layout query={query} useIdVar showLoadingCircle {...props} />;
};

SubmissionReviews.getLayout = getLayout;

export default SubmissionReviews;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query reviewsSubmissionReviewsQuery($submissionIds: [ID!]) {
    submissionReviews(filters: { submissionIds: $submissionIds }) {
      ...SubmissionReviewListFragment
    }
  }
`;
