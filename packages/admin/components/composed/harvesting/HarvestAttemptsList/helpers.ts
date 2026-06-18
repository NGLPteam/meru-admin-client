import { formatDate } from "@wdp/lib/helpers";
import type { HarvestAttemptNode } from "./HarvestAttemptsList";

export const getDateDisplay = (row: HarvestAttemptNode) => {
  switch (row.currentState) {
    case "SCHEDULED":
      return `Scheduled ${formatDate(row.scheduledAt ?? "")}`;
    case "EXTRACTED":
      return `Extracted ${formatDate(row.endedAt ?? "")}`;
    default:
      return row.beganAt
        ? `Started ${formatDate(row.beganAt)}`
        : `Created ${formatDate(row.createdAt)}`;
  }
};
