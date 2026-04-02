import { useTranslation } from "react-i18next";
import { graphql, useLazyLoadQuery } from "react-relay";
import SearchableFilterList from "components/layout/Table/filters/SearchableFilterList";
import useQueryFilters from "hooks/useQueryFilters";
import type { SubmissionCollectionFilterQuery as Query } from "@/relay/SubmissionCollectionFilterQuery.graphql";
import type { SelectOption } from "components/layout/Table/filters/SearchableFilterList";
import type { SubmissionFilters } from "components/composed/submission/CurrentSubmissionFilters";

export default function SubmissionCollectionFilter() {
  const { t } = useTranslation();
  const { filters, updateFilters } = useQueryFilters<SubmissionFilters>();

  const data = useLazyLoadQuery<Query>(query, {});

  const selected = filters.submissionTargetIds ?? [];

  const options: SelectOption[] = (data.submissionTargets?.nodes ?? []).map(
    (node) => ({
      value: node.id,
      label: node.entity?.title ?? node.id,
      render: <span>{node.entity?.title ?? node.id}</span>,
    }),
  );

  const toggle = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((id) => id !== value)
      : [...selected, value];

    const updated = { ...filters };
    if (next.length) {
      updated.submissionTargetIds = next;
    } else {
      delete updated.submissionTargetIds;
    }
    updateFilters(updated);
  };

  return (
    <SearchableFilterList
      options={options}
      selected={selected}
      onToggle={toggle}
      placeholder={t("search.submissions.filter_collection")}
      label={t("search.submissions.filter_collection")}
    />
  );
}

const query = graphql`
  query SubmissionCollectionFilterQuery {
    submissionTargets {
      nodes {
        id
        entity {
          ... on Collection {
            title
          }
        }
      }
    }
  }
`;
