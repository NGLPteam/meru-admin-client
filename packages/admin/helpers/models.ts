const MODEL_MAP = {
  COMMUNITY: "communities",
  COLLECTION: "collections",
  ITEM: "items",
  USER: "users",
  CONTRIBUTOR: "contributors",
  COLLECTION_CONTRIBUTION: "collection contributions",
  ITEM_CONTRIBUTION: "item contributions",
  COLLECTION_CONTRIBUTOR: "collection contributor",
  ITEM_CONTRIBUTOR: "item contributor",
  LINK: "link",
  ORDERING: "ordering",
  FILE: "file",
  ROLE: "role",
  PAGE: "page",
  ANNOUNCEMENT: "announcement",
  HARVEST_SOURCE: "harvest source",
  HARVEST_SET: "harvest set",
  HARVEST_MAPPING: "harvest mapping",
  HARVEST_ATTEMPT: "harvest attempt",
  HARVEST_RECORD: "harvest record",
  HARVEST_ENTITY: "harvest entity",
  HARVEST_MESSAGE: "harvest message",
  METADATA_MAPPING: "metadata_mapping",
  MEMBER: "member",
  ACCESS: "access",
  PERMALINK: "permalink",
  SUBMISSION: "submissions",
};

export type ModelNames = keyof typeof MODEL_MAP;

export function getModelPlural(name: Lowercase<ModelNames>): string | null {
  const key = <Uppercase<ModelNames>>name.toUpperCase();
  if (!Object.keys(MODEL_MAP).includes(key)) return null;
  return MODEL_MAP[key];
}
