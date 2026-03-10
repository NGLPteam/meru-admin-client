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
import SubmissionCreateForm from "components/composed/submission/SubmissionCreateForm/CanSubmitCheck";
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
        variables={{}}
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

const FormWithData = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const data = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionCreateForm data={data} />;
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
    { fetchPolicy: "store-and-network" },
  );

  const preselectedTarget = collection?.submissionTarget ?? undefined;

  const data = usePreloadedQuery<Query>(query, queryRef);

  return (
    <SubmissionCreateForm
      data={data}
      preselectedTarget={preselectedTarget}
      preselectedCollectionId={collection?.id}
    />
  );
};

const query = graphql`
  query newSubmissionQuery {
    ...CanSubmitCheckFragment
  }
`;

const collectionQuery = graphql`
  query newSubmissionCollectionQuery($slug: Slug!) {
    collection(slug: $slug) {
      id
      title
      submissionTarget {
        id
        depositMode
        canDeposit {
          value
        }
        canRequestDepositAccess {
          value
        }
        depositTargets {
          id
          entity {
            ... on Collection {
              title
              submissionTarget {
                id
              }
            }
          }
        }
        schemaVersions {
          id
          name
          identifier
        }
      }
    }
  }
`;
