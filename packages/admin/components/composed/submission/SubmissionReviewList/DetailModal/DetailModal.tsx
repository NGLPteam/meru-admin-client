import { useTranslation } from "react-i18next";
import { formatDate } from "@wdp/lib/helpers";
import Modal from "components/layout/Modal";
import DataList from "components/atomic/DataList";
import UserNameColumnCell from "components/composed/model/ModelColumns/UserNameColumnCell";
import { StatusBadge } from "components/composed/submission/SubmissionList/StatusBadge";
import type { SubmissionReviewListFragment$data } from "@/relay/SubmissionReviewListFragment.graphql";
import type { DialogProps } from "reakit/Dialog";

type ReviewNode = SubmissionReviewListFragment$data["nodes"][number];

type Props = {
  dialog: DialogProps;
  review?: ReviewNode | null;
  mode?: "submission" | "reviewer";
};

function SubmissionReviewDetailModal({
  dialog,
  review,
  mode = "submission",
}: Props) {
  const { t } = useTranslation();

  return (
    <Modal dialog={dialog} label={t("lists.review_detail")}>
      {review ? (
        <DataList>
          <DataList.Item
            label={t("glossary.submission")}
            value={review.submission?.entity?.title}
          />
          {mode === "reviewer" ? (
            <DataList.Item
              label={t("lists.submitted_by_column")}
              value={<UserNameColumnCell data={review.submission?.user} />}
            />
          ) : (
            <DataList.Item
              label={t("glossary.reviewer")}
              value={review.user?.name}
            />
          )}
          <DataList.Item
            label={t("forms.fields.decision")}
            value={<StatusBadge status={review.state} />}
          />
          <DataList.Item
            label={t("lists.updated_at_column")}
            value={review.updatedAt ? formatDate(review.updatedAt) : undefined}
          />
          <DataList.Item
            label={t("glossary.comment")}
            value={review.comment}
            wide
          />
        </DataList>
      ) : null}
    </Modal>
  );
}

export default SubmissionReviewDetailModal;
