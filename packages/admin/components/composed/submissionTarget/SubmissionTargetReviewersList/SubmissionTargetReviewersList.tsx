import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDestroyer } from "hooks";
import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { ButtonControlDrawer, ButtonControlGroup } from "components/atomic";
import UserNameColumnCell from "components/composed/model/ModelColumns/UserNameColumnCell";
import {
  SubmissionTargetReviewersListDataFragment$data,
  SubmissionTargetReviewersListDataFragment$key,
} from "@/relay/SubmissionTargetReviewersListDataFragment.graphql";
import { SubmissionTargetReviewersListFragment$key } from "@/relay/SubmissionTargetReviewersListFragment.graphql";
import type { CellContext } from "@tanstack/react-table";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

export default function SubmissionTargetReviewersList({
  data,
  headerStyle = "secondary",
  hideHeader,
}: Props) {
  const { t } = useTranslation();
  const destroy = useDestroyer();

  const submissionTarget =
    useFragment<SubmissionTargetReviewersListFragment$key>(
      fragment,
      data ?? null,
    );

  const reviewers = useFragment<SubmissionTargetReviewersListDataFragment$key>(
    listDataFragment,
    submissionTarget?.reviewers ?? null,
  );

  const submissionTargetId = submissionTarget?.submissionTargetId;

  const columns = [
    ModelColumns.UserNameColumn<Node>({
      accessorFn: ({ user }: Node) => user,
      cell: (info: CellContext<Node, unknown>) => (
        <UserNameColumnCell data={info.row.original.user} />
      ),
      enableSorting: false,
    }),
    ModelColumns.EmailColumn<Node>({
      id: "user.email",
      accessorFn: ({ user }: Node) => user?.email,
      enableSorting: false,
    }),
  ];

  const actions = {
    handleDelete: ({ row }: ModelTableActionProps<Node>) => {
      if (!row.original.id) return;
      destroy.submissionTargetReviewer(
        { submissionTargetReviewerId: row.original.id },
        row.original.user?.name || "glossary.reviewer",
      );
    },
  };

  const buttons = submissionTargetId ? (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <ButtonControlDrawer
        drawer="addReviewer"
        drawerQuery={{
          drawerSubmissionTargetId: submissionTargetId,
        }}
        icon="plus"
      >
        {t("actions.add.reviewer")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  ) : null;

  return (
    <ModelListPage<SubmissionTargetReviewersListDataFragment$data, Node>
      modelName="role"
      columns={columns}
      data={reviewers}
      header={t("nav.reviewers")}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      buttons={buttons}
      actions={actions}
    />
  );
}

interface Props extends Pick<HeaderProps, "headerStyle" | "hideHeader"> {
  data?: SubmissionTargetReviewersListFragment$key | null;
}

type Node =
  SubmissionTargetReviewersListDataFragment$data["edges"][number]["node"];

const fragment = graphql`
  fragment SubmissionTargetReviewersListFragment on SubmissionTarget {
    submissionTargetId: id
    reviewers(page: $page, perPage: 20) {
      ...SubmissionTargetReviewersListDataFragment
    }
  }
`;

const listDataFragment = graphql`
  fragment SubmissionTargetReviewersListDataFragment on SubmissionTargetReviewerConnection {
    edges {
      node {
        id
        user {
          id
          name
          email
          slug
          ...UserNameColumnCellFragment
        }
      }
    }
    ...ModelListPageFragment
  }
`;
