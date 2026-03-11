import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useMaybeFragment } from "@wdp/lib/api/hooks";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import type {
  SubmissionReviewListFragment$data,
  SubmissionReviewListFragment$key,
} from "@/relay/SubmissionReviewListFragment.graphql";

type ReviewNode = SubmissionReviewListFragment$data["nodes"][number];

type Props = {
  data?: SubmissionReviewListFragment$key | null;
};

function SubmissionReviewList({ data }: Props) {
  const reviews = useMaybeFragment<SubmissionReviewListFragment$key>(
    fragment,
    data,
  );

  const { t } = useTranslation();

  const columns = [
    ModelColumns.UpdatedAtColumn<ReviewNode>({
      enableSorting: false,
    }),
    ModelColumns.StringColumn<ReviewNode>({
      id: "user",
      header: () => t("glossary.user"),
      accessorFn: (row: ReviewNode) => row.user?.name ?? "",
    }),
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

  return (
    <ModelListPage<SubmissionReviewListFragment$data, ReviewNode>
      columns={columns}
      data={reviews}
      hideHeader
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
    }
    ...ModelListPageFragment
  }
`;

export default SubmissionReviewList;
