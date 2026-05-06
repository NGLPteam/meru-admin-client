import { Ref, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { graphql, useRelayEnvironment, fetchQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import BaseTypeahead from "components/forms/BaseTypeahead";
import { getContributorDisplayName } from "components/composed/contributor/ContributorDisplayName";
import {
  ContributorTypeaheadQuery as Query,
  ContributorTypeaheadQuery$data as Response,
} from "__generated__/ContributorTypeaheadQuery.graphql";
import type { FieldValues, Control, Path } from "react-hook-form";

type TypeaheadProps = React.ComponentProps<typeof BaseTypeahead>;

const ContributorTypeahead = <T extends FieldValues = FieldValues>(
  { control, name, label, disabled, required }: Props<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ref: Ref<HTMLInputElement>,
) => {
  const [q, setQ] = useState("a");
  const [data, setData] = useState<Query["response"]>();

  const formatOptions = (data: Response) => {
    if (!data || !data.contributors?.edges?.length) return;

    const results = data.contributors.edges;
    const options = results.map(({ node }) => {
      return {
        label: getContributorDisplayName(node) || "",
        value: node?.__typename !== "%other" ? node.id : "",
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
          return !!value || (t("forms.validation.contributor") as string);
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
export default ContributorTypeahead;

const query = graphql`
  query ContributorTypeaheadQuery($query: String!) {
    contributors(prefix: $query, page: 1, perPage: 50, order: NAME_ASCENDING) {
      edges {
        node {
          ... on PersonContributor {
            __typename
            givenName
            familyName
            id
          }
          ... on OrganizationContributor {
            __typename
            legalName
            id
          }
        }
      }
    }
  }
`;
