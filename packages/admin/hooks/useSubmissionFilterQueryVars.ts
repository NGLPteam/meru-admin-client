import { useRouter } from "next/router";
import get from "lodash/get";
import type {
  SubmissionFilterInput,
  SubmissionOrder,
  SubmissionState,
} from "types/graphql-schema";

interface Props {
  baseFilters?: SubmissionFilterInput;
  defaultOrder?: SubmissionOrder;
}

export default function useSubmissionFilterQueryVars({
  baseFilters,
  defaultOrder = "RECENT",
}: Props = {}): {
  page: number;
  order: SubmissionOrder;
  filters: SubmissionFilterInput | undefined;
} {
  const router = useRouter();
  const page = parseInt(get(router, "query.page", 1) as string);
  const order = (get(router, "query.order") || defaultOrder) as SubmissionOrder;

  const userFilters: SubmissionFilterInput | undefined = (() => {
    if (!router.query.filters) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userName, ...rest } = JSON.parse(String(router.query.filters));
    return Object.keys(rest).length > 0 ? rest : undefined;
  })();

  const q = String(router.query.q ?? "").trim();

  let filters: SubmissionFilterInput | undefined;

  if (userFilters?.inState && baseFilters?.inState) {
    // Intersect user-selected states with the allowed base states
    const allowed = new Set<SubmissionState>(baseFilters.inState);
    const intersected = userFilters.inState.filter((s) => allowed.has(s));
    filters = {
      ...baseFilters,
      ...userFilters,
      inState: intersected.length > 0 ? intersected : baseFilters.inState,
    };
  } else if (userFilters) {
    filters = { ...baseFilters, ...userFilters };
  } else {
    filters = baseFilters;
  }

  if (q) {
    filters = { ...(filters ?? {}), query: q };
  }

  return { page, order, filters };
}
