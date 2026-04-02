import { useCallback } from "react";
import { graphql, useMutation } from "react-relay";
import { useTranslation } from "react-i18next";
import { useMaybeFragment } from "@wdp/lib/api/hooks";
import { useNotify } from "hooks";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import { ButtonControlConfirm, ButtonControlGroup } from "components/atomic";
import {
  useBulkActions,
  useBulkSelectionBridge,
} from "components/layout/Table/bulkActions";
import UserNameColumnCell from "components/composed/model/ModelColumns/UserNameColumnCell";
import SubmissionUserFilter from "components/composed/submission/SubmissionUserFilter";
import SubmissionCollectionFilter from "components/composed/submission/SubmissionCollectionFilter";
import CurrentSubmissionFilters from "components/composed/submission/CurrentSubmissionFilters";
import type {
  SubmissionBulkPublishListFragment$data,
  SubmissionBulkPublishListFragment$key,
} from "@/relay/SubmissionBulkPublishListFragment.graphql";
import type { SubmissionBulkPublishListPublishMutation as PublishMutation } from "@/relay/SubmissionBulkPublishListPublishMutation.graphql";
import type { ModelTableActionProps, CellContext } from "@tanstack/react-table";
import type { MutationAttributeError } from "types/graphql-schema";

type SubmissionBulkPublishNode =
  SubmissionBulkPublishListFragment$data["nodes"][number];

type Props = {
  data?: SubmissionBulkPublishListFragment$key | null;
};

function SubmissionBulkPublishList({ data }: Props) {
  const connection = useMaybeFragment<SubmissionBulkPublishListFragment$key>(
    fragment,
    data,
  );

  const { t } = useTranslation();
  const notify = useNotify();

  const [commitPublish] = useMutation<PublishMutation>(publishMutation);

  const handlePublishResponse = useCallback(
    (
      data:
        | PublishMutation["response"]["submissionChangeState"]
        | null
        | undefined,
    ) => {
      if (!data) return;

      const { globalErrors, attributeErrors, submission } = data;

      if (submission) {
        notify.success(t("messages.submission_state_changed"));
      } else if (globalErrors?.length) {
        notify.mutationGlobalError(globalErrors);
      } else if (attributeErrors?.length) {
        notify.mutationAttributeError(
          attributeErrors as MutationAttributeError[],
        );
      }
    },
    [notify, t],
  );

  // --- Bulk actions ---
  const records = [...(connection?.nodes ?? [])];
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
    ? records.length
    : bulkSelection.ids.length;

  const handleBulkPublish = (hideDialog: () => void) => {
    // TODO: wire mutation — send bulkSelection.filters or bulkSelection.ids
    // eslint-disable-next-line no-console
    console.log("Bulk publish:", bulkSelection);
    hideDialog();
  };

  // --- Columns ---
  const columns = [
    ModelColumns.NameColumn<SubmissionBulkPublishNode>({
      accessor: (row: SubmissionBulkPublishNode) => row.entity?.title,
      route: "submissions.detail",
      enableSorting: false,
    }),
    ModelColumns.NameColumn<SubmissionBulkPublishNode>({
      id: "submittedBy",
      header: () => t("lists.submitted_by_column"),
      accessorKey: "user",
      cell: ({ row }: CellContext<SubmissionBulkPublishNode, unknown>) => (
        <UserNameColumnCell data={row.original.user} />
      ),
      enableSorting: false,
      meta: {
        filter: <SubmissionUserFilter />,
      },
    }),
    ModelColumns.StringColumn<SubmissionBulkPublishNode>({
      id: "collection",
      header: () => t("lists.collection_column"),
      accessorFn: (row: SubmissionBulkPublishNode) =>
        row.submissionTarget?.entity?.title ?? "",
      meta: {
        filter: <SubmissionCollectionFilter />,
      },
    }),
    ModelColumns.UpdatedAtColumn<SubmissionBulkPublishNode>({
      enableSorting: false,
    }),
  ];

  const actions = {
    handleView: ({ row }: ModelTableActionProps<SubmissionBulkPublishNode>) =>
      row.original.entity?.slug ? `/preview/${row.original.entity.slug}` : null,
    handlePublish: ({
      row,
    }: ModelTableActionProps<SubmissionBulkPublishNode>) => {
      commitPublish({
        variables: {
          input: {
            submissionId: row.original.id,
            toState: "PUBLISHED",
          },
        },
        onCompleted: (response) =>
          handlePublishResponse(response.submissionChangeState),
      });
    },
    publishModalBody: ({
      row,
    }: ModelTableActionProps<SubmissionBulkPublishNode>) => (
      <p className="t-copy-sm">
        {t("actions.submissions.publish_confirm_body_single", {
          title: row.original.entity?.title,
        })}
      </p>
    ),
  };

  const tabRoutes = [
    { route: "submissions.review", label: t("nav.review") },
    { route: "submissions.publish", label: t("nav.publish") },
  ];

  return (
    <ModelListPage<
      SubmissionBulkPublishListFragment$data,
      SubmissionBulkPublishNode
    >
      modelName="submission"
      header={t("nav.submissions_header")}
      columns={columns}
      data={connection}
      actions={actions}
      tabRoutes={tabRoutes}
      tabLinksOnly
      selectable
      rowSelection={rowSelection}
      onRowSelectionChange={onRowSelectionChange}
      selectedCount={selectedCount}
      showSearch
      hideFilters
      countActions={
        <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
          <ButtonControlConfirm
            onClick={handleBulkPublish}
            disabled={!selectedCount}
            aria-label={t("actions.submissions.bulk_publish")}
            modalLabel={t("actions.submissions.publish_confirm_label")}
            modalBody={
              <p className="t-copy-sm">
                {t("actions.submissions.publish_confirm_body", {
                  count: selectedCount,
                })}
              </p>
            }
          >
            {t("actions.submissions.bulk_publish")}
          </ButtonControlConfirm>
        </ButtonControlGroup>
      }
      currentFiltersOverride={<CurrentSubmissionFilters />}
    />
  );
}

const fragment = graphql`
  fragment SubmissionBulkPublishListFragment on SubmissionConnection {
    nodes {
      id
      slug
      updatedAt
      entity {
        ... on Node {
          id
        }
        ... on Entity {
          title
          slug
        }
      }
      submissionTarget {
        entity {
          ... on Entity {
            title
          }
        }
      }
      user {
        id
        slug
        ...UserNameColumnCellFragment
      }
    }
    ...ModelListPageFragment
  }
`;

const publishMutation = graphql`
  mutation SubmissionBulkPublishListPublishMutation(
    $input: SubmissionChangeStateInput!
  ) {
    submissionChangeState(input: $input) {
      submission {
        id
        state
      }
      attributeErrors {
        messages
        path
        type
      }
      globalErrors {
        message
        type
      }
    }
  }
`;

export default SubmissionBulkPublishList;
