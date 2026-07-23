import { Ref, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { graphql, useRelayEnvironment, fetchQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import BaseTypeahead from "components/forms/BaseTypeahead";
import {
  ItemTypeaheadQuery as Query,
  ItemTypeaheadQuery$data as Response,
} from "__generated__/ItemTypeaheadQuery.graphql";
import type { FieldValues, Control, Path } from "react-hook-form";

type TypeaheadProps = React.ComponentProps<typeof BaseTypeahead>;

const ItemTypeahead = <T extends FieldValues = FieldValues>(
  { control, name, label, disabled, required }: Props<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ref: Ref<HTMLInputElement>,
) => {
  const [q, setQ] = useState("a");
  const [data, setData] = useState<Query["response"]>();

  const formatOptions = (data: Response) => {
    if (!data || !data.search?.results?.edges?.length) return;

    const results = data.search.results.edges;
    const options = results.map(({ node }) => {
      return {
        label: node.title || "",
        value: node.entity.id ?? "",
      };
    });
    return options;
  };

  const { t } = useTranslation();

  const env = useRelayEnvironment();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        fetchQuery<Query>(
          env,
          query,
          { query: q },
          {
            networkCacheConfig: { force: false },
          },
        ).subscribe({
          next: (data) => {
            setData(data);
          },
        });
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log(error);
      }
    };

    fetchOptions();
  }, [q, env]);

  const debouncedOnChange = debounce((value) => setQ(value), 500);

  return (
    <Controller<T>
      name={name}
      control={control}
      rules={{
        validate: (value) => {
          return !!value || (t("forms.validation.item") as string);
        },
      }}
      render={({ field }) => (
        <BaseTypeahead
          label={label}
          options={data ? formatOptions(data) : []}
          onInputChange={debouncedOnChange}
          disabled={disabled}
          required={required}
          defaultValue={q}
          {...field}
        />
      )}
    />
  );
};

interface Props<T extends FieldValues = FieldValues> extends Omit<
  TypeaheadProps,
  "options" | "name"
> {
  control: Control<T>;
  name: Path<T>;
}

export default ItemTypeahead;

const query = graphql`
  query ItemTypeaheadQuery($query: String!) {
    search(visibility: ALL) {
      results(
        prefix: $query
        page: 1
        perPage: 50
        order: TITLE_ASCENDING
        scope: ITEM
      ) {
        edges {
          node {
            title
            entity {
              ... on Node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
