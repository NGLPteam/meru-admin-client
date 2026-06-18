import { useTranslation } from "react-i18next";
import { Drawer } from "components/layout";
import SubmissionReviewFilterForm from "../SubmissionReviewFilterForm";
import type { DialogProps } from "reakit/Dialog";

interface Props {
  dialog: DialogProps;
}

export default function SubmissionReviewFilterDrawer({ dialog }: Props) {
  const { t } = useTranslation();

  return (
    <Drawer
      label={t("search.filter_options")}
      dialog={dialog}
      hideOnClickOutside={false}
    >
      <SubmissionReviewFilterForm
        onSuccess={dialog.hide}
        onCancel={dialog.hide}
      />
    </Drawer>
  );
}
