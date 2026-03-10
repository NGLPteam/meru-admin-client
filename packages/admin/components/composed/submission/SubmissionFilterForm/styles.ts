import styled from "styled-components";
import { pxToRem } from "theme/mixins/functions";

export const Wrapper = styled.div`
  --form-grid-padding-bottom: ${pxToRem(30)};
`;

export const FilterGroup = styled.fieldset`
  flex-basis: var(--form-grid-item-width-wide);
  padding-block-start: 0;

  &:last-of-type {
    padding-block-end: ${pxToRem(48)};
    border-bottom: 1px solid var(--neutral40);
  }
`;

export const GroupLabel = styled.div`
  color: var(--brand100);
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-block-start: ${pxToRem(24)};

  > * + * {
    margin-block-start: ${pxToRem(24)};
  }
`;

export const DateRangeRow = styled.div`
  display: flex;
  gap: ${pxToRem(24)};

  > * {
    flex: 1;
  }
`;

export const TwoColumnCheckboxes = styled.div`
  columns: 2;

  > * + * {
    margin-top: ${pxToRem(16)};
  }
`;
