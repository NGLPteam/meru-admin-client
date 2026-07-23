import React, { Ref, forwardRef } from "react";
import BaseInputWrapper from "../BaseInputWrapper";
import * as Styled from "./Textarea.styles";
import type InputProps from "../inputType";

type Props = InputProps & {
  minHeight?: number;
};

const Textarea = forwardRef(
  (
    {
      label,
      name,
      hideLabel,
      description,
      placeholder,
      isWide,
      minHeight,
      ...textareaProps
    }: Props,
    ref: Ref<HTMLTextAreaElement>,
  ) => {
    return (
      <BaseInputWrapper
        name={name}
        hideLabel={hideLabel}
        label={label}
        description={description}
        required={textareaProps.required}
        isWide={isWide}
      >
        <Styled.TextareaInput
          name={name}
          ref={ref}
          $height={minHeight}
          placeholder={placeholder}
          {...textareaProps}
        />
      </BaseInputWrapper>
    );
  },
);

export default Textarea;
