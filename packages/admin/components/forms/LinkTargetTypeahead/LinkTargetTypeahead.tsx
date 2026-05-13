import { useState, useEffect } from "react";
import { readInlineData, GraphQLTaggedNode } from "relay-runtime";
import { useRelayEnvironment, fetchQuery, graphql } from "react-relay";
import { debounce } from "lodash";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BaseTypeahead from "components/forms/BaseTypeahead";
import { getEntityTitle } from "components/factories/EntityTitleFactory";
import {
  LinkTargetTypeaheadQuery as Query,
  LinkTargetTypeaheadQuery$data as Response,
} from "@/relay/LinkTargetTypeaheadQuery.graphql";
import {
  LinkTargetTypeaheadFragment$data,
  LinkTargetTypeaheadFragment$key,
} from "@/relay/LinkTargetTypeaheadFragment.graphql";
import type { FieldValues, Control, Path } from "react-hook-form";

type TypeaheadProps = React.ComponentProps<typeof BaseTypeahead>;
type Edge = LinkTargetTypeaheadFragment$data["edges"][number];

const LinkTargetTypeahead = <T extends FieldValues = FieldValues>({
  slug,
  name,
  control,
  label,
  disabled,
  required,
}: Props<T>) => {
  const { t } = useTranslation();

  const [q, setQ] = useState("a");
  const [data, setData] = useState<Response | undefined>();

  const debouncedOnChange = debounce((value) => setQ(value), 300);

  const formatOptions = (data: Response) => {
    const { linkTargetCandidates } = data.collection ?? data.item ?? {};

    if (!linkTargetCandidates) return [];

    const optionsData = readInlineData<LinkTargetTypeaheadFragment$key>(
      fragment as GraphQLTaggedNode,
      linkTargetCandidates,
    );

    const options = optionsData?.edges?.map((edge: Edge) => ({
      label: getEntityTitle(edge.node.target),
      value: edge.node.targetId,
    }));

    return options;
  };

  const env = useRelayEnvironment();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        fetchQuery<Query>(
          env,
          query,
          { slug, title: q },
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
  }, [q, slug, env]);

  return (
    <Controller<T>
      name={name}
      control={control}
      rules={{
        validate: (value) => {
          return !!value || (t("forms.validation.link_target") as string);
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
  data?: LinkTargetTypeaheadFragment$key | null;
  control: Control<T>;
  name: Path<T>;
  slug: string;
}

export default LinkTargetTypeahead;

const query = graphql`
  query LinkTargetTypeaheadQuery($slug: Slug!, $title: String) {
    collection(slug: $slug) {
      linkTargetCandidates(title: $title) {
        ...LinkTargetTypeaheadFragment
      }
    }
    item(slug: $slug) {
      linkTargetCandidates(title: $title) {
        ...LinkTargetTypeaheadFragment
      }
    }
  }
`;

const fragment = graphql`
  fragment LinkTargetTypeaheadFragment on LinkTargetCandidateConnection
  @inline {
    edges {
      node {
        targetId
        target {
          ...getEntityTitleFragment
        }
      }
    }
  }
`;
