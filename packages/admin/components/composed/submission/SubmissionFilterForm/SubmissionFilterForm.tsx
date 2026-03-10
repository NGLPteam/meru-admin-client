import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import omitBy from "lodash/omitBy";
import { NullForm } from "components/api";
import { Checkbox, CheckboxGroup, Select } from "components/forms";
import DatePicker from "components/forms/Input/patterns/DatePicker";
import ExpandableCheckboxList from "components/forms/ExpandableCheckboxList";
import { Grid } from "components/forms";
import useQueryFilters from "hooks/useQueryFilters";
import * as Styled from "./styles";
import type { SubmissionFilters } from "components/composed/submission/CurrentSubmissionFilters";
import type { CheckboxOption } from "components/forms/ExpandableCheckboxList";
import type { Option } from "components/forms/BaseSelect/BaseSelect";
import type { SubmissionState } from "types/graphql-schema";

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
  stateOptions: SubmissionState[];
  schemaOptions?: CheckboxOption[];
  targetOptions?: readonly Option[];
}

export default function SubmissionFilterForm({
  onSuccess,
  onCancel,
  stateOptions,
  schemaOptions = [],
  targetOptions = [],
}: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const { filters: existingFilters } = useQueryFilters<SubmissionFilters>();

  const defaultValues: Record<string, string> = {
    ...Object.fromEntries(
      stateOptions.map((s) => [
        s,
        existingFilters.inState?.includes(s) ?? false,
      ])
    ),
    "updatedAt.gteq": existingFilters.updatedAt?.gteq ?? "",
    "updatedAt.lteq": existingFilters.updatedAt?.lteq ?? "",
    submissionTargetId: existingFilters.submissionTargetIds?.[0] ?? "",
    schemaVersionIds: ((existingFilters.schemaVersionIds ??
      []) as unknown) as string,
  };

  const onSubmit = (data: Record<string, string>) => {
    const selectedStates = stateOptions.filter((s) => data[s]);

    const cleanedQuery = omitBy(router.query, (_value, key) => {
      return key && typeof key === "string" && key.startsWith("drawer");
    });

    const filters: SubmissionFilters = {};

    if (!!selectedStates.length) {
      filters.inState = selectedStates;
    }

    const updatedAt = data.updatedAt as SubmissionFilters["updatedAt"];
    if (updatedAt?.gteq || updatedAt?.lteq) {
      filters.updatedAt = omitBy(updatedAt, (val) => !val);
    }

    if (data.submissionTargetId) {
      filters.submissionTargetIds = [data.submissionTargetId];
    }

    const selectedSchemas = (data.schemaVersionIds as unknown) as string[];
    if (!!selectedSchemas?.length) {
      filters.schemaVersionIds = selectedSchemas;
    }

    if (onSuccess) onSuccess();

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...cleanedQuery,
          page: 1,
          filters: JSON.stringify(filters),
        },
      },
      undefined,
      { shallow: true }
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
      { shallow: true }
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
                    {stateOptions.map((state) => (
                      <Checkbox key={state} {...form.register(state)}>
                        {t(`status.${state.toLowerCase()}_label`)}
                      </Checkbox>
                    ))}
                  </Styled.TwoColumnCheckboxes>
                </CheckboxGroup>
              </Styled.FieldsWrapper>
            </Styled.FilterGroup>
            <Styled.FilterGroup>
              <Styled.GroupLabel className="t-label-lg">
                {t("search.submissions.filter_by_date")}
              </Styled.GroupLabel>
              <Styled.FieldsWrapper>
                <Styled.DateRangeRow>
                  <DatePicker
                    label={t("search.submissions.updated_after")}
                    {...form.register("updatedAt.gteq")}
                  />
                  <DatePicker
                    label={t("search.submissions.updated_before")}
                    {...form.register("updatedAt.lteq")}
                  />
                </Styled.DateRangeRow>
              </Styled.FieldsWrapper>
            </Styled.FilterGroup>
            {!!targetOptions.length && (
              <Styled.FilterGroup>
                <Styled.GroupLabel className="t-label-lg">
                  {t("search.submissions.submission_target")}
                </Styled.GroupLabel>
                <Styled.FieldsWrapper>
                  <Select
                    label={t("glossary.collection")}
                    options={targetOptions}
                    placeholder={t("forms.fields.select_placeholder")}
                    {...form.register("submissionTargetId")}
                  />
                </Styled.FieldsWrapper>
              </Styled.FilterGroup>
            )}
            {!!schemaOptions.length && (
              <Styled.FilterGroup>
                <Styled.GroupLabel className="t-label-lg">
                  {t("glossary.schema")}
                </Styled.GroupLabel>
                <Styled.FieldsWrapper>
                  <ExpandableCheckboxList
                    name="schemaVersionIds"
                    groupLabel={t("glossary.schema")}
                    options={schemaOptions}
                    control={form.control}
                  />
                </Styled.FieldsWrapper>
              </Styled.FilterGroup>
            )}
          </Grid>
        </Styled.Wrapper>
      )}
    </NullForm>
  );
}
