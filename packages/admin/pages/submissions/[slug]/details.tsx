import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import SubmissionDetailsView from "components/composed/submission/SubmissionDetails";
import SubmissionUpdateForm from "components/composed/submission/SubmissionUpdateForm";
import type { detailsSubmissionQuery as Query } from "@/relay/detailsSubmissionQuery.graphql";
import type { LayoutManageSubmissionQuery$data } from "@/relay/LayoutManageSubmissionQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionDetails({ queryRef, submission }: Props) {
  const data = usePreloadedQuery<Query>(query, queryRef);

  const isEditable = !!submission?.currentStatus?.mutableState;

  if (isEditable) {
    const entity =
      data.submission?.entity?.__typename === "Item"
        ? data.submission.entity
        : null;

    return entity ? <SubmissionUpdateForm data={entity} /> : null;
  }

  return data.submission ? (
    <SubmissionDetailsView data={data.submission} />
  ) : null;
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

SubmissionDetails.getLayout = getLayout;

export default SubmissionDetails;

type Props = {
  queryRef: PreloadedQuery<Query>;
  submission?: LayoutManageSubmissionQuery$data["submission"];
};

const query = graphql`
  query detailsSubmissionQuery($slug: Slug!) {
    submission(slug: $slug) {
      ...SubmissionDetailsFragment
      entity {
        __typename
        ... on Item {
          ...SubmissionUpdateFormFragment
        }
      }
    }
  }
`;
