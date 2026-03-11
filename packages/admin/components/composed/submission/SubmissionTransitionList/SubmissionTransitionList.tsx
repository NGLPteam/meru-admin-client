import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import type {
  SubmissionTransitionListFragment$data,
  SubmissionTransitionListFragment$key,
} from "@/relay/SubmissionTransitionListFragment.graphql";

type TransitionNode = SubmissionTransitionListFragment$data["nodes"][number];

type Props = {
  data?: SubmissionTransitionListFragment$key | null;
};

function SubmissionTransitionList({ data }: Props) {
  const transitions = useFragment<SubmissionTransitionListFragment$key>(
    fragment,
    data
  );

  const { t } = useTranslation();

  const columns = [
    ModelColumns.CreatedAtColumn<TransitionNode>({
      enableSorting: false,
    }),
    ModelColumns.StringColumn<TransitionNode>({
      id: "user",
      header: () => t("glossary.user"),
      accessorFn: (row: TransitionNode) => row.user?.name ?? "",
    }),
    ModelColumns.StatusColumn<TransitionNode>({
      id: "fromState",
      header: () => t("lists.from_state_column", "From"),
      accessorFn: (row: TransitionNode) => row.fromState,
    }),
    ModelColumns.StatusColumn<TransitionNode>({
      id: "toState",
      header: () => t("lists.to_state_column", "To"),
      accessorFn: (row: TransitionNode) => row.toState,
    }),
  ];

  return (
    <ModelListPage<SubmissionTransitionListFragment$data, TransitionNode>
      columns={columns}
      data={transitions}
      hideHeader
    />
  );
}

const fragment = graphql`
  fragment SubmissionTransitionListFragment on SubmissionTransitionConnection {
    nodes {
      id
      slug
      createdAt
      fromState
      toState
      user {
        id
        name
      }
    }
    ...ModelListPageFragment
  }
`;

export default SubmissionTransitionList;
