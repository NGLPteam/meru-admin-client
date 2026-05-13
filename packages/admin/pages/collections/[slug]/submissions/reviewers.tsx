import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import { useTranslation, Trans } from "react-i18next";
import SubmissionTargetReviewersList from "components/composed/submissionTarget/SubmissionTargetReviewersList";
import { MessageBanner } from "components/atomic/MessageBanner";
import Link from "next/link";
import { useRouteSlug } from "hooks";
import type { reviewersSubmissionsSlugCollectionsPagesQuery as Query } from "@/relay/reviewersSubmissionsSlugCollectionsPagesQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function CollectionReviewers({ queryRef }: Props) {
  const { collection } = usePreloadedQuery<Query>(query, queryRef);
  const { t } = useTranslation();
  const slug = useRouteSlug();

  if (!collection) return null;

  return collection.submissionTarget ? (
    <SubmissionTargetReviewersList data={collection.submissionTarget} />
  ) : (
    <MessageBanner
      name={t("messages.submission_target_required_name")}
      message={
        <Trans
          i18nKey="messages.submission_target_reviewers_required"
          components={[
            <Link
              key="lint-key"
              href={`/collections/${slug}/submissions/settings`}
              className="a-link"
            />,
          ]}
        />
      }
      variant="info"
      icon="statusWarning"
    />
  );
}

const getLayout: GetLayout<Props> = (props) => (
  <Layout
    query={query}
    refetchTags={["reviewers"]}
    modelName="role"
    {...props}
  />
);

CollectionReviewers.getLayout = getLayout;

type Props = {
  queryRef: PreloadedQuery<Query>;
};

const query = graphql`
  query reviewersSubmissionsSlugCollectionsPagesQuery(
    $slug: Slug!
    $page: Int!
  ) {
    collection(slug: $slug) {
      submissionTarget {
        ...SubmissionTargetReviewersListFragment
      }
    }
  }
`;

export default CollectionReviewers;
