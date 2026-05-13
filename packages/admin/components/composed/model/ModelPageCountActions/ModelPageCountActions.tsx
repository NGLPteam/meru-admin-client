import { graphql } from "react-relay";
import { PageCountActions } from "components/layout";
import { useMaybeFragment } from "hooks";
import { ModelPageCountActionsFragment$key } from "@/relay/ModelPageCountActionsFragment.graphql";

interface ModelPageCountActionsProps<
  T extends ModelPageCountActionsFragment$key,
> {
  data?: T | null;
  actions?: React.JSX.Element;
  selectedCount?: number;
}

function ModelPageCountActions<T extends ModelPageCountActionsFragment$key>({
  data,
  actions,
  selectedCount,
}: ModelPageCountActionsProps<T>) {
  const enhancedData = useMaybeFragment<ModelPageCountActionsFragment$key>(
    fragment,
    data,
  );

  return (
    <PageCountActions
      loading={typeof enhancedData?.pageInfo.totalCount !== "number"}
      pageInfo={enhancedData?.pageInfo}
      actions={actions}
      selectedCount={selectedCount}
    />
  );
}

export default ModelPageCountActions;

const fragment = graphql`
  fragment ModelPageCountActionsFragment on Paginated {
    pageInfo {
      page
      pageCount
      perPage
      hasNextPage
      hasPreviousPage
      totalCount
      # This vaulue is currently not used
      # totalUnfilteredCount
    }
  }
`;
