import { useTranslation } from "react-i18next";
import { StatusBadge } from "components/composed/submission/SubmissionList/StatusBadge";
import SearchableFilterList from "components/layout/Table/filters/SearchableFilterList";
import useQueryFilters from "hooks/useQueryFilters";
import type { SelectOption } from "components/layout/Table/filters/SearchableFilterList";
import type { SubmissionFilters } from "components/composed/submission/CurrentSubmissionFilters";
import type { SubmissionState } from "types/graphql-schema";

interface Props {
  stateOptions: SubmissionState[];
}

export default function SubmissionStatusFilter({ stateOptions }: Props) {
  const { t } = useTranslation();
  const { filters, updateFilters } = useQueryFilters<SubmissionFilters>();

  const selected = filters.inState ?? [];

  const options: SelectOption[] = stateOptions.map((state) => ({
    value: state,
    label: t(`status.${state.toLowerCase()}_label`),
    render: <StatusBadge status={state} />,
  }));

  const toggle = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((s) => s !== value)
      : [...selected, value];

    const updated = { ...filters };
    if (next.length) {
      updated.inState = next;
    } else {
      delete updated.inState;
    }
    updateFilters(updated);
  };

  return (
    <SearchableFilterList
      options={options}
      selected={selected}
      onToggle={toggle}
      placeholder={t("search.submissions.filter_by_status")}
      label={t("search.submissions.filter_by_status")}
    />
  );
}
