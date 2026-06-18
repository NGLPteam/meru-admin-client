import {
  ContributorOrder,
  ContributionOrder,
  UserOrder,
  EntityOrder,
  SubmissionOrder,
} from "types/graphql-schema";

export type Orders =
  | EntityOrder
  | ContributorOrder
  | ContributionOrder
  | UserOrder
  | SubmissionOrder;

type OrderableProperties =
  | "createdAt"
  | "name"
  | "title"
  | "targetTitle"
  | "email"
  | "affiliation"
  | "contributions"
  | "globalAdmin"
  | "schema"
  | "published"
  | "position";

interface OrderConfig {
  id: OrderableProperties;
  desc?: boolean;
}

type MapSortBy = {
  (id: string, desc?: boolean): Orders | null;
};

export const mapSortBy: MapSortBy = (id, desc) => {
  switch (id) {
    case "createdAt":
      return desc ? "RECENT" : "OLDEST";

    case "name":
      return desc ? "NAME_DESCENDING" : "NAME_ASCENDING";

    case "title":
      return desc ? "TITLE_DESCENDING" : "TITLE_ASCENDING";

    case "targetTitle":
      return desc ? "TARGET_TITLE_DESCENDING" : "TARGET_TITLE_ASCENDING";

    case "email":
      return desc ? "EMAIL_DESCENDING" : "EMAIL_ASCENDING";

    case "affiliation":
      return desc ? "AFFILIATION_DESCENDING" : "AFFILIATION_ASCENDING";

    case "contributions":
      return desc ? "MOST_CONTRIBUTIONS" : "LEAST_CONTRIBUTIONS";

    case "globalAdmin":
      return desc ? "ADMINS_OLDEST" : "ADMINS_RECENT";

    case "schema":
      return desc ? "SCHEMA_NAME_DESCENDING" : "SCHEMA_NAME_ASCENDING";

    case "published":
      return desc ? "PUBLISHED_DESCENDING" : "PUBLISHED_ASCENDING";

    case "position":
      return desc ? "POSITION_DESCENDING" : "POSITION_ASCENDING";

    default:
      return null;
  }
};

type ReverseMapSortBy = {
  (orders: Orders): OrderConfig | null;
};

export const reverseMapSortBy: ReverseMapSortBy = (order) => {
  switch (order) {
    case "RECENT":
    case "OLDEST":
      return { id: "createdAt", desc: order === "RECENT" };

    case "NAME_DESCENDING":
    case "NAME_ASCENDING":
      return { id: "name", desc: order === "NAME_DESCENDING" };

    case "TITLE_DESCENDING":
    case "TITLE_ASCENDING":
      return { id: "title", desc: order === "TITLE_DESCENDING" };

    case "TARGET_TITLE_DESCENDING":
    case "TARGET_TITLE_ASCENDING":
      return { id: "targetTitle", desc: order === "TARGET_TITLE_DESCENDING" };

    case "EMAIL_DESCENDING":
    case "EMAIL_ASCENDING":
      return { id: "email", desc: order === "EMAIL_DESCENDING" };

    case "AFFILIATION_DESCENDING":
    case "AFFILIATION_ASCENDING":
      return { id: "affiliation", desc: order === "AFFILIATION_DESCENDING" };

    case "MOST_CONTRIBUTIONS":
    case "LEAST_CONTRIBUTIONS":
      return { id: "contributions", desc: order === "MOST_CONTRIBUTIONS" };

    case "ADMINS_RECENT":
      return { id: "globalAdmin", desc: false };

    case "SCHEMA_NAME_DESCENDING":
    case "SCHEMA_NAME_ASCENDING":
      return { id: "schema", desc: order === "SCHEMA_NAME_DESCENDING" };

    case "PUBLISHED_DESCENDING":
    case "PUBLISHED_ASCENDING":
      return { id: "published", desc: order === "PUBLISHED_DESCENDING" };

    case "POSITION_DESCENDING":
    case "POSITION_ASCENDING":
      return { id: "position", desc: order === "POSITION_DESCENDING" };

    default:
      return null;
  }
};
