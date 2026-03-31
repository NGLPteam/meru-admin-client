import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { useMaybeFragment } from "@wdp/lib/api/hooks";
import { IconFactory } from "components/factories";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import UserNameColumnCell from "components/composed/model/ModelColumns/UserNameColumnCell";
import Search from "components/composed/search/Search";
import { FiltersButton } from "components/composed/search/SearchWithFilters/SearchWithFilters.styles";
import SubmissionReviewFilterDrawer from "components/composed/submission/SubmissionReviewFilterDrawer";
import CurrentSubmissionReviewFilters from "components/composed/submission/CurrentSubmissionReviewFilters";
import type {
  SubmissionReviewListFragment$data,
  SubmissionReviewListFragment$key,
} from "@/relay/SubmissionReviewListFragment.graphql";
import type { LayoutManageSubmissionQuery$data } from "@/relay/LayoutManageSubmissionQuery.graphql";
import RequestReviewButton from "./RequestReviewButton";
import type { CellContext } from "@tanstack/react-table";

type ReviewNode = SubmissionReviewListFragment$data["nodes"][number];

type Props = {
  data?: SubmissionReviewListFragment$key | null;
  mode: "reviewer" | "submission";
  submission?: LayoutManageSubmissionQuery$data["submission"];
};

function SubmissionReviewList({
  data,
  mode = "submission",
  submission,
}: Props) {
  const reviews = useMaybeFragment<SubmissionReviewListFragment$key>(
    fragment,
    data,
  );

  const { t } = useTranslation();
  const dialog = useDialogState({ animated: true });

  const canReview = !!reviews?.nodes?.[0]?.submission.canReview.value;

  const columns = [
    ...(mode === "reviewer"
      ? [
          ModelColumns.NameColumn<ReviewNode>({
            header: () => t("glossary.submission"),
            accessor: (row: ReviewNode) => row.submission?.entity?.title,
            route: "submissions.detail",
            slugKey: "submission.slug",
            enableSorting: false,
          }),
          ModelColumns.NameColumn<ReviewNode>({
            id: "submittedBy",
            header: () => t("lists.submitted_by_column"),
            accessorKey: "submission.user",
            cell: ({ row }: CellContext<ReviewNode, unknown>) => (
              <UserNameColumnCell data={row.original.submission?.user} />
            ),
            enableSorting: false,
          }),
        ]
      : []),
    ModelColumns.UpdatedAtColumn<ReviewNode>({
      enableSorting: false,
    }),
    ...(canReview && mode !== "reviewer"
      ? [
          ModelColumns.StringColumn<ReviewNode>({
            id: "user",
            header: () => t("glossary.user"),
            accessorFn: (row: ReviewNode) => row.user?.name ?? "",
          }),
        ]
      : []),
    ModelColumns.StatusColumn<ReviewNode>({
      header: () => t("lists.status_column"),
      accessorFn: (row: ReviewNode) => row.state,
    }),
    ModelColumns.StringColumn<ReviewNode>({
      id: "comment",
      header: () => t("glossary.comment", "Comment"),
      accessorFn: (row: ReviewNode) => row.comment ?? "",
    }),
  ];

  if (mode === "reviewer") {
    return (
      <ModelListPage<SubmissionReviewListFragment$data, ReviewNode>
        columns={columns}
        data={reviews}
        header={t("nav.my_reviews")}
        searchOverride={
          <>
            <Search
              filtersButton={
                <DialogDisclosure as={FiltersButton} {...dialog}>
                  <IconFactory icon="settings" title="Filter options" />
                </DialogDisclosure>
              }
            />
            <SubmissionReviewFilterDrawer dialog={dialog} />
          </>
        }
        currentFiltersOverride={<CurrentSubmissionReviewFilters />}
      />
    );
  }

  return (
    <ModelListPage<SubmissionReviewListFragment$data, ReviewNode>
      columns={columns}
      data={reviews}
      hideHeader
      countActions={
        submission?.canRequestReview ? (
          <RequestReviewButton submissionId={submission.id} />
        ) : undefined
      }
    />
  );
}

const fragment = graphql`
  fragment SubmissionReviewListFragment on SubmissionReviewConnection {
    nodes {
      id
      slug
      updatedAt
      state
      comment
      user {
        name
      }
      submission {
        slug
        canReview {
          value
        }
        entity {
          ... on Entity {
            title
          }
        }
        user {
          id
          slug
          ...UserNameColumnCellFragment
        }
      }
    }
    ...ModelListPageFragment
  }
`;

export default SubmissionReviewList;
