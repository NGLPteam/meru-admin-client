import React from "react";
import { useId } from "react";
import isFunction from "lodash/isFunction";
import { useTranslation } from "react-i18next";

import Errors from "components/forms/Errors";
import BaseInputLabel from "components/forms/BaseInputLabel";
import * as Styled from "./BaseInputWrapper.styles";
import type InputProps from "../inputType";
import type { FieldValues } from "react-hook-form";

const BaseInputWrapper = <T extends FieldValues = FieldValues>({
  children,
  description,
  descriptionTop,
  hideLabel,
  label,
  labelProps,
  name,
  required,
  isWide,
  role,
  errorPath,
}: Props<T>) => {
  const { t } = useTranslation();
  const uid = useId();
  // Setting the width this way creates a small extra class that's applied for wide wrappers
  // This prevents the Styled.Wrapper CSS from getting duplicated for a single width change
  const css = isWide && {
    "flex-basis": "var(--form-grid-item-width-wide)",
  };

  return (
    <Styled.Wrapper css={css} role={role}>
      <BaseInputLabel htmlFor={uid} $hideLabel={hideLabel} {...labelProps}>
        {t(label)}{" "}
        {required && (
          <span className="a-required">
            * <span className="a-hidden">required</span>
          </span>
        )}
      </BaseInputLabel>
      {description && descriptionTop && (
        <Styled.Description $descriptionTop={descriptionTop}>
          {typeof description === "string" ? t(description) : description}
        </Styled.Description>
      )}
      {isFunction(children)
        ? children({ uid })
        : React.cloneElement(children, { id: uid })}
      {description && !descriptionTop && (
        <Styled.Description>
          {typeof description === "string" ? t(description) : description}
        </Styled.Description>
      )}
      <Errors
        name={name}
        errorPath={errorPath}
        label={label ? t(label) : undefined}
      />
    </Styled.Wrapper>
  );
};

interface Props<T extends FieldValues = FieldValues> extends Pick<
  InputProps<T>,
  "name" | "description" | "label" | "hideLabel" | "required"
> {
  children: React.JSX.Element | (({ uid }: { uid: string }) => React.ReactNode);
  isWide?: boolean;
  labelProps?: typeof HTMLLabelElement;
  role?: string;
  descriptionTop?: boolean;
  errorPath?: string;
}

export default BaseInputWrapper;
