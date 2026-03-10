import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import ItemUpdateForm from "components/composed/item/ItemUpdateForm";
import type { editMySubmissionQuery as Query } from "@/relay/editMySubmissionQuery.graphql";
import Layout from "../_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function EditSubmission({ queryRef }: Props) {
  const { submission } = usePreloadedQuery<Query>(query, queryRef);

  const entity =
    submission?.entity?.__typename === "Item" ? submission.entity : null;

  return entity ? <ItemUpdateForm data={entity} mode="depositor" /> : null;
}

const getLayout: GetLayout = (props) => {
  return (
    <Layout
      query={query}
      refetchTags={["schema", "parent"]}
      showLoadingCircle
      {...props}
    />
  );
};

EditSubmission.getLayout = getLayout;

export default EditSubmission;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query editMySubmissionQuery($slug: Slug!) {
    submission(slug: $slug) {
      entity {
        __typename
        ... on Item {
          ...ItemUpdateFormFragment
        }
      }
    }
  }
`;
