/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/named */
import { ColumnDef, Row, RowData } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  export interface ModelTableActionProps<
    D extends Record<string, unknown> = Record<string, unknown>,
  > {
    row: Row<D>;
  }

  export interface ModelTableActionOptions<
    D extends Record<string, unknown> = Record<string, unknown>,
  > {
    handleClick: (props: ModelTableActionProps<D>) => void;
  }

  export interface ModelTableActions<
    D extends Record<string, unknown> = Record<string, unknown>,
  > {
    download?: ModelTableActionOptions<D>;
    edit?: ModelTableActionOptions<D>;
    delete?: ModelTableActionOptions<D>;
  }

  export interface TableOptions<D extends Record<string, unknown>> {
    data: ReadonlyArray<D> | Array<D>;
  }

  interface TableMeta<TData extends RowData> {
    actions?: ModelTableActions<TData>;
    grid?: boolean;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    cellType?: "thumbnail" | "name" | "actions" | string;
    filter?: React.ReactNode;
  }
}
