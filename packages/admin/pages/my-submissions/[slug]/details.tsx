// import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
// import type { detailsSubmissionQuery as Query } from "@/relay/detailsSubmissionQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionDetails() {
  // TODO: Uncomment when real submission API is available
  // const { item } = usePreloadedQuery<Query>(query, queryRef);

  return (
    <div className="t-copy-sm a-color-light l-container-wide">
      Submission details coming soon.
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLayout: GetLayout<any> = (props) => {
  return <Layout query={null} showLoadingCircle {...props} />;
};

SubmissionDetails.getLayout = getLayout;

export default SubmissionDetails;

// TODO: Uncomment when real submission API is available
// const query = graphql`
//   query detailsSubmissionQuery($slug: Slug!) {
//     item(slug: $slug) {
//       title
//       slug
//     }
//   }
// `;
