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

  const userFilters: SubmissionFilterInput | undefined = router.query.filters
    ? JSON.parse(String(router.query.filters))
    : undefined;

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

  return { page, order, filters };
}
