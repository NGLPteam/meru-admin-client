import React, { useCallback } from "react";
import { useFragment, graphql } from "react-relay";
import { Controller, useFormContext } from "react-hook-form";
import isFunction from "lodash/isFunction";
import { Trans } from "react-i18next";
import Link from "next/link";
import { useRouteSlug } from "hooks";
import { useSchemaFormFieldsContext } from "components/api/SchemaFormFields/SchemaFormFieldsContext";
import AssetPropertySelect from "components/forms/AssetPropertySelect";
import { OnChangeInput } from "components/forms/AssetPropertySelect/AssetPropertySelect";
import { RouteHelper } from "routes";
import type { AssetPropertyFragment$key } from "@/relay/AssetPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function AssetProperty(props: Props) {
  const {
    assets: options,
    refetch,
    isSubmission,
  } = useSchemaFormFieldsContext();

  const field = useFragment<AssetPropertyFragment$key>(fragment, props.field);

  const { control } = useFormContext();

  const handleRefetch = useCallback(
    () => (isFunction(refetch) ? refetch({}) : null),
    [refetch],
  );

  const slug = useRouteSlug();

  const LinkText = ({ children }: { children?: React.ReactNode }) => {
    const route = RouteHelper.activeRoute();
    const splitPath = route?.name.split(".") || null;
    const filesRoute =
      splitPath && splitPath[0]
        ? RouteHelper.findRouteByName(`${splitPath[0]}.manage.files`)
        : null;

    return (
      <Link
        href={{ pathname: filesRoute?.path, query: { slug } }}
        className="a-link"
      >
        {children}
      </Link>
    );
  };

  const fallbackDescription = isSubmission ? undefined : (
    <Trans
      i18nKey="forms.asset_property_select.description"
      components={{
        filesLink: <LinkText />,
      }}
    />
  );

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, instructions }) => (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, ...fieldProps } }) => (
            <AssetPropertySelect
              label={label}
              required={required}
              options={options}
              onChange={(value?: OnChangeInput) => onChange(value || null)}
              refetchAssets={handleRefetch}
              description={
                instructions ?? props.description ?? fallbackDescription
              }
              isWide
              {...fieldProps}
            />
          )}
        />
      )}
    </ScalarProperty>
  );
}
interface Props {
  field: AssetPropertyFragment$key;
  description?: string;
}

const fragment = graphql`
  fragment AssetPropertyFragment on AssetProperty {
    ...ScalarPropertyFragment
  }
`;
