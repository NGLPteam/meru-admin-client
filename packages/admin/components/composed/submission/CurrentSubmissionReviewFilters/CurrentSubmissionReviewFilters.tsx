import { useTranslation } from "react-i18next";
import useQueryFilters from "hooks/useQueryFilters";
import FilterTagList from "components/composed/search/FilterTagList";
import type { FilterTag } from "components/composed/search/FilterTagList";

export type SubmissionReviewFilters = {
  inState?: string[];
};

export default function CurrentSubmissionReviewFilters() {
  const { t } = useTranslation();
  const { filters, removeArrayFilter } =
    useQueryFilters<SubmissionReviewFilters>();

  const { inState } = filters;

  const tags: FilterTag[] = [
    ...(inState?.map((state) => ({
      key: `state-${state}`,
      label: t(`status.${state.toLowerCase()}_label`),
      onRemove: () => removeArrayFilter("inState", state),
    })) ?? []),
  ];

  return <FilterTagList tags={tags} />;
}
