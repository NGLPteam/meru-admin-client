import BaseMarkdown from "components/atomic/Markdown/BaseMarkdown";
import type { SchemaFieldsDisplayFragment$data } from "@/relay/SchemaFieldsDisplayFragment.graphql";

export type SchemaProperty =
  SchemaFieldsDisplayFragment$data["schemaProperties"][number];

export type ScalarProp = {
  fullPath: string;
  label: string;
  type: string;
  isWide?: boolean;
};

export function isScalarProp(
  prop: SchemaProperty,
): prop is SchemaProperty & ScalarProp {
  return (
    prop.__typename !== "GroupProperty" &&
    !!prop.fullPath &&
    !!prop.label &&
    !!prop.type
  );
}

export type Value =
  | { content?: string }
  | { href?: string; label?: string }
  | string
  | string[]
  | boolean
  | null
  | undefined;

export function formatSchemaValue(value: Value, type: string): React.ReactNode {
  if (!value) return undefined;

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (type === "BOOLEAN") {
    return value ? "Yes" : "No";
  }

  if (type === "MARKDOWN" || type === "FULL_TEXT") {
    const content =
      typeof value === "object" && "content" in value
        ? value.content
        : String(value);
    return <BaseMarkdown>{content}</BaseMarkdown>;
  }

  if (type === "URL" && typeof value === "object" && "href" in value) {
    if (!value.href) return undefined;
    return <a href={value.href}>{value.label}</a>;
  }

  return String(value);
}
