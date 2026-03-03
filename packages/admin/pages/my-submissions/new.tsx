import {
  usePreloadedQuery,
  useLazyLoadQuery,
  graphql,
  PreloadedQuery,
} from "react-relay";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import routeQueryArrayToString from "@wdp/lib/routes/helpers/routeQueryArrayToString";
import { LoadingPage } from "components/atomic/loading";
import { PageHeader, BackToAll } from "components/layout";
import HtmlHead from "components/global/HtmlHead";
import SubmissionCreateForm from "components/composed/submission/SubmissionCreateForm";
import type { newSubmissionQuery as Query } from "@/relay/newSubmissionQuery.graphql";
import type { newSubmissionCollectionQuery as CollectionQuery } from "@/relay/newSubmissionCollectionQuery.graphql";

export default function NewSubmission() {
  const { t } = useTranslation();
  const router = useRouter();
  const collectionSlug = routeQueryArrayToString(router.query.collection);

  return (
    <>
      <HtmlHead />
      <BackToAll route="my-submissions" />
      <PageHeader title={t("nav.new_submission")} />
      <QueryTransitionWrapper<Query>
        query={query}
        variables={{ schemaKind: "ITEM" }}
        loadingFallback={<LoadingPage />}
      >
        {({ queryRef }) =>
          queryRef ? (
            collectionSlug ? (
              <FormWithCollection
                queryRef={queryRef}
                collectionSlug={collectionSlug}
              />
            ) : (
              <FormWithData queryRef={queryRef} />
            )
          ) : null
        }
      </QueryTransitionWrapper>
    </>
  );
}

const FormWithData = ({
  queryRef,
  initialCollection,
}: {
  queryRef: PreloadedQuery<Query>;
  initialCollection?: { id: string; title: string };
}) => {
  const data = usePreloadedQuery<Query>(query, queryRef);

  return (
    <SubmissionCreateForm data={data} initialCollection={initialCollection} />
  );
};

const FormWithCollection = ({
  queryRef,
  collectionSlug,
}: {
  queryRef: PreloadedQuery<Query>;
  collectionSlug: string;
}) => {
  const { collection } = useLazyLoadQuery<CollectionQuery>(
    collectionQuery,
    { slug: collectionSlug },
    { fetchPolicy: "store-or-network" },
  );

  const initialCollection = collection
    ? { id: collection.id, title: collection.title }
    : undefined;

  return (
    <FormWithData queryRef={queryRef} initialCollection={initialCollection} />
  );
};

const query = graphql`
  query newSubmissionQuery($schemaKind: SchemaKind!) {
    ...SchemaSelectFragment
  }
`;

const collectionQuery = graphql`
  query newSubmissionCollectionQuery($slug: Slug!) {
    collection(slug: $slug) {
      id
      title
    }
  }
`;
