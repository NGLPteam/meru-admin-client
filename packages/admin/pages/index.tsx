import { PreloadedQuery } from "react-relay";
import { QueryLoaderWrapper } from "@wdp/lib/api/components";
import {
  useBaseListQueryVars,
  useIsAuthenticated,
  useSearchQueryVars,
} from "hooks";
import { useViewerContext } from "contexts";
import { DashboardLayout } from "components/composed/dashboard";
import { LoadingPage } from "components/atomic";
import HtmlHead from "components/global/HtmlHead";
import { DashboardLayoutQuery } from "__generated__/DashboardLayoutQuery.graphql";
import { query } from "components/composed/dashboard/DashboardLayout/DashboardLayout";

type Props = {
  initialQueryRef?: PreloadedQuery<DashboardLayoutQuery>;
};

export default function HomePage({ initialQueryRef }: Props) {
  const queryVars = useBaseListQueryVars();
  const searchQueryVars = useSearchQueryVars();
  const isAuth = useIsAuthenticated();
  const { id: viewerId } = useViewerContext();

  return (
    <>
      <HtmlHead />
      {isAuth ? (
        <>
          <QueryLoaderWrapper<DashboardLayoutQuery>
            query={query}
            variables={{
              ...queryVars,
              ...searchQueryVars,
              viewerId: viewerId ?? "",
            }}
            initialQueryRef={initialQueryRef}
            loadingFallback={<LoadingPage />}
          >
            {({ queryRef }) =>
              queryRef && <DashboardLayout queryRef={queryRef} />
            }
          </QueryLoaderWrapper>
        </>
      ) : null}
    </>
  );
}
