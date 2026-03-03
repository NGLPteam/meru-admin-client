import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import CollectionSubmissionSettings from "components/composed/collection/CollectionSubmissionSettings";
import type { submissionsManageSlugCollectionsPagesQuery as Query } from "@/relay/submissionsManageSlugCollectionsPagesQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function CollectionSubmissions({ queryRef }: Props) {
  const { collection } = usePreloadedQuery<Query>(query, queryRef);

  return collection ? <CollectionSubmissionSettings /> : null;
}

const getLayout: GetLayout<Props> = (props) => (
  <Layout query={query} showLoadingCircle {...props} />
);

CollectionSubmissions.getLayout = getLayout;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query submissionsManageSlugCollectionsPagesQuery($slug: Slug!) {
    collection(slug: $slug) {
      slug
    }
  }
`;

export default CollectionSubmissions;
