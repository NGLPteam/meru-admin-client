import SubmissionDetailsView from "components/composed/submission/SubmissionDetails";
import Layout from "../_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionDetails() {
  return <SubmissionDetailsView />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLayout: GetLayout<any> = (props) => {
  return <Layout query={null} showLoadingCircle {...props} />;
};

SubmissionDetails.getLayout = getLayout;

export default SubmissionDetails;
