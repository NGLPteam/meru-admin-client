import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import { ButtonControlConfirm } from "components/atomic";
import {
  useBulkActions,
  useBulkSelectionBridge,
} from "components/layout/Table/bulkActions";
import type {
  PublishListFragment$data,
  PublishListFragment$key,
} from "@/relay/PublishListFragment.graphql";
import {
  MOCK_SUBMISSIONS,
  type SubmissionNode,
} from "../SubmissionList/mockData";
import type { ModelTableActionProps } from "@tanstack/react-table";

type Props = {
  data?: PublishListFragment$key;
};

function PublishList({ data }: Props) {
  const connection = useFragment<PublishListFragment$key>(fragment, data);

  const { t } = useTranslation();

  const filteredSubmissions = MOCK_SUBMISSIONS.filter(
    (s) => s.status === "Approved",
  );

  const dataWithMockNodes = connection
    ? ({
        ...connection,
        nodes: filteredSubmissions,
      } as PublishListFragment$data)
    : undefined;

  // --- Bulk actions ---
  const records = filteredSubmissions;
  const filters = {};

  const { bulkSelection, addItem, removeItem, addPage } = useBulkActions(
    records,
    filters,
  );

  const { rowSelection, onRowSelectionChange } = useBulkSelectionBridge(
    records,
    bulkSelection,
    addItem,
    removeItem,
    addPage,
  );

  const allMatchingSelected = !!bulkSelection.filters;
  const selectedCount = allMatchingSelected
    ? filteredSubmissions.length
    : bulkSelection.ids.length;

  const handleBulkPublish = (hideDialog: () => void) => {
    // TODO: wire mutation — send bulkSelection.filters or bulkSelection.ids
    // eslint-disable-next-line no-console
    console.log("Bulk publish:", bulkSelection);
    hideDialog();
  };

  // --- Columns ---
  const columns = [
    ModelColumns.NameColumn<SubmissionNode>({
      accessor: "title",
      route: "submissions.detail",
      enableSorting: false,
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
      row.original.slug ? `/submissions/${row.original.slug}/details` : null,
    handlePublish: ({ row }: ModelTableActionProps<SubmissionNode>) => {
      // TODO: wire mutation for single publish
      // eslint-disable-next-line no-console
      console.log("Publish:", row.original.id);
    },
    publishModalBody: ({ row }: ModelTableActionProps<SubmissionNode>) => (
      <p className="t-copy-sm">
        {t("actions.publish_confirm_body_single", {
          title: row.original.title,
        })}
      </p>
    ),
  };

  const tabRoutes = [
    { route: "submissions.review", label: t("nav.review") },
    { route: "submissions.publish", label: t("nav.publish") },
  ];

  return (
    <ModelListPage<PublishListFragment$data, SubmissionNode>
      modelName="submission"
      header={t("nav.submissions_header")}
      columns={columns}
      data={dataWithMockNodes}
      actions={actions}
      tabRoutes={tabRoutes}
      tabLinksOnly
      showSearch
      hideFilters
      disableSortBy
      selectable
      rowSelection={rowSelection}
      onRowSelectionChange={onRowSelectionChange}
      selectedCount={selectedCount}
      countActions={
        <ButtonControlConfirm
          onClick={handleBulkPublish}
          disabled={selectedCount === 0}
          aria-label={t("actions.bulk_publish")}
          modalLabel={t("actions.publish_confirm_label")}
          modalBody={
            <p className="t-copy-sm">
              {t("actions.publish_confirm_body", { count: selectedCount })}
            </p>
          }
        >
          {t("actions.bulk_publish")}
        </ButtonControlConfirm>
      }
    />
  );
}

const fragment = graphql`
  fragment PublishListFragment on ItemConnection {
    nodes {
      id
      slug
    }
    ...ModelListPageFragment
  }
`;

export default PublishList;
