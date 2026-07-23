import { useTranslation } from "react-i18next";
import { useDestroyer } from "hooks";
import { ButtonControlConfirm } from "components/atomic";
import type { SubmissionLayoutFragment$data } from "@/relay/SubmissionLayoutFragment.graphql";

export default function DeleteSubmissionButton({ submission }: Props) {
  const { t } = useTranslation();
  const destroy = useDestroyer();

  if (!submission) return null;

  const { id, entity } = submission;
  const label = entity?.title || t("glossary.submission");

  const handleDelete = (hideDialog: () => void) => {
    destroy.submission({ submissionId: id }, label, "/my-submissions");
    hideDialog();
  };

  return (
    <ButtonControlConfirm
      modalLabel={t("messages.delete.confirm_label")}
      modalBody={t("actions.submissions.delete_confirm")}
      icon="delete"
      onClick={handleDelete}
      disabled={destroy.inFlight}
    >
      {t("common.delete")}
    </ButtonControlConfirm>
  );
}

interface Props {
  submission?: SubmissionLayoutFragment$data | null;
}
