import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import capitalize from "lodash/capitalize";
import { ContentHeader } from "components/layout";
import Checkbox from "components/forms/Checkbox";
import FormGrid from "components/forms/FormGrid";

type Fields = {
  acceptsSubmissions: boolean;
};

export default function CollectionSubmissionSettings() {
  const { t } = useTranslation();
  const { register } = useForm<Fields>({
    defaultValues: { acceptsSubmissions: false },
  });

  return (
    <>
      <ContentHeader
        headerStyle="secondary"
        title={capitalize(t("glossary.submission_other"))}
      />
      <form>
        <FormGrid>
          <Checkbox
            label="forms.fields.accepts_submissions"
            {...register("acceptsSubmissions")}
          />
        </FormGrid>
      </form>
    </>
  );
}
