import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import { ButtonControlGroup, ButtonControlRoute } from "components/atomic";
import type {
  SubmissionListFragment$data,
  SubmissionListFragment$key,
} from "@/relay/SubmissionListFragment.graphql";
import { MOCK_SUBMISSIONS, type SubmissionNode } from "./mockData";
import type { ModelTableActionProps } from "@tanstack/react-table";

type Props = {
  data?: SubmissionListFragment$key;
  header?: string;
};

function SubmissionList({ data, header }: Props) {
  const connection = useFragment<SubmissionListFragment$key>(fragment, data);

  const { t } = useTranslation();

  /* Replace real nodes with mock data while preserving pagination fragment refs */
  const dataWithMockNodes = connection
    ? ({
        ...connection,
        nodes: MOCK_SUBMISSIONS,
      } as SubmissionListFragment$data)
    : undefined;

  const columns = [
    ModelColumns.NameColumn<SubmissionNode>({
      accessor: "title",
      enableSorting: false,
    }),
    ModelColumns.StringColumn<SubmissionNode>({
      id: "status",
      header: () => t("lists.status_column"),
    }),
    ModelColumns.StringColumn<SubmissionNode>({
      id: "collection",
      header: () => t("lists.collection_column"),
    }),
    ModelColumns.UpdatedAtColumn<SubmissionNode>({
      enableSorting: false,
    }),
  ];

  const actions = {
    handleView: ({ row }: ModelTableActionProps<SubmissionNode>) =>
      row.original.slug ? `/items/${row.original.slug}` : null,
  };

  const buttons = (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      <ButtonControlRoute route="my-submissions.new" icon="plus">
        {t("actions.add.submission")}
      </ButtonControlRoute>
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<SubmissionListFragment$data, SubmissionNode>
      modelName="submission"
      header={header ? t(`nav.${header}_submissions`) : undefined}
      columns={columns}
      data={dataWithMockNodes}
      actions={actions}
      buttons={buttons}
      showSearch
      hideFilters
      disableSortBy
    />
  );
}

const fragment = graphql`
  fragment SubmissionListFragment on ItemConnection {
    nodes {
      id
      slug
    }
    ...ModelListPageFragment
  }
`;

export default SubmissionList;
