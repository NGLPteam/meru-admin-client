import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import { ButtonControlGroup, ButtonControlRoute } from "components/atomic";
import UserNameColumnCell from "components/composed/model/ModelColumns/UserNameColumnCell";
import SubmissionUserFilter from "components/composed/submission/SubmissionUserFilter";
import SubmissionStatusFilter from "components/composed/submission/SubmissionStatusFilter";
import SubmissionCollectionFilter from "components/composed/submission/SubmissionCollectionFilter";
import CurrentSubmissionFilters from "components/composed/submission/CurrentSubmissionFilters";
import type {
  SubmissionListFragment$data,
  SubmissionListFragment$key,
} from "@/relay/SubmissionListFragment.graphql";
import type { SubmissionState } from "types/graphql-schema";
import type { CellContext } from "@tanstack/react-table";

type SubmissionNode = SubmissionListFragment$data["nodes"][number];

type Props = {
  data?: SubmissionListFragment$key | null;
  mode?: "review" | "my-submissions";
};

function SubmissionList({ data, mode = "review" }: Props) {
  const submissions = useFragment<SubmissionListFragment$key>(fragment, data);

  const { t } = useTranslation();

  const isMySubmissions = mode === "my-submissions";
  const detailRoute = isMySubmissions
    ? "my-submissions.detail"
    : "submissions.detail";

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

  const columns = [
    ModelColumns.NameColumn<SubmissionNode>({
      accessor: (row: SubmissionNode) => row.entity?.title,
      route: detailRoute,
      enableSorting: false,
    }),
    ModelColumns.StatusColumn<SubmissionNode>({
      header: () => t("lists.status_column"),
      accessorFn: (row: SubmissionNode) => row.state,
      meta: {
        filter: <SubmissionStatusFilter stateOptions={stateOptions} />,
      },
    }),
    ...(mode === "review"
      ? [
          ModelColumns.NameColumn<SubmissionNode>({
            id: "submittedBy",
            header: () => t("lists.submitted_by_column"),
            accessorKey: "user",
            cell: ({ row }: CellContext<SubmissionNode, unknown>) => (
              <UserNameColumnCell data={row.original.user} />
            ),
            enableSorting: false,
            meta: {
              filter: <SubmissionUserFilter />,
            },
          }),
        ]
      : []),
    ModelColumns.StringColumn<SubmissionNode>({
      id: "collection",
      header: () => t("lists.collection_column"),
      accessorFn: (row: SubmissionNode) =>
        row.submissionTarget?.entity?.title ?? "",
      meta: {
        filter: <SubmissionCollectionFilter />,
      },
    }),
    ModelColumns.CreatedAtColumn<SubmissionNode>({
      enableSorting: true,
    }),
  ];

  const buttons = isMySubmissions ? (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
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

  return (
    <ModelListPage<SubmissionListFragment$data, SubmissionNode>
      modelName="submission"
      header={t(
        isMySubmissions ? "nav.my_submissions" : "nav.submissions_header",
      )}
      columns={columns}
      data={submissions}
      buttons={buttons}
      tabRoutes={tabRoutes}
      tabLinksOnly
      showSearch
      hideFilters
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
