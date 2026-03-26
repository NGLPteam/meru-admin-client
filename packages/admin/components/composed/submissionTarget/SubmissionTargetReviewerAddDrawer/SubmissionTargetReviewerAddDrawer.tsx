import { useTranslation } from "react-i18next";
import Drawer from "components/layout/Drawer";
import SubmissionTargetReviewerAddForm from "components/composed/submissionTarget/SubmissionTargetReviewerAddForm";
import type { DialogProps } from "reakit/Dialog";

export default function SubmissionTargetReviewerAddDrawer({
  dialog,
  params,
}: Props) {
  const { t } = useTranslation();

  const { drawerSubmissionTargetId } = params;

  return drawerSubmissionTargetId ? (
    <Drawer
      header={t("actions.add.reviewer")}
      dialog={dialog}
      hideOnClickOutside={false}
    >
      <SubmissionTargetReviewerAddForm
        submissionTargetId={drawerSubmissionTargetId}
        closeDrawer={dialog.hide}
      />
    </Drawer>
  ) : null;
}

interface Props {
  dialog: DialogProps;
  params: Record<string, string | undefined | null>;
}
