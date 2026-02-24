import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid, Select, Textarea } from "components/forms";
import { Button } from "components/atomic";
import * as Styled from "components/api/MutationForm/MutationForm.styles";

type Fields = {
  decision: string;
  commentsForDepositor: string;
  internalNotes: string;
};

export default function SubmissionReviewForm({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const { t } = useTranslation();
  const form = useForm<Fields>();
  const { register, handleSubmit } = form;

  const onSubmit = (data: Fields) => {
    // TODO: wire up mutation
    // eslint-disable-next-line no-console
    console.log("Review submission:", data);
    onSuccess?.();
  };

  const decisionOptions = [
    { label: t("forms.fields.decision_approve"), value: "APPROVE" },
    {
      label: t("forms.fields.decision_request_revisions"),
      value: "REQUEST_REVISIONS",
    },
    { label: t("forms.fields.decision_reject"), value: "REJECT" },
  ];

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Select
            label="forms.fields.decision"
            options={decisionOptions}
            required
            isWide
            {...register("decision", { required: true })}
          />
          <Textarea
            label="forms.fields.comments_for_depositor"
            isWide
            {...register("commentsForDepositor")}
          />
          <Textarea
            label="forms.fields.internal_notes"
            isWide
            {...register("internalNotes")}
          />
        </Grid>
        <Styled.Footer className="l-flex l-flex--gap">
          <Button type="submit">{t("common.submit")}</Button>
          {onCancel && (
            <Button type="button" onClick={onCancel} $secondary>
              {t("common.cancel")}
            </Button>
          )}
        </Styled.Footer>
      </form>
    </FormProvider>
  );
}
