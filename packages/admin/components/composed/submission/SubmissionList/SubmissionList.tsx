import { graphql, useFragment } from "react-relay";
import { useRouter } from "next/router";
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
  mode?: "review" | "my-submissions";
};

function SubmissionList({ data, mode = "review" }: Props) {
  const connection = useFragment<SubmissionListFragment$key>(fragment, data);

  const { t } = useTranslation();
  const router = useRouter();

  const isMySubmissions = mode === "my-submissions";
  const detailRoute = isMySubmissions
    ? "my-submissions.detail"
    : "submissions.detail";
  const basePath = isMySubmissions ? "my-submissions" : "submissions";

  const filteredSubmissions = isMySubmissions
    ? MOCK_SUBMISSIONS
    : MOCK_SUBMISSIONS.filter(
        (s) => s.status === "In Review" || s.status === "Revisions Requested",
      );

  const dataWithMockNodes = connection
    ? ({
        ...connection,
        nodes: filteredSubmissions,
      } as SubmissionListFragment$data)
    : undefined;

  const columns = [
    ModelColumns.NameColumn<SubmissionNode>({
      accessor: "title",
      route: detailRoute,
      enableSorting: false,
    }),
    ModelColumns.StatusColumn<SubmissionNode>({
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
    handleEdit: ({ row }: ModelTableActionProps<SubmissionNode>) => {
      if (row.original.slug) {
        router.push(`/${basePath}/${row.original.slug}/details/edit`);
      }
    },
    handleView: ({ row }: ModelTableActionProps<SubmissionNode>) =>
      row.original.slug ? `/${basePath}/${row.original.slug}/details` : null,
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

  return (
    <ModelListPage<SubmissionListFragment$data, SubmissionNode>
      modelName="submission"
      header={t(
        isMySubmissions ? "nav.my_submissions" : "nav.submissions_header",
      )}
      columns={columns}
      data={dataWithMockNodes}
      actions={actions}
      buttons={buttons}
      tabRoutes={tabRoutes}
      tabLinksOnly
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
