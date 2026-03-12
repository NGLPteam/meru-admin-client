import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import SubmissionReviewList from "components/composed/submission/SubmissionReviewList";
import type { reviewsSubmissionReviewsQuery as Query } from "@/relay/reviewsSubmissionReviewsQuery.graphql";
import type { LayoutManageSubmissionQuery$data } from "@/relay/LayoutManageSubmissionQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionReviews({ queryRef, submission }: Props) {
  const { submissionReviews } = usePreloadedQuery<Query>(query, queryRef);

  return (
    <SubmissionReviewList
      data={submissionReviews}
      submission={submission}
      mode="submission"
    />
  );
}

const getLayout: GetLayout = (props) => {
  return (
    <Layout
      query={query}
      refetchTags={["submissions"]}
      useIdVar
      showLoadingCircle
      {...props}
    />
  );
};

SubmissionReviews.getLayout = getLayout;

export default SubmissionReviews;

type Props = {
  queryRef: PreloadedQuery<Query>;
  submission?: LayoutManageSubmissionQuery$data["submission"];
};

const query = graphql`
  query reviewsSubmissionReviewsQuery($submissionIds: [ID!]) {
    submissionReviews(filters: { submissionIds: $submissionIds }) {
      ...SubmissionReviewListFragment
    }
  }
`;
