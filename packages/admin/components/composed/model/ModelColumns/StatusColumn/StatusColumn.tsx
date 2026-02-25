import get from "lodash/get";
import styled from "styled-components";
import { StatusBadge } from "components/atomic";
import { PartialColumnish, Node } from "../types";
import type { ColumnDef } from "@tanstack/react-table";

const ListBadge = styled(StatusBadge)`
  min-width: 160px;
`;

type Props<T extends Node> = PartialColumnish<T> & {
  header: () => string | React.ReactNode;
};

const StatusColumn = <T extends Node>({
  header,
  ...props
}: Props<T>): ColumnDef<T> => {
  return {
    header,
    id: "status",
    accessorFn: (originalRow: T) => get(originalRow, "status"),
    enableSorting: false,
    cell: (info) => {
      const value = info.getValue<string>();
      return <ListBadge status={value} />;
    },
    ...props,
  };
};

export default StatusColumn;
