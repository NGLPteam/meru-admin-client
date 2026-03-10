import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionHistory() {
  return (
    <div className="t-copy-sm a-color-light l-container-wide">
      Submission history coming soon.
    </div>
  );
}

const getLayout: GetLayout = (props) => {
  return <Layout {...props} />;
};

SubmissionHistory.getLayout = getLayout;

export default SubmissionHistory;
