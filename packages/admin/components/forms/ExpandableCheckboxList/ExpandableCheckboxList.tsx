import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useController } from "react-hook-form";
import { Checkbox, CheckboxGroup } from "components/forms";
import { ButtonControl } from "components/atomic";
import * as Styled from "./ExpandableCheckboxList.styles";

export interface CheckboxOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  groupLabel: string;
  options: CheckboxOption[];
  control: Parameters<typeof useController>[0]["control"];
  initialVisible?: number;
}

export default function ExpandableCheckboxList({
  name,
  groupLabel,
  options,
  control,
  initialVisible = 6,
}: Props) {
  const { t } = useTranslation();
  const { field } = useController({ control, name });
  const [expanded, setExpanded] = useState(false);

  const visible = options.slice(0, initialVisible);
  const overflow = options.slice(initialVisible);

  const renderCheckboxes = (items: CheckboxOption[]) =>
    items.map((item) => (
      <Checkbox
        key={item.value}
        onChange={(e) => {
          let valueCopy = field?.value ? [...field.value] : [];
          const { checked, value } = e.target;
          if (checked && !valueCopy.includes(value)) {
            valueCopy.push(value);
          } else {
            valueCopy = valueCopy.filter((v: string) => v !== value);
          }
          field.onChange(valueCopy);
        }}
        checked={field.value?.includes(item.value)}
        value={item.value}
      >
        {item.label}
      </Checkbox>
    ));

  if (!options?.length) return null;

  return (
    <CheckboxGroup name={name} label={groupLabel} hideLabel>
      <>
        <Styled.ColumnWrapper $oneCol={visible.length < 4}>
          {renderCheckboxes(visible)}
        </Styled.ColumnWrapper>
        {expanded && (
          <Styled.ColumnWrapper>
            {renderCheckboxes(overflow)}
          </Styled.ColumnWrapper>
        )}
        {!!overflow.length && (
          <ButtonControl
            icon="chevron"
            iconRotate={expanded ? 0 : 180}
            onClick={(e) => {
              e.preventDefault();
              setExpanded(!expanded);
            }}
          >
            {expanded ? t("search.show_less") : t("search.show_all_schemas")}
          </ButtonControl>
        )}
      </>
    </CheckboxGroup>
  );
}
