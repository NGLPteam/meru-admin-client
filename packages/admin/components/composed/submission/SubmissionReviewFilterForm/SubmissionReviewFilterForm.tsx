import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { NullForm } from "components/api";
import { Checkbox, CheckboxGroup } from "components/forms";
import { Grid } from "components/forms";
import useQueryFilters from "hooks/useQueryFilters";
import * as Styled from "components/composed/submission/SubmissionFilterForm/styles";
import type { SubmissionReviewFilters } from "components/composed/submission/CurrentSubmissionReviewFilters";

const STATE_OPTIONS = ["PENDING", "APPROVED", "REJECTED"] as const;

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function SubmissionReviewFilterForm({
  onSuccess,
  onCancel,
}: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const { filters: existingFilters } =
    useQueryFilters<SubmissionReviewFilters>();

  const defaultValues = Object.fromEntries(
    STATE_OPTIONS.map((s) => [
      s,
      existingFilters.inState?.includes(s) ?? false,
    ]),
  ) as unknown as Record<string, string>;

  const onSubmit = (data: Record<string, string>) => {
    const selectedStates = STATE_OPTIONS.filter((s) => data[s]);

    const filters: SubmissionReviewFilters = {};

    if (selectedStates.length) {
      filters.inState = [...selectedStates];
    }

    if (onSuccess) onSuccess();

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          filters: JSON.stringify(filters),
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const onReset = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          filters: null,
        },
      },
      undefined,
      { shallow: true },
    );
    if (onCancel) onCancel();
  };

  return (
    <NullForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      onReset={onReset}
      resetLabel="search.clear_filters"
      submitLabel="search.apply_filters"
      defaultValues={defaultValues}
    >
      {({ form }) => (
        <Styled.Wrapper>
          <Grid>
            <Styled.FilterGroup>
              <Styled.GroupLabel className="t-label-lg">
                {t("search.submissions.filter_by_status")}
              </Styled.GroupLabel>
              <Styled.FieldsWrapper>
                <CheckboxGroup
                  name="inState"
                  label="search.submissions.filter_by_status"
                  hideLabel
                >
                  <Styled.TwoColumnCheckboxes>
                    {STATE_OPTIONS.map((state) => (
                      <Checkbox key={state} {...form.register(state)}>
                        {t(`status.${state.toLowerCase()}_label`)}
                      </Checkbox>
                    ))}
                  </Styled.TwoColumnCheckboxes>
                </CheckboxGroup>
              </Styled.FieldsWrapper>
            </Styled.FilterGroup>
          </Grid>
        </Styled.Wrapper>
      )}
    </NullForm>
  );
}
