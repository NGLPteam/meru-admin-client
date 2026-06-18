import { useState, useId } from "react";
import IconFactory from "components/factories/IconFactory";
import * as Styled from "./SearchableFilterList.styles";

import type {
  unstable_ComboboxListProps,
  unstable_ComboboxOptionHTMLProps,
  unstable_ComboboxHTMLProps,
  unstable_ComboboxListHTMLProps,
} from "reakit";

export interface SelectOption {
  value: string;
  label: string;
  render: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  selected: string[];
  onToggle: (value: string) => void;
  placeholder: string;
  label: string;
}

export interface TypeaheadOption {
  value: string;
  render: React.ReactNode;
  props: unstable_ComboboxOptionHTMLProps;
}

interface TypeaheadProps {
  selected: string[];
  options: TypeaheadOption[];
  label: string;
  listProps: unstable_ComboboxListProps;
  inputProps: unstable_ComboboxHTMLProps;
  labelProps: unstable_ComboboxListHTMLProps;
}

type Props = SelectProps | TypeaheadProps;

export default function FilterList({ selected, label, ...props }: Props) {
  const [search, setSearch] = useState("");

  const inputId = useId();

  const inputProps =
    "inputProps" in props
      ? props.inputProps
      : {
          id: inputId,
          type: "text",
          placeholder: props.placeholder,
          value: search,
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
            setSearch(e.target.value),
        };

  const listProps = "listProps" in props ? props.listProps : {};

  const visibleOpts =
    "listProps" in props
      ? props.options
      : props.options.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase()),
        );

  const getOptProps = (o: SelectOption | TypeaheadOption) =>
    "props" in o
      ? o.props
      : {
          onClick:
            "onToggle" in props ? () => props.onToggle(o.value) : undefined,
        };

  const labelProps =
    "labelProps" in props ? props.labelProps : { htmlFor: inputId };

  return (
    <Styled.Wrapper>
      <label className="a-hidden" {...labelProps}>
        {label}
      </label>
      <Styled.SearchInput {...inputProps} />
      <Styled.OptionList {...listProps}>
        {visibleOpts.map((o) => (
          <Styled.Option key={o.value} {...getOptProps(o)}>
            <Styled.CheckMark $visible={selected?.includes(o.value)}>
              <IconFactory icon="check" />
            </Styled.CheckMark>
            {o.render}
          </Styled.Option>
        ))}
      </Styled.OptionList>
    </Styled.Wrapper>
  );
}
