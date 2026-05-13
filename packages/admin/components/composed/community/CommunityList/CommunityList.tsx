import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDrawerHelper, useDestroyer } from "hooks";
import ModelListPage from "components/composed/model/ModelListPage";
// import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { ButtonControlDrawer, ButtonControlGroup } from "components/atomic";
import ModelColumns from "components/composed/model/ModelColumns";
import {
  CommunityListFragment$key,
  CommunityListFragment$data,
} from "@/relay/CommunityListFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function CommunityList({ data, hideHeader, headerStyle }: CommunityListProps) {
  const { t } = useTranslation();
  const drawerHelper = useDrawerHelper();
  const destroy = useDestroyer();

  const { communities } =
    useFragment<CommunityListFragment$key>(fragment, data) ?? {};

  const columns = [
    ModelColumns.CommunityNameColumn<Node>(),
    ModelColumns.CreatedAtColumn<Node>(),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<Node>) =>
      drawerHelper.open("editCommunity", {
        drawerSlug: row.original.slug,
      }),
    handleDelete: ({ row }: ModelTableActionProps<Node>) =>
      destroy.community({ communityId: row.original.id }, row.original.name),
    purgeProps: ({ row }: ModelTableActionProps<Node>) => ({
      id: row?.original.id,
      title: row?.original.name,
      entityType: "community" as const,
      handleDelete: () => {
        destroy.community({ communityId: row.original.id }, row.original.name);
      },
      hideLabel: true,
    }),
    handleView: ({ row }: ModelTableActionProps<Node>) =>
      row.original.slug ? `/communities/${row.original.slug}` : null,
  };

  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <ButtonControlDrawer drawer="addCommunity" icon="plus">
        {t("actions.create.community")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<CommunityListFragment$data["communities"], Node>
      modelName="community"
      columns={columns}
      actions={actions}
      data={communities}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      buttons={buttons}
    />
  );
}

interface CommunityListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: CommunityListFragment$key;
}

type CommunityNode =
  CommunityListFragment$data["communities"]["edges"][number]["node"];

type Node = CommunityNode;

const fragment = graphql`
  fragment CommunityListFragment on Query {
    communities(access: UPDATE, order: $order, page: $page, perPage: 20) {
      edges {
        node {
          slug
          id
          createdAt
          updatedAt
          name
          allowedActions
          position
          ...CommunityNameColumnFragment
        }
      }
      ...ModelListPageFragment
    }
  }
`;

export default CommunityList;
