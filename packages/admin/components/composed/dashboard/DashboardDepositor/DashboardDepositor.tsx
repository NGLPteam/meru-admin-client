import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { ContentHeader } from "components/layout";
import ModelList from "components/composed/model/ModelList";
import ModelColumns from "components/composed/model/ModelColumns";
import ModelPageCountActions from "components/composed/model/ModelPageCountActions";
import { ViewOptions } from "utils/view-options";
import { DashboardDepositorFragment$key } from "@/relay/DashboardDepositorFragment.graphql";
import {
  DashboardDepositorSubmissionsFragment$data,
  DashboardDepositorSubmissionsFragment$key,
} from "@/relay/DashboardDepositorSubmissionsFragment.graphql";
import {
  DashboardDepositorPublicationsFragment$data,
  DashboardDepositorPublicationsFragment$key,
} from "@/relay/DashboardDepositorPublicationsFragment.graphql";
import type { ColumnDef } from "@tanstack/react-table";

type SubmissionNode =
  DashboardDepositorSubmissionsFragment$data["nodes"][number];
type PublicationNode =
  DashboardDepositorPublicationsFragment$data["nodes"][number];

interface Props {
  data: DashboardDepositorFragment$key;
}

export default function DashboardDepositor({ data }: Props) {
  const { t } = useTranslation();

  const queryData = useFragment(fragment, data);

  const submissions = useFragment<DashboardDepositorSubmissionsFragment$key>(
    submissionsFragment,
    queryData.mySubmissions,
  );

  const publications = useFragment<DashboardDepositorPublicationsFragment$key>(
    publicationsFragment,
    queryData.myPublications,
  );

  const submissionColumns = [
    ModelColumns.EntityThumbnailColumn<SubmissionNode>({
      accessorKey: "entity" as keyof SubmissionNode,
    }),
    ModelColumns.NameColumn<SubmissionNode>({
      accessor: (row: SubmissionNode) => row.entity?.title,
      route: "my-submissions.detail",
      enableSorting: false,
    }),
    ModelColumns.StatusColumn<SubmissionNode>({
      header: () => t("lists.status_column"),
      accessorFn: (row: SubmissionNode) => row.state,
    }),
    ModelColumns.UpdatedAtColumn<SubmissionNode>({
      enableSorting: false,
    }),
  ];

  const feUrl = process.env.NEXT_PUBLIC_FE_URL || "";

  const publicationColumns: ColumnDef<PublicationNode>[] = [
    ModelColumns.EntityThumbnailColumn<PublicationNode>({
      accessorKey: "entity" as keyof PublicationNode,
    }),
    {
      header: t("lists.name_column"),
      id: "title",
      accessorFn: (row: PublicationNode) => row.entity?.title ?? "",
      enableSorting: false,
      cell: (info) => {
        const row = info.row.original;
        const title = info.getValue<string>();
        const slug = row.entity?.slug;
        if (slug && feUrl) {
          return (
            <a
              href={`${feUrl}/items/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="t-weight-md"
            >
              {title}
            </a>
          );
        }
        return <span className="t-weight-md">{title}</span>;
      },
    },
    ModelColumns.StringColumn<PublicationNode>({
      id: "collection",
      header: () => t("lists.collection_column"),
      accessorFn: (row: PublicationNode) =>
        row.submissionTarget?.entity?.title ?? "",
    }),
    ModelColumns.UpdatedAtColumn<PublicationNode>({
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
        <ModelPageCountActions data={submissions} />
        <ModelList<DashboardDepositorSubmissionsFragment$data, SubmissionNode>
          view={ViewOptions.grid}
          columns={submissionColumns}
          data={submissions}
          modelName="submission"
          disableSortBy
        />
      </section>
      <section>
        <ContentHeader
          headerStyle="secondary"
          title={t("nav.my_publications")}
        />
        <ModelPageCountActions data={publications} />
        <ModelList<DashboardDepositorPublicationsFragment$data, PublicationNode>
          view={ViewOptions.grid}
          columns={publicationColumns}
          data={publications}
          modelName="submission"
          disableSortBy
        />
      </section>
    </>
  );
}

const fragment = graphql`
  fragment DashboardDepositorFragment on Query
  @argumentDefinitions(viewerId: { type: "ID!" }) {
    mySubmissions: submissions(
      filters: {
        userIds: [$viewerId]
        inState: [DRAFT, SUBMITTED, UNDER_REVIEW, REVISION_REQUESTED, APPROVED]
      }
      perPage: 10
      order: RECENT
    ) {
      ...DashboardDepositorSubmissionsFragment
    }
    myPublications: submissions(
      filters: { userIds: [$viewerId], inState: [PUBLISHED] }
      perPage: 10
      order: RECENT
    ) {
      ...DashboardDepositorPublicationsFragment
    }
  }
`;

const submissionsFragment = graphql`
  fragment DashboardDepositorSubmissionsFragment on SubmissionConnection {
    nodes {
      id
      slug
      state
      updatedAt
      entity {
        ... on Node {
          id
        }
        ... on Sluggable {
          slug
        }
        ... on Entity {
          title
        }
        ...EntityThumbnailColumnFragment
      }
      submissionTarget {
        entity {
          ... on Entity {
            title
          }
        }
      }
    }
    ...ModelPageCountActionsFragment
  }
`;

const publicationsFragment = graphql`
  fragment DashboardDepositorPublicationsFragment on SubmissionConnection {
    nodes {
      id
      slug
      updatedAt
      entity {
        ... on Node {
          id
        }
        ... on Sluggable {
          slug
        }
        ... on Entity {
          title
        }
        ...EntityThumbnailColumnFragment
      }
      submissionTarget {
        entity {
          ... on Entity {
            title
          }
        }
      }
    }
    ...ModelPageCountActionsFragment
  }
`;
