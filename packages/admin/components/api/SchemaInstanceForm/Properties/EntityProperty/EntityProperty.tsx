import React, { useCallback, useMemo } from "react";
import { useFragment, graphql } from "react-relay";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "components/forms/Select";
import { getEntityTitle } from "components/factories/EntityTitleFactory";

import { SchemaKind } from "types/graphql-schema";
import type { EntityPropertyFragment$key } from "@/relay/EntityPropertyFragment.graphql";
import ScalarProperty from "../ScalarProperty";

export default function EntityProperty(props: Props) {
  const field = useFragment<EntityPropertyFragment$key>(fragment, props.field);

  const { control } = useFormContext();

  const { t } = useTranslation();

  const options = useMemo(() => {
    return field.availableEntities.map(({ entity, value }) => ({
      label: getEntityTitle(entity),
      value,
    }));
  }, [field]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLSelectElement>,
      onChange: (val?: string) => void,
    ) => {
      onChange(e.target.value || undefined);
    },
    [],
  );

  return (
    <ScalarProperty field={field}>
      {({ label, required, name, isWide, instructions }) => (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, ref: _ref, ...inputProps } }) => (
            <Select
              label={label}
              required={required}
              description={instructions}
              options={options}
              isWide={isWide}
              onChange={(value: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange(value, onChange)
              }
              placeholder={
                required ? undefined : t("forms.fields.select_placeholder")
              }
              {...inputProps}
            />
          )}
        />
      )}
    </ScalarProperty>
  );
}

interface Props {
  field: EntityPropertyFragment$key;
  schemaKind: SchemaKind;
}

const fragment = graphql`
  fragment EntityPropertyFragment on EntityProperty {
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
