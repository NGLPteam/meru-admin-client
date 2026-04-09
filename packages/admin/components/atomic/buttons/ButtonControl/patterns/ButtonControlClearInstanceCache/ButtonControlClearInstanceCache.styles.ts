import styled from "styled-components";
import Dialog from "components/layout/Dialog";
import { respond, fluidScale } from "theme/mixins/base";
import { pxToRem } from "theme/mixins/functions";

export const Content = styled(Dialog.Content)`
  --fieldset-bg-color: var(--neutral10);
  --dialog-content-padding: ${fluidScale("24px", "12px")};

  inline-size: ${pxToRem(697)};
  block-size: max-content;
  text-align: left;

  ${respond(`inline-size: 100%;`, 50)}
`;

export const Message = styled.p`
  padding-block-start: ${pxToRem(24)};
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-inline: var(--dialog-content-padding);
  color: var(--accent-color);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding-block-start: ${pxToRem(24)};
  gap: 1rem;
`;
