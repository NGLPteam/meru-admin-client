import React, { forwardRef, Ref, useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./Checkbox.styles";

function Checkbox(
  { children, description, label, indeterminate, ...props }: Props,
  ref: Ref<HTMLInputElement>,
) {
  const { t } = useTranslation();

  const combinedRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (node) {
        node.indeterminate = !!indeterminate;
      }
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref, indeterminate],
  );

  return (
    <div>
      <Styled.Label aria-label={props["aria-label"] || undefined}>
        <input
          className="a-hidden"
          type="checkbox"
          ref={combinedRef}
          {...props}
        />
        <Styled.Icon icon="checkbox" data-checked="false" role="presentation" />
        {children && (
          <Styled.LabelText className="t-copy-sm">{children}</Styled.LabelText>
        )}
        {label && (
          <Styled.LabelText className="t-copy-sm">
            {typeof label === "string" ? t(label) : label}
          </Styled.LabelText>
        )}
      </Styled.Label>
      {description && <Styled.Description>{t(description)}</Styled.Description>}
    </div>
  );
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.JSX.Element | string;
  label?: string | React.JSX.Element;
  indeterminate?: boolean;
  description?: string;
}

export default forwardRef(Checkbox);
