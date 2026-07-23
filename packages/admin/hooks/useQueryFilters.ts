import { useRouter } from "next/router";

type FilterValue = string | string[] | Record<string, string>;

export default function useQueryFilters<
  T extends Record<string, FilterValue> = Record<string, FilterValue>,
>() {
  const { pathname, query, push } = useRouter();

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- JSON.parse returns any; caller narrows via generic
  const filters = (query.filters ? JSON.parse(String(query.filters)) : {}) as T;

  const updateFilters = (next: Partial<T>) => {
    const hasFilters = Object.keys(next).length > 0;

    push(
      {
        pathname,
        query: {
          ...query,
          filters: hasFilters ? JSON.stringify(next) : null,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  /** Delete an entire key from filters */
  const removeFilter = (key: keyof T & string) => {
    const next: Record<string, FilterValue> = { ...filters };
    delete next[key];
    updateFilters(next as Partial<T>);
  };

  /** Remove a single value from an array filter key; deletes the key when empty */
  const removeArrayFilter = (key: keyof T & string, value: string) => {
    const next: Record<string, FilterValue> = { ...filters };
    const arr = (next[key] as string[])?.filter((v) => v !== value);
    if (arr?.length) {
      next[key] = arr;
    } else {
      delete next[key];
    }
    updateFilters(next as Partial<T>);
  };

  return { filters, updateFilters, removeFilter, removeArrayFilter };
}
