import React, { useEffect } from "react";
import { flexRender } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Checkbox } from "components/forms";
import TableHeaderRow from "./TableHeaderRow";
import * as Styled from "./Table.styles";
import TableSortIcon from "./TableSortIcon";
import HeaderFilterPopover from "./filters/HeaderFilterPopover";
import useTableContext from "./hooks/useTableContext";
import type { CoreHeaderGroup } from "@tanstack/react-table";

function TableHeader<T extends Record<string, unknown>>({
  headerGroups = [],
  selectable,
  someRowsSelected,
  allRowsSelected,
  toggleAllRowsSelectedHandler,
}: Props<T>) {
  /* eslint-disable react/jsx-key */
  /* keys are injected using the get props functions */
  const { setColumnCount } = useTableContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (headerGroups.length > 0 && setColumnCount) {
      const { headers } = headerGroups[0];
      const columnCount = headers.length;
      setColumnCount(columnCount);
    }
  }, [headerGroups, setColumnCount]);

  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        return (
          <TableHeaderRow key={headerGroup.id}>
            {selectable ? (
              <Styled.HeaderCell role="columnheader">
                <Styled.SelectCellInner>
                  <Checkbox
                    aria-label={t("actions.select_all")}
                    {...{
                      checked: allRowsSelected,
                      indeterminate: someRowsSelected,
                      onChange: toggleAllRowsSelectedHandler,
                    }}
                  />
                </Styled.SelectCellInner>
              </Styled.HeaderCell>
            ) : (
              <Styled.HeaderCell role="presentation" />
            )}

            {headerGroup.headers.map((header) => {
              return (
                <Styled.HeaderCell
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <Styled.HeaderCellInner>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort() && (
                      <TableSortIcon
                        desc={header.column.getIsSorted() === "desc"}
                        isSorted={!!header.column.getIsSorted()}
                      />
                    )}
                    {header.column.columnDef.meta?.filter && (
                      <HeaderFilterPopover label={header.column.id}>
                        {header.column.columnDef.meta.filter}
                      </HeaderFilterPopover>
                    )}
                  </Styled.HeaderCellInner>
                </Styled.HeaderCell>
              );
            })}
            <Styled.HeaderCell role="presentation" />
          </TableHeaderRow>
        );
      })}
    </thead>
  );
  /* eslint-enable react/jsx-key */
}

// type RequiredHeaderProps<T extends Record<string, unknown>> = Column<T>;
//  Pick<
//   Column<T>,
//   "getHeaderProps" | "render" | "canSort"
// >;

// type OptionalHeaderProps<T extends Record<string, unknown>> = Partial<
//   Pick<Column<T>, "getSortByToggleProps" | "isSorted" | "isSortedDesc">
// >;

// type PartialHeader<T extends Record<string, unknown>> = RequiredHeaderProps<T> &
//   OptionalHeaderProps<T>;

interface Props<T extends Record<string, unknown>> {
  headerGroups: CoreHeaderGroup<T>[];
  selectable?: boolean;
  someRowsSelected?: boolean;
  allRowsSelected?: boolean;
  toggleAllRowsSelectedHandler?: (event: unknown) => void;
}

export default TableHeader;
