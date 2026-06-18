import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import type {
  HarvestAttemptsListFragment$data,
  HarvestAttemptsListFragment$key,
} from "@/relay/HarvestAttemptsListFragment.graphql";
import { getDateDisplay } from "./helpers";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

type Props = Pick<HeaderProps, "headerStyle" | "hideHeader"> & {
  data?: HarvestAttemptsListFragment$key;
  backTo?: string;
};

export type HarvestAttemptNode =
  HarvestAttemptsListFragment$data["nodes"][number];

function HarvestAttemptsList({ data, headerStyle, hideHeader, backTo }: Props) {
  const harvestAttempts = useFragment<HarvestAttemptsListFragment$key>(
    fragment,
    data,
  );

  const { t } = useTranslation();

  const columns = [
    ModelColumns.NameColumn<HarvestAttemptNode>({
      accessorFn: (row) => getDateDisplay(row),
      header: () => t("lists.began_at_column"),
      enableSorting: false,
      route: "harvestAttempt",
      query: backTo ? { backTo } : undefined,
    }),
    ModelColumns.StringColumn<HarvestAttemptNode>({
      id: "currentState",
      header: () => t("lists.status_column"),
    }),
    ModelColumns.StringColumn<HarvestAttemptNode>({
      id: "mode",
      header: () => t("harvesting.mode"),
    }),
    ModelColumns.StringColumn<HarvestAttemptNode>({
      id: "harvestSet.identifier",
      header: () => t("glossary.harvest_set"),
    }),
    ModelColumns.StringColumn<HarvestAttemptNode>({
      id: "harvestRecords.pageInfo.totalCount",
      header: () => t("lists.record_count_column"),
    }),
  ];

  return (
    <ModelListPage<HarvestAttemptsListFragment$data, HarvestAttemptNode>
      modelName="harvest_attempt"
      columns={columns}
      data={harvestAttempts}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
    />
  );
}

export const fragment = graphql`
  fragment HarvestAttemptsListFragment on HarvestAttemptConnection {
    nodes {
      id
      slug
      beganAt
      endedAt
      scheduledAt
      createdAt
      mode
      currentState
      harvestSource {
        name
      }
      harvestSet {
        identifier
      }
      harvestRecords {
        pageInfo {
          totalCount
        }
      }
    }
    ...ModelListPageFragment
  }
`;

export default HarvestAttemptsList;
