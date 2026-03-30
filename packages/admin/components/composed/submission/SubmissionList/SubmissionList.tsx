import { graphql } from "react-relay";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { useMaybeFragment } from "@wdp/lib/api/hooks";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import {
  ButtonControl,
  ButtonControlGroup,
  ButtonControlRoute,
} from "components/atomic";
import UserNameColumnCell from "components/composed/model/ModelColumns/UserNameColumnCell";
import SubmissionFilterDrawer from "components/composed/submission/SubmissionFilterDrawer";
import CurrentSubmissionFilters from "components/composed/submission/CurrentSubmissionFilters";
import type {
  SubmissionListFragment$data,
  SubmissionListFragment$key,
} from "@/relay/SubmissionListFragment.graphql";
import type { SubmissionState } from "types/graphql-schema";
import type {
  CellContext,
  ModelTableActionProps,
  Row,
} from "@tanstack/react-table";

type SubmissionNode = SubmissionListFragment$data["nodes"][number];

type Props = {
  data?: SubmissionListFragment$key | null;
  mode?: "review" | "my-submissions";
};

function SubmissionList({ data, mode = "review" }: Props) {
  const submissions = useMaybeFragment<SubmissionListFragment$key>(
    fragment,
    data,
  );

  const { t } = useTranslation();
  const router = useRouter();

  const isMySubmissions = mode === "my-submissions";
  const detailRoute = isMySubmissions
    ? "my-submissions.detail"
    : "submissions.detail";
  const basePath = isMySubmissions ? "my-submissions" : "submissions";

  const columns = [
    ModelColumns.NameColumn<SubmissionNode>({
      accessor: (row: SubmissionNode) => row.entity?.title,
      route: detailRoute,
      enableSorting: false,
    }),
    ModelColumns.StatusColumn<SubmissionNode>({
      header: () => t("lists.status_column"),
      accessorFn: (row: SubmissionNode) => row.state,
    }),
    ModelColumns.StringColumn<SubmissionNode>({
      id: "collection",
      header: () => t("lists.collection_column"),
      accessorFn: (row: SubmissionNode) =>
        row.submissionTarget?.entity?.title ?? "",
    }),
    ModelColumns.NameColumn<SubmissionNode>({
      id: "submittedBy",
      header: () => t("lists.submitted_by_column"),
      accessorKey: "user",
      cell: ({ row }: CellContext<SubmissionNode, unknown>) => (
        <UserNameColumnCell data={row.original.user} />
      ),
      enableSorting: false,
    }),
    ModelColumns.CreatedAtColumn<SubmissionNode>({
      enableSorting: true,
    }),
  ];

  const actions = {
    actionsFilter: (all: Record<string, unknown>, row: Row<SubmissionNode>) =>
      Object.keys(all).reduce((obj, a) => {
        if (row.original.currentStatus.mutableState || a !== "edit")
          return { ...obj, [a]: all[a] };
        return obj;
      }, {}),
    handleView: ({ row }: ModelTableActionProps<SubmissionNode>) =>
      row.original.slug ? `/${basePath}/${row.original.slug}/details` : null,
    handleEdit: ({ row }: ModelTableActionProps<SubmissionNode>) => {
      if (row.original.slug) {
        router.push(`/${basePath}/${row.original.slug}/details/edit`);
      }
    },
  };

  const buttons = isMySubmissions ? (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      <ButtonControlRoute route="my-submissions.new" icon="plus">
        {t("actions.add.submission")}
      </ButtonControlRoute>
    </ButtonControlGroup>
  ) : undefined;

  const tabRoutes = !isMySubmissions
    ? [
        { route: "submissions.review", label: t("nav.review") },
        { route: "submissions.publish", label: t("nav.publish") },
      ]
    : undefined;

  const ALL_STATES: SubmissionState[] = [
    "DRAFT",
    "SUBMITTED",
    "UNDER_REVIEW",
    "REVISION_REQUESTED",
    "APPROVED",
    "PUBLISHED",
    "REJECTED",
  ];

  const REVIEWER_STATES = ALL_STATES.filter((s) => s !== "DRAFT");

  const stateOptions = isMySubmissions ? ALL_STATES : REVIEWER_STATES;

  const dialog = useDialogState({ animated: true });

  return (
    <ModelListPage<SubmissionListFragment$data, SubmissionNode>
      modelName="submission"
      header={t(
        isMySubmissions ? "nav.my_submissions" : "nav.submissions_header",
      )}
      columns={columns}
      data={submissions}
      actions={actions}
      buttons={buttons}
      tabRoutes={tabRoutes}
      tabLinksOnly
      countActions={
        <>
          <DialogDisclosure
            as={ButtonControl}
            icon="settings"
            aria-label="Filter options"
            {...dialog}
          />
          <SubmissionFilterDrawer dialog={dialog} stateOptions={stateOptions} />
        </>
      }
      currentFiltersOverride={<CurrentSubmissionFilters />}
    />
  );
}

const fragment = graphql`
  fragment SubmissionListFragment on SubmissionConnection {
    nodes {
      id
      slug
      state
      createdAt
      entity {
        ... on Node {
          id
        }
        ... on Entity {
          title
        }
      }
      currentStatus {
        mutableState
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

export default SubmissionList;
