import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import SubmissionReviewList from "components/composed/submission/SubmissionReviewList";
import type { reviewsMySubmissionReviewsQuery as Query } from "@/relay/reviewsMySubmissionReviewsQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function MySubmissionReviews({ queryRef }: Props) {
  const { submissionReviews } = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionReviewList data={submissionReviews} />;
}

const getLayout: GetLayout = (props) => {
  return <Layout query={query} useIdVar showLoadingCircle {...props} />;
};

MySubmissionReviews.getLayout = getLayout;

export default MySubmissionReviews;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query reviewsMySubmissionReviewsQuery($submissionIds: [ID!]) {
    submissionReviews(filters: { submissionIds: $submissionIds }) {
      ...SubmissionReviewListFragment
    }
  }
`;
