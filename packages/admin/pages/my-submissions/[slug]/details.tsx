import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import SubmissionDetailsView from "components/composed/submission/SubmissionDetails";
import SubmissionUpdateForm from "components/composed/submission/SubmissionUpdateForm";
import { MessageBanner } from "components/atomic";
import type { detailsMySubmissionQuery as Query } from "@/relay/detailsMySubmissionQuery.graphql";
import type { LayoutSubmissionQuery$data } from "@/relay/LayoutSubmissionQuery.graphql";
import Layout from "./_layout";
import type { GetLayout } from "@wdp/lib/types/page";

function SubmissionDetails({ queryRef, submission }: Props) {
  const { t } = useTranslation();
  const data = usePreloadedQuery<Query>(query, queryRef);

  const isEditable = !!submission?.currentStatus?.mutableState;
  const state = submission?.state?.toLowerCase();

  const entity =
    data.submission?.entity?.__typename === "Item"
      ? data.submission.entity
      : null;

  return (
    <>
      {state && (
        <MessageBanner
          name={t(`messages.submission.${state}`)}
          variant={state === "revision_requested" ? "warning" : "info"}
        />
      )}
      {isEditable && entity ? (
        <SubmissionUpdateForm data={entity} mode="depositor" />
      ) : data.submission ? (
        <SubmissionDetailsView data={data.submission} />
      ) : null}
    </>
  );
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
  submission?: LayoutSubmissionQuery$data["submission"];
};

const query = graphql`
  query detailsMySubmissionQuery($slug: Slug!) {
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
