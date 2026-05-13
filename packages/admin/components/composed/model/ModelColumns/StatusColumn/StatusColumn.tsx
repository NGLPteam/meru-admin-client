import get from "lodash/get";
import styled from "styled-components";
import { StatusBadge } from "components/composed/submission/SubmissionList/StatusBadge";
import { PartialColumnish, Node } from "../types";
import type { SubmissionState } from "types/graphql-schema";
import type { ColumnDef } from "@tanstack/react-table";

const ListBadge = styled(StatusBadge)`
  min-width: min(160px, 100%);
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
      const value = info.getValue<SubmissionState>();
      return <ListBadge status={value} />;
    },
    ...props,
  };
};

export default StatusColumn;
