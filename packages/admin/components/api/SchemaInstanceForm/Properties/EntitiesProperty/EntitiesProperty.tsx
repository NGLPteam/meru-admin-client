import React, { useMemo } from "react";
import { useFragment, graphql } from "react-relay";
import { Controller, useFormContext } from "react-hook-form";
import Multiselect from "components/forms/Multiselect";
import { getEntityTitle } from "components/factories/EntityTitleFactory";
import { SchemaKind } from "types/graphql-schema";
import { useTranslation } from "react-i18next";
import type { EntitiesPropertyFragment$key } from "@/relay/EntitiesPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function EntitiesProperty({ schemaKind, ...props }: Props) {
  const { t } = useTranslation();

  const field = useFragment<EntitiesPropertyFragment$key>(
    fragment,
    props.field,
  );

  const { control } = useFormContext();

  const options = useMemo(() => {
    return field.availableEntities.map(({ entity, value }) => {
      return {
        label: getEntityTitle(entity),
        value,
      };
    });
  }, [field]);

  return (
    <ScalarProperty field={field}>
      {({ label, required, name }) => (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field: { ...props } }) => (
            <Multiselect
              label={label}
              required={required}
              options={options}
              isWide
              dragDropOrder
              disabled={options.length === 0}
              description={
                options.length === 0
                  ? `There are no ${label} in this ${t(`glossary.${schemaKind.toLowerCase()}`)}.`
                  : ""
              }
              {...props}
            />
          )}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: EntitiesPropertyFragment$key;
  schemaKind: SchemaKind;
}

const fragment = graphql`
  fragment EntitiesPropertyFragment on EntitiesProperty {
    ...ScalarPropertyFragment
    availableEntities {
      label
      value
      entity {
        ...getEntityTitleFragment
      }
    }
  }
`;
