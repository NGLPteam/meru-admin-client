import styled from "styled-components";

export const Badge = styled.span<{ $bg: string; $color: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--border-radius-xlg);
  font-size: var(--font-size-label-sm);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  text-align: center;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  align-self: center;
`;
