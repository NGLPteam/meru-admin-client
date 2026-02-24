import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { LoadingPage } from "components/atomic/loading";
import { PageHeader, BackToAll } from "components/layout";
import HtmlHead from "components/global/HtmlHead";
import SubmissionCreateForm from "components/composed/submission/SubmissionCreateForm";
import type { newSubmissionQuery as Query } from "@/relay/newSubmissionQuery.graphql";

export default function NewSubmission() {
  const { t } = useTranslation();

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
          queryRef ? <FormWithData queryRef={queryRef} /> : null
        }
      </QueryTransitionWrapper>
    </>
  );
}

const FormWithData = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const data = usePreloadedQuery<Query>(query, queryRef);

  return <SubmissionCreateForm data={data} />;
};

const query = graphql`
  query newSubmissionQuery($schemaKind: SchemaKind!) {
    ...SchemaSelectFragment
  }
`;
