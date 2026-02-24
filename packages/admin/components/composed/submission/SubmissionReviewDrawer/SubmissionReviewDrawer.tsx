import { useTranslation } from "react-i18next";
import Drawer from "components/layout/Drawer";
import SubmissionReviewForm from "components/composed/submission/SubmissionReviewForm";
import { MOCK_SUBMISSIONS } from "components/composed/submission/SubmissionList/mockData";
import type { DialogProps } from "reakit/Dialog";

export default function SubmissionReviewDrawer({
  dialog,
  params,
}: {
  dialog: DialogProps;
  params: Record<string, string>;
}) {
  const { t } = useTranslation();

  // TODO: replace mock lookup with API data
  const title = MOCK_SUBMISSIONS.find(
    (s) => s.slug === params.drawerSlug,
  )?.title;

  return (
    <Drawer
      label={t("actions.review_submission")}
      header={title}
      dialog={dialog}
      hideOnClickOutside={false}
    >
      <SubmissionReviewForm onSuccess={dialog.hide} onCancel={dialog.hide} />
    </Drawer>
  );
}
