import { Forms } from "components/api/MutationForm";
import { formatDate } from "@wdp/lib/helpers";
import { useRouteSlug } from "hooks";
import MockInput from "components/forms/MockInput";
import {
  MOCK_SUBMISSIONS,
  type SubmissionNode,
} from "components/composed/submission/SubmissionList/mockData";

export default function SubmissionDetails() {
  const slug = useRouteSlug();
  const submission: SubmissionNode | undefined = MOCK_SUBMISSIONS.find(
    (s) => s.slug === slug,
  );

  return (
    <Forms.Grid>
      <MockInput
        label="forms.fields.title"
        value={submission?.title ?? ""}
        isWide
      />
      <MockInput label="forms.fields.subtitle" value="" isWide />
      <MockInput
        label="forms.fields.collection"
        value={submission?.collection ?? ""}
      />
      <MockInput label="forms.schema.label" value="" />
      <MockInput label="forms.fields.status" value={submission?.status ?? ""} />
      <MockInput
        label="forms.fields.last_updated"
        value={formatDate(submission?.updatedAt ?? "")}
      />
      <MockInput label="forms.fields.summary" value="" isWide />
      <MockInput label="forms.fields.contributors" value="" isWide />
      <MockInput label="forms.fields.files" value="" isWide />
    </Forms.Grid>
  );
}
