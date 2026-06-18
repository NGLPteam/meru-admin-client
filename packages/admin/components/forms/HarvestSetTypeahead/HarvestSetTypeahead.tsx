import { useState, useEffect } from "react";
import { useRelayEnvironment, fetchQuery, graphql } from "react-relay";
import { debounce } from "lodash";
import { Controller } from "react-hook-form";
import BaseTypeahead from "components/forms/BaseTypeahead";
import {
  HarvestSetTypeaheadQuery as Query,
  HarvestSetTypeaheadQuery$data as Response,
} from "@/relay/HarvestSetTypeaheadQuery.graphql";
import * as Styled from "./HarvestSetTypeahead.styles";
import type { FieldValues, Control, Path } from "react-hook-form";

type TypeaheadProps = React.ComponentProps<typeof BaseTypeahead>;

const HarvestSetTypeahead = <T extends FieldValues = FieldValues>({
  slug,
  name,
  control,
  label,
  disabled,
  required,
  isWide,
}: Props<T>) => {
  const [q, setQ] = useState("a");
  const [data, setData] = useState<Response | undefined>();
  const env = useRelayEnvironment();

  const debouncedOnChange = debounce((value) => setQ(value), 300);

  const formatOptions = (data: Response) => {
    const { harvestSets } = data.harvestSource ?? {};

    if (!harvestSets) return [];

    const options = harvestSets.nodes?.map((node) => ({
      node: (
        <div>
          <Styled.Identifier>{node.identifier}</Styled.Identifier>
          <Styled.Name>{node.name}</Styled.Name>
        </div>
      ),
      value: node.id,
      label: node.identifier,
    }));

    return options;
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        fetchQuery<Query>(
          env,
          query,
          { slug, q },
          {
            networkCacheConfig: { force: true },
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
  }, [q, slug, env]);

  return (
    <Controller<T>
      name={name}
      control={control}
      render={({ field }) => (
        <BaseTypeahead
          label={label}
          options={data ? formatOptions(data) : []}
          onInputChange={debouncedOnChange}
          disabled={disabled}
          required={required}
          defaultValue={q}
          isWide={isWide}
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
  slug: string;
}

export default HarvestSetTypeahead;

const query = graphql`
  query HarvestSetTypeaheadQuery($slug: Slug!, $q: String!) {
    harvestSource(slug: $slug) {
      identifier
      harvestSets(filters: { prefix: $q }, page: 1, perPage: 50) {
        nodes {
          id
          identifier
          name
        }
      }
    }
  }
`;
