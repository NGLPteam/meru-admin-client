import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { graphql, useLazyLoadQuery } from "react-relay";
import { formatDate } from "@wdp/lib/helpers";
import useQueryFilters from "hooks/useQueryFilters";
import FilterTagList from "components/composed/search/FilterTagList";
import type { CurrentSubmissionFiltersQuery as Query } from "@/relay/CurrentSubmissionFiltersQuery.graphql";
import type { FilterTag } from "components/composed/search/FilterTagList";

export type SubmissionFilters = {
  inState?: string[];
  updatedAt?: { gteq?: string; lteq?: string };
  submissionTargetIds?: string[];
  schemaVersionIds?: string[];
};

export default function CurrentSubmissionFilters() {
  const { t } = useTranslation();
  const { filters, updateFilters, removeArrayFilter } =
    useQueryFilters<SubmissionFilters>();

  const data = useLazyLoadQuery<Query>(query, {});

  const targetLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const node of data.submissionTargets?.nodes ?? []) {
      map[node.id] = node.entity?.title ?? node.id;
    }
    return map;
  }, [data]);

  const schemaLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const opt of data.schemaVersionOptions) {
      map[opt.schemaVersion.id] = opt.schemaVersion.name;
    }
    return map;
  }, [data]);

  const { inState, updatedAt, submissionTargetIds, schemaVersionIds } = filters;

  const removeDateFilter = (subkey: "gteq" | "lteq") => {
    const next = { ...filters };
    const nextDates = { ...updatedAt };
    delete nextDates[subkey];
    if (Object.keys(nextDates).length) {
      next.updatedAt = nextDates;
    } else {
      delete next.updatedAt;
    }
    updateFilters(next);
  };

  const dateName = t("search.submissions.updated_tag_label");

  const tags: FilterTag[] = [
    ...(inState?.map((state) => ({
      key: `state-${state}`,
      label: t(`status.${state.toLowerCase()}_label`),
      onRemove: () => removeArrayFilter("inState", state),
    })) ?? []),

    ...(updatedAt?.gteq
      ? [
          {
            key: "updatedAt-gteq",
            label: t("search.filter_name_value_dateGTE", {
              name: dateName,
              value: formatDate(updatedAt.gteq, "yyyy-MM-dd"),
            }),
            onRemove: () => removeDateFilter("gteq"),
          },
        ]
      : []),

    ...(updatedAt?.lteq
      ? [
          {
            key: "updatedAt-lteq",
            label: t("search.filter_name_value_dateLTE", {
              name: dateName,
              value: formatDate(updatedAt.lteq, "yyyy-MM-dd"),
            }),
            onRemove: () => removeDateFilter("lteq"),
          },
        ]
      : []),

    ...(submissionTargetIds?.map((id) => ({
      key: `target-${id}`,
      label: targetLabels[id] ?? id,
      onRemove: () => removeArrayFilter("submissionTargetIds", id),
    })) ?? []),

    ...(schemaVersionIds?.map((id) => ({
      key: `schema-${id}`,
      label: schemaLabels[id] ?? id,
      onRemove: () => removeArrayFilter("schemaVersionIds", id),
    })) ?? []),
  ];

  return <FilterTagList tags={tags} />;
}

const query = graphql`
  query CurrentSubmissionFiltersQuery {
    schemaVersionOptions(kind: ITEM) {
      schemaVersion {
        id
        name
      }
    }
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
