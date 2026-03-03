import styled from "styled-components";
import { tLabel } from "theme/mixins/typography";

export const Total = styled.p`
  ${tLabel("sm")}
  font-size: 13px;
  color: var(--color);
  display: flex;
  gap: 12px;

  strong,
  b {
    font-weight: inherit;
    color: var(--strong-color);
  }
`;

export const Highlighted = styled.span`
  color: var(--strong-color);
`;

export const Select = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  background: transparent;
  color: inherit;
  padding: 0;
  ${tLabel("sm")}
  font-size: 13px;
  color: var(--highlight-color);

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }
`;

export const All = styled.div`
  padding-inline: 24px;
  padding-block: 8px;
  background: var(--color-base-neutral80);
  color: var(--color-neutral-text-extra-dark);
  margin-top: 8px;
  margin-block-end: -16px;

  > span {
    ${tLabel("sm")}
    font-size: 13px;
    color: var(--strong-color);
    margin-inline-end: 12px;
    display: inline-block;

    &::before {
      content: "";
      display: inline-block;
      height: 8px;
      width: 16px;
      border-bottom-left-radius: 4px;
      border-left: 1px solid var(--strong-color);
      border-bottom: 1px solid var(--strong-color);
      color: var(--color-neutral-ui-light);
      margin-inline-end: 12px;
    }
  }
`;
