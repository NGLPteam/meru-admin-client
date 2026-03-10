import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import { LazyLoadQueryWrapper } from "@wdp/lib/api/components";
import Drawer from "components/layout/Drawer";
import SubmissionReviewForm from "components/composed/submission/SubmissionReviewForm";
import type { SubmissionReviewDrawerQuery as Query } from "@/relay/SubmissionReviewDrawerQuery.graphql";
import type { DialogProps } from "reakit/Dialog";

export default function SubmissionReviewDrawer({
  dialog,
  params,
}: {
  dialog: DialogProps;
  params: Record<string, string>;
}) {
  const { t } = useTranslation();

  return (
    <LazyLoadQueryWrapper<Query>
      query={query}
      variables={{ slug: params.drawerSlug }}
    >
      {({ data }) => (
        <Drawer
          label={t("actions.submissions.review")}
          header={data?.submission?.entity?.title}
          dialog={dialog}
          hideOnClickOutside={false}
        >
          {data?.submission && (
            <SubmissionReviewForm
              submissionId={data.submission.id}
              onSuccess={dialog.hide}
              onCancel={dialog.hide}
            />
          )}
        </Drawer>
      )}
    </LazyLoadQueryWrapper>
  );
}

const query = graphql`
  query SubmissionReviewDrawerQuery($slug: Slug!) {
    submission(slug: $slug) {
      id
      entity {
        ... on Entity {
          id
          title
        }
      }
    }
  }
`;
