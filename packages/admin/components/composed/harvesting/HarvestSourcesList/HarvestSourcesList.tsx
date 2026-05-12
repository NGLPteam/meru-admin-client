import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDestroyer } from "hooks";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { ButtonControlGroup, ButtonControlRoute } from "components/atomic";
import type {
  HarvestSourcesListFragment$data,
  HarvestSourcesListFragment$key,
} from "@/relay/HarvestSourcesListFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

type Props = Pick<HeaderProps, "headerStyle" | "hideHeader"> & {
  data?: HarvestSourcesListFragment$key;
};

type HarvestSourceNode =
  HarvestSourcesListFragment$data["harvestSources"]["nodes"][number];

function HarvestSourcesList({ data, headerStyle, hideHeader }: Props) {
  const { harvestSources } =
    useFragment<HarvestSourcesListFragment$key>(fragment, data) ?? {};

  const { t } = useTranslation();
  const destroy = useDestroyer();

  const columns = [
    ModelColumns.NameColumn<HarvestSourceNode>({
      accessor: "name",
      enableSorting: false,
      route: "harvestSource",
    }),
    ModelColumns.StringColumn<HarvestSourceNode>({
      id: "harvestSets.pageInfo.totalCount",
      header: () => t("glossary.harvest_set_other_truncated"),
    }),
    ModelColumns.StringColumn<HarvestSourceNode>({
      id: "harvestRecords.pageInfo.totalCount",
      header: () => t("glossary.harvest_record_other_truncated"),
    }),
    ModelColumns.StringColumn<HarvestSourceNode>({
      id: "metadataFormat",
      header: () => t("glossary.metadata"),
    }),
    ModelColumns.StringColumn<HarvestSourceNode>({
      id: "baseURL",
      header: () => t("forms.fields.url"),
      meta: { cellType: "url" },
    }),
  ];

  const actions = {
    handleDelete: ({ row }: ModelTableActionProps<HarvestSourceNode>) => {
      destroy.harvestSource(
        { harvestSourceId: row.original.id || "" },
        row.original.name,
      );
    },
  };

  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <ButtonControlRoute route="harvestSource.new" icon="plus">
        {t("actions.add.harvest_source")}
      </ButtonControlRoute>
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<
      HarvestSourcesListFragment$data["harvestSources"],
      HarvestSourceNode
    >
      modelName="harvest_source"
      columns={columns}
      buttons={buttons}
      data={harvestSources}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      actions={actions}
    />
  );
}

const fragment = graphql`
  fragment HarvestSourcesListFragment on Query {
    harvestSources(order: DEFAULT, page: $page, perPage: 20) {
      nodes {
        id
        name
        identifier
        slug
        metadataFormat
        baseURL
        harvestSets {
          pageInfo {
            totalCount
          }
        }
        harvestRecords {
          pageInfo {
            totalCount
          }
        }
        description
      }
      ...ModelListPageFragment
    }
  }
`;

export default HarvestSourcesList;
