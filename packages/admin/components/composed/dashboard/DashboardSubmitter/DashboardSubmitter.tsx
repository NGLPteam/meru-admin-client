import { useTranslation } from "react-i18next";
import CoverPlaceholder from "@wdp/lib/atomic/CoverPlaceholder";
import { ContentHeader, PageCountActions } from "components/layout";
import ModelList from "components/composed/model/ModelList";
import ModelColumns from "components/composed/model/ModelColumns";
import { ViewOptions } from "utils/view-options";
import {
  MOCK_SUBMISSIONS,
  type SubmissionNode,
} from "components/composed/submission/SubmissionList/mockData";
import type { ColumnDef } from "@tanstack/react-table";

type MockConnection = { nodes: readonly SubmissionNode[] };

const publishedSubmissions = MOCK_SUBMISSIONS.filter(
  (s) => s.status === "Published",
);

function ThumbnailColumn(): ColumnDef<SubmissionNode> {
  return {
    header: () => <span className="a-hidden">Thumbnail</span>,
    id: "thumbnail",
    accessorFn: (row) => row,
    enableSorting: false,
    cell: (info) => {
      const row = info.getValue<SubmissionNode>();
      return (
        <CoverPlaceholder title={row.title} seed={row.id} maxHeight={70} />
      );
    },
    meta: { cellType: "thumbnail" },
  };
}

export default function DashboardSubmitter() {
  const { t } = useTranslation();

  const allData: MockConnection = { nodes: MOCK_SUBMISSIONS };

  const publishedData: MockConnection = {
    nodes: publishedSubmissions,
  };

  const submissionColumns = [
    ThumbnailColumn(),
    ModelColumns.NameColumn<SubmissionNode>({
      accessor: "title",
      route: "my-submissions.detail",
      enableSorting: false,
    }),
    ModelColumns.StringColumn<SubmissionNode>({
      id: "status",
      header: () => t("lists.status_column"),
    }),
    ModelColumns.UpdatedAtColumn<SubmissionNode>({
      enableSorting: false,
    }),
  ];

  const publicationColumns = [
    ThumbnailColumn(),
    ModelColumns.NameColumn<SubmissionNode>({
      accessor: "title",
      route: "my-submissions.detail",
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

  return (
    <>
      <section>
        <ContentHeader
          headerStyle="secondary"
          title={t("nav.my_submissions")}
        />
        <PageCountActions
          pageInfo={{
            page: 1,
            perPage: MOCK_SUBMISSIONS.length,
            totalCount: MOCK_SUBMISSIONS.length,
          }}
        />
        <ModelList<MockConnection, SubmissionNode>
          view={ViewOptions.grid}
          columns={submissionColumns}
          data={allData}
          modelName="submission"
          disableSortBy
        />
      </section>
      <section>
        <ContentHeader
          headerStyle="secondary"
          title={t("nav.my_publications")}
        />
        <PageCountActions
          pageInfo={{
            page: 1,
            perPage: publishedSubmissions.length,
            totalCount: publishedSubmissions.length,
          }}
        />
        <ModelList<MockConnection, SubmissionNode>
          view={ViewOptions.grid}
          columns={publicationColumns}
          data={publishedData}
          modelName="submission"
          disableSortBy
        />
      </section>
    </>
  );
}
