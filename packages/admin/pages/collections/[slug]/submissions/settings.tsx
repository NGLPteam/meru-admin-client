import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import CollectionSubmissionSettings from "components/composed/collection/CollectionSubmissionSettings";
import type { settingsSubmissionsSlugCollectionsPagesQuery as Query } from "@/relay/settingsSubmissionsSlugCollectionsPagesQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function CollectionSubmissionsSettings({ queryRef }: Props) {
  const { collection } = usePreloadedQuery<Query>(query, queryRef);

  return collection ? <CollectionSubmissionSettings data={collection} /> : null;
}

const getLayout: GetLayout<Props> = (props) => (
  <Layout
    query={query}
    showLoadingCircle
    refetchTags={["submissions"]}
    {...props}
  />
);

CollectionSubmissionsSettings.getLayout = getLayout;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query settingsSubmissionsSlugCollectionsPagesQuery($slug: Slug!) {
    collection(slug: $slug) {
      slug
      ...CollectionSubmissionSettingsFragment
    }
  }
`;

export default CollectionSubmissionsSettings;
