import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { LoadingPage } from "components/atomic/loading";
import SubmissionEditForm from "components/composed/submission/SubmissionEditForm";
import type { editSubmissionQuery as Query } from "@/relay/editSubmissionQuery.graphql";
import Layout from "../_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function EditSubmission() {
  return (
    <QueryTransitionWrapper<Query>
      query={query}
      variables={{ schemaKind: "ITEM" }}
      loadingFallback={<LoadingPage />}
    >
      {({ queryRef }) =>
        queryRef ? <FormWithData queryRef={queryRef} /> : null
      }
    </QueryTransitionWrapper>
  );
}

const FormWithData = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const data = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionEditForm data={data} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLayout: GetLayout<any> = (props) => {
  return <Layout query={null} showLoadingCircle {...props} />;
};

EditSubmission.getLayout = getLayout;

export default EditSubmission;

const query = graphql`
  query editSubmissionQuery($schemaKind: SchemaKind!) {
    ...SchemaSelectFragment
  }
`;
