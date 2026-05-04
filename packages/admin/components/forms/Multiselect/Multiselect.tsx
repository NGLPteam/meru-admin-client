import { Ref, forwardRef, useState, useEffect, useCallback } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DragUpdate,
} from "react-beautiful-dnd";
import { useCombobox, useMultipleSelection } from "downshift";
import { useTranslation } from "react-i18next";
import BaseInputWrapper from "../BaseInputWrapper";
import BaseArrayList, { BaseArrayListItem } from "../BaseArrayList";
import HiddenMultiselect from "./HiddenMultiselect";
import * as Styled from "./Multiselect.styles";
import type InputProps from "../inputType";
import type { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

// Redecalare forwardRef
declare module "react" {
  function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

/**
 * A typeahead multi select.
 * Uses `downshift` library for accessibility and state management
 */
function Multiselect<T extends Record<string, unknown>>(
  {
    label,
    name,
    hideLabel,
    options,
    required,
    onChange,
    value,
    isWide,
    dragDropOrder,
    placeholder = "forms.fields.typeahead_placeholder",
    disabled,
    description,
    ...inputProps
  }: Props<T>,
  ref: Ref<HTMLSelectElement>,
) {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState("");

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    setSelectedItems,
  } = useMultipleSelection({
    initialSelectedItems: value || [],
  });

  // Pass the selected value back up to react-hook-forms' onChange
  useEffect(() => {
    if (onChange) onChange([...selectedItems]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]); // Only run on selectedItems change

  // Filter items by currently selected items
  const getFilteredOptions = () =>
    options.filter(
      (item) =>
        selectedItems.indexOf(item.value) < 0 &&
        item.label.toLowerCase().startsWith(inputValue.toLowerCase()),
    );

  // Return selected item objects for currently selected items list
  const getSelectedItemObjects = () => {
    const values: Option<T>[] = [];

    selectedItems.forEach((value) => {
      const item = options.find((o) => o.value === value);
      if (item) values.push(item);
    });

    return values;
  };

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    inputValue,
    items: getFilteredOptions(),
    itemToString: (item) => (item ? item.label : ""),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || "");
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue("");
            addSelectedItem(selectedItem.value);
          }
          break;
        default:
          break;
      }
    },
  });

  const onDragEnd = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      const newValue = [...selectedItems];
      const sourceItem = newValue.splice(sourceIndex, 1)[0];

      newValue.splice(destinationIndex, 0, sourceItem);

      setSelectedItems(newValue);
    },
    [selectedItems, setSelectedItems],
  );

  const handleDragEnd = useCallback(
    ({ destination, source }: DragUpdate) => {
      if (!destination || !source || destination.index === source.index) return;
      onDragEnd(source.index, destination.index);
    },
    [onDragEnd],
  );

  const renderSelectedItem = ({
    selectedItem,
    i,
    ...props
  }: {
    selectedItem: Option<T>;
    i: number;
    ref?: Ref<HTMLLIElement>;
    isDragging?: boolean;
    draggableStyles?: DraggingStyle | NotDraggingStyle | undefined;
  }) => {
    return (
      <BaseArrayListItem
        key={`selected-item-${i}`}
        {...getSelectedItemProps({
          selectedItem: selectedItem.value,
          index: i,
        })}
        onRemove={() => {
          removeSelectedItem(selectedItem.value);
        }}
        {...props}
      >
        {selectedItem.node || selectedItem.label}
      </BaseArrayListItem>
    );
  };

  return (
    <BaseInputWrapper
      name={name}
      hideLabel={hideLabel}
      label={label}
      labelProps={getLabelProps()}
      required={required}
      isWide={isWide}
      description={description}
    >
      <>
        <Styled.InputWrapper>
          {/* Hidden input field for react-hook-form or other form control */}
          <HiddenMultiselect<T>
            ref={ref}
            name={name}
            defaultValue={selectedItems}
            options={options}
            {...inputProps}
          />
          {/* Visible input field for typeahead functionality */}
          <Styled.Input
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            required={required}
            placeholder={t(placeholder)}
            disabled={disabled}
          />
          <Styled.Button
            type="button"
            {...getToggleButtonProps()}
            aria-label="toggle menu"
            disabled={disabled}
          >
            <Styled.Icon icon="chevron" rotate={180} />
          </Styled.Button>
          <Styled.List {...getMenuProps()} open={isOpen}>
            {getFilteredOptions().map((item, index) => (
              /* eslint-disable react/jsx-key */
              <Styled.ListItem
                {...getItemProps({ key: `item${index}`, index, item })}
              >
                {item.node || item.label}
              </Styled.ListItem>
            ))}
          </Styled.List>
        </Styled.InputWrapper>
        {selectedItems &&
          (dragDropOrder ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <BaseArrayList
                    column
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    {...provided.droppableProps}
                  >
                    {getSelectedItemObjects().map((selectedItem, i) => (
                      <Draggable
                        key={`selected-item-${i}`}
                        draggableId={`selected-item-${i}`}
                        index={i}
                      >
                        {(provided, snapshot) =>
                          renderSelectedItem({
                            selectedItem,
                            i,
                            ref: provided.innerRef,
                            isDragging: snapshot.isDragging,
                            draggableStyles: provided.draggableProps.style,
                            ...provided.draggableProps,
                            ...provided.dragHandleProps,
                          })
                        }
                      </Draggable>
                    ))}
                  </BaseArrayList>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <BaseArrayList>
              {getSelectedItemObjects().map((selectedItem, i) =>
                renderSelectedItem({ selectedItem, i }),
              )}
            </BaseArrayList>
          ))}
      </>
    </BaseInputWrapper>
  );
}

type Value<T> = string | T;

interface Option<T> {
  label: string;
  node?: React.ReactNode;
  value: Value<T>;
}
interface Props<T> extends Omit<InputProps, "onChange"> {
  options: Option<T>[];
  /** Returns the current selected value */
  onChange?: (value: Option<T>["value"][]) => void;
  /** Default value */
  value?: Option<T>["value"][];
  /** Allow drag & drop reordering */
  dragDropOrder?: true;
}

export default forwardRef(Multiselect);
