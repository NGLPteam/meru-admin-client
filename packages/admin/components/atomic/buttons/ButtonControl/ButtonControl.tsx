import React, { forwardRef } from "react";
import { IconFactory } from "components/factories";
import { Authorize } from "components/auth";
import * as Styled from "./ButtonControl.styles";
type IconFactoryProps = React.ComponentProps<typeof IconFactory>;
type AuthorizeProps = React.ComponentProps<typeof Authorize>;

const ButtonControl = forwardRef(
  (
    {
      children,
      iconRotate,
      iconChecked,
      iconLeft,
      actions,
      allowedActions,
      $closeDropdown,
      icon,
      size,
      onClick,
      ...props
    }: Props,
    ref,
  ) => {
    const handleClick = onClick
      ? $closeDropdown
        ? (e: React.MouseEvent) => {
            $closeDropdown();
            onClick(e);
          }
        : onClick
      : $closeDropdown;

    const iconEl = icon && (
      <IconFactory
        icon={icon}
        rotate={iconRotate}
        checked={iconChecked}
        role="presentation"
      />
    );

    const content = (
      <Styled.ButtonControl
        ref={ref}
        onClick={handleClick}
        $icon={icon}
        $size={size}
        {...props}
      >
        <>
          {iconLeft && iconEl}
          {children && (
            <Styled.ButtonText $size={size} $icon={icon} $iconLeft={iconLeft}>
              {children}
            </Styled.ButtonText>
          )}
          {!iconLeft && iconEl}
        </>
      </Styled.ButtonControl>
    );

    return actions ? (
      <Authorize actions={actions} allowedActions={allowedActions}>
        {content}
      </Authorize>
    ) : (
      content
    );
  },
);

interface Props extends Omit<AuthorizeProps, "children"> {
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: IconFactoryProps["icon"];
  iconRotate?: number;
  iconChecked?: boolean;
  iconLeft?: boolean;
  as?: React.ElementType;
  onClick?: React.MouseEventHandler;
  "aria-label"?: string;
  type?: "button" | "submit";
  size?: "large";
  $closeDropdown?: () => void;
  className?: string;
}

export default ButtonControl;
