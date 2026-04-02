import { useState, useEffect } from "react";
import { useCombobox } from "downshift";
import { graphql, useRelayEnvironment, fetchQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import UserAvatar from "components/composed/user/UserAvatar";
import useQueryFilters from "hooks/useQueryFilters";
import SearchableFilterList from "components/layout/Table/filters/SearchableFilterList";

import type { SubmissionUserFilterQuery as Query } from "@/relay/SubmissionUserFilterQuery.graphql";
import type { SubmissionUserFilterQuery$data as Response } from "@/relay/SubmissionUserFilterQuery.graphql";
import type { SubmissionFilters } from "components/composed/submission/CurrentSubmissionFilters/CurrentSubmissionFilters";

export default function SubmissionUserFilter() {
  const { t } = useTranslation();
  const env = useRelayEnvironment();
  const { filters, updateFilters } = useQueryFilters<SubmissionFilters>();

  const [prefix, setPrefix] = useState("a");
  const [data, setData] = useState<Response>();

  useEffect(() => {
    const subscription = fetchQuery<Query>(
      env,
      query,
      { query: prefix },
      { networkCacheConfig: { force: false } },
    ).subscribe({
      next: (result) => setData(result),
    });

    return () => subscription.unsubscribe();
  }, [prefix, env]);

  const debouncedSetPrefix = debounce((value: string) => setPrefix(value), 500);

  const options = data?.users?.edges?.length
    ? data.users.edges.map(({ node }) => ({
        label: node.name ?? "",
        value: node.id ?? "",
        node: (
          <span className="l-flex l-flex--align-center l-flex--gap-sm">
            <UserAvatar data={node} />
            {node.name}
          </span>
        ),
      }))
    : [];

  const selectedUserId = filters.userIds?.[0];
  const initialItem = options.find((opt) => opt.value === selectedUserId);

  const { getLabelProps, getMenuProps, getInputProps, getItemProps } =
    useCombobox({
      items: options,
      initialSelectedItem: initialItem,
      itemToString: (item) => (item ? item.label : ""),
      onInputValueChange: ({ inputValue }) => {
        debouncedSetPrefix(inputValue || "");
      },
      onSelectedItemChange: ({ selectedItem }) => {
        if (selectedItem) {
          updateFilters({
            ...filters,
            userIds: [selectedItem.value],
            userName: selectedItem.label,
          });
        } else {
          const next = { ...filters };
          delete next.userIds;
          delete next.userName;
          updateFilters(next);
        }
      },
    });

  const opts = options.map((o, index) => ({
    value: o.value,
    render: o.node,
    props: getItemProps({ index, item: o }),
  }));

  return (
    <SearchableFilterList
      inputProps={getInputProps({
        placeholder: t("search.submissions.filter_submitted_by"),
      })}
      listProps={getMenuProps()}
      labelProps={getLabelProps()}
      label={t("search.submissions.filter_by_user")}
      options={opts}
      selected={filters.userIds ?? []}
    />
  );
}

const query = graphql`
  query SubmissionUserFilterQuery($query: String!) {
    users(prefix: $query, page: 1, perPage: 50, order: NAME_ASCENDING) {
      edges {
        node {
          id
          name
          ...UserAvatarFragment
        }
      }
    }
  }
`;
