// import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
// import type { historySubmissionQuery as Query } from "@/relay/historySubmissionQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionHistory() {
  // TODO: Uncomment when real submission API is available
  // const { item } = usePreloadedQuery<Query>(query, queryRef);

  return (
    <div className="t-copy-sm a-color-light l-container-wide">
      Submission history coming soon.
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLayout: GetLayout<any> = (props) => {
  return <Layout query={null} showLoadingCircle {...props} />;
};

SubmissionHistory.getLayout = getLayout;

export default SubmissionHistory;

// TODO: Uncomment when real submission API is available
// const query = graphql`
//   query historySubmissionQuery($slug: Slug!) {
//     item(slug: $slug) {
//       title
//       slug
//     }
//   }
// `;
