import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useMaybeFragment } from "hooks";
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

  const submissionTarget =
    useMaybeFragment<SubmissionTargetReviewersListFragment$key>(fragment, data);

  const users = useMaybeFragment<SubmissionTargetReviewersListDataFragment$key>(
    listDataFragment,
    submissionTarget?.entity?.assignedUsers,
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
      // TODO: Wire up submissionTargetReviewerDestroy once the schema
      // provides a reviewers connection with submissionTargetReviewerId
      console.info("Remove reviewer", {
        submissionTargetId,
        userId: row.original.user?.id,
      });
    },
  };

  const buttons = submissionTargetId ? (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
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
      data={users}
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
    entity {
      ... on Collection {
        assignedUsers(order: USER_NAME_ASC, page: $page, perPage: 20) {
          ...SubmissionTargetReviewersListDataFragment
        }
      }
    }
  }
`;

const listDataFragment = graphql`
  fragment SubmissionTargetReviewersListDataFragment on ContextualPermissionConnection {
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
