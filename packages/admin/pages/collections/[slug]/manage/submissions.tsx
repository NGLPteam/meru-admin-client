import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import CollectionSubmissionSettings from "components/composed/collection/CollectionSubmissionSettings";
import type { submissionsManageSlugCollectionsPagesQuery as Query } from "@/relay/submissionsManageSlugCollectionsPagesQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function CollectionSubmissions({ queryRef }: Props) {
  const { collection, schemaVersionOptions } = usePreloadedQuery<Query>(
    query,
    queryRef,
  );

  return collection ? (
    <CollectionSubmissionSettings
      data={collection}
      schemaVersionOptions={schemaVersionOptions}
    />
  ) : null;
}

const getLayout: GetLayout<Props> = (props) => (
  <Layout
    query={query}
    showLoadingCircle
    refetchTags={["submissions"]}
    {...props}
  />
);

CollectionSubmissions.getLayout = getLayout;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query submissionsManageSlugCollectionsPagesQuery($slug: Slug!) {
    collection(slug: $slug) {
      slug
      ...CollectionSubmissionSettingsFragment
    }
    schemaVersionOptions(kind: ITEM) {
      label
      value
      schemaVersion {
        id
      }
    }
  }
`;

export default CollectionSubmissions;
