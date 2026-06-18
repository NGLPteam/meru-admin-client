import React, { useMemo } from "react";
import flatMap from "lodash/flatMap";
import uniqBy from "lodash/uniqBy";
import { useRouter } from "next/router";
import { filterSearchableProperties } from "@wdp/lib/search";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { normalizeRouteQueryArray } from "@wdp/lib/routes";
import useQueryFilters from "hooks/useQueryFilters";
import FilterTagList from "components/composed/search/FilterTagList";
import {
  CurrentSearchFiltersFragment$data,
  CurrentSearchFiltersFragment$key,
} from "@/relay/CurrentSearchFiltersFragment.graphql";
import type { FilterTag } from "components/composed/search/FilterTagList";

export default function CurrentFilters({ data }: Props) {
  const searchData = useFragment(fragment, data);

  const { t } = useTranslation();

  const { pathname, query, push } = useRouter();

  const { filters, removeFilter } = useQueryFilters();

  const schemas = useMemo(() => {
    const schemaQuery = query?.schema
      ? normalizeRouteQueryArray(query.schema)
      : [];

    return schemaQuery.map((s) => {
      const obj = searchData.schemas.find(
        (schema) => `${schema.schemaDefinition.slug}` === s,
      );

      return {
        ...obj,
        value: s,
      };
    });
  }, [searchData, query]);

  const handleSchemaClick = (schema: string) => {
    push(
      {
        pathname,
        query: {
          ...query,
          schema: schemas.filter((s) => s.value !== schema).map((s) => s.value),
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  // Get all filter options in a flat list
  const allFilters = useMemo(() => {
    if (!searchData) return [];

    const flat = flatMap(searchData.schemas, (args) => {
      return args.searchableProperties;
    });

    const schemaProps = filterSearchableProperties<Node>(
      uniqBy(flat, "searchPath"),
    );

    const coreProps = filterSearchableProperties<Node>(
      searchData?.coreProperties,
    );

    return [...coreProps, ...schemaProps];
  }, [searchData]);

  // Render a label for the current filter
  const renderFilter = (filterKey: string, value: unknown) => {
    const pairs = filterKey.split("--");

    if (pairs.length < 2) return null;

    const path = pairs[0].replace("-", ".");

    const operator = pairs[1];

    const filter = allFilters.find(({ searchPath }) => searchPath === path);

    if (!filter) return null;

    const isBoolean = path.includes("boolean");

    return isBoolean
      ? filter?.label || filterKey
      : t("search.filter_name_value", {
          context: operator,
          name: filter?.label || filterKey,
          value,
        });
  };

  const filterTags = Object.keys(filters).reduce(
    (arr: FilterTag[], filterKey) => {
      const filterLabel = renderFilter(filterKey, filters[filterKey]);
      if (filterLabel) {
        return [
          ...arr,
          {
            key: filterKey,
            label: filterLabel,
            onRemove: () => removeFilter(filterKey),
          },
        ];
      }
      return arr;
    },
    [],
  );

  const schemaTags = schemas.map((schema) => ({
    key: `schema-${schema.value}`,
    label: schema.name ?? schema.value,
    onRemove: () => handleSchemaClick(schema.value),
  }));

  return <FilterTagList tags={[...filterTags, ...schemaTags]} />;
}

interface Props {
  data: CurrentSearchFiltersFragment$key;
}

type Node = CurrentSearchFiltersFragment$data["coreProperties"][number];

const fragment = graphql`
  fragment CurrentSearchFiltersFragment on SearchScope {
    coreProperties {
      ... on SearchableProperty {
        searchPath
        label
      }
    }
    schemas: availableSchemaVersions {
      name
      schemaDefinition {
        slug
      }
      searchableProperties {
        ... on SearchableProperty {
          searchPath
          label
        }
      }
    }
  }
`;
