import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import {
  useMaybeFragment,
  useDestroyer,
  useDrawerHelper,
  useRouteSlug,
} from "hooks";

import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import { ButtonControlGroup, NamedLink } from "components/atomic";
import PageHeader from "components/layout/PageHeader";
import {
  type CellContext,
  type ModelTableActionProps,
} from "@tanstack/react-table";
import {
  ItemContributionListFragment$data,
  ItemContributionListFragment$key,
} from "@/relay/ItemContributionListFragment.graphql";
import CreateContributionButton from "../CreateContributionButton";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function ItemContributionList({
  data,
  headerStyle,
  nameColumn = "item",
  hideHeader,
}: ItemContributionListProps) {
  const itemContributions = useMaybeFragment<ItemContributionListFragment$key>(
    fragment,
    data,
  );
  const drawerHelper = useDrawerHelper();
  const destroy = useDestroyer();
  const slug = useRouteSlug();
  const { t } = useTranslation();

  const onContributor = nameColumn !== "contributor";

  const collectionNameColumn = {
    header: () => "Name",
    id: "targetTitle",
    accessorFn: (row: ItemContributionNode) => {
      return row?.item?.title;
    },
    cell: ({ row, getValue }: CellContext<ItemContributionNode, unknown>) => {
      const value = getValue<string>();
      return (
        <NamedLink
          route="item"
          routeParams={{ slug: row.original.item.slug }}
          passHref
        >
          <a className="t-weight-md a-link">{value}</a>
        </NamedLink>
      );
    },
  };

  const contributorNameColumn =
    ModelColumns.ContributorNameColumn<ItemContributionNode>({
      id: "targetTitle",
      accessorFn: (row: ItemContributionNode) => {
        return row?.contributor;
      },
    });

  const columns = [
    nameColumn === "item" ? collectionNameColumn : contributorNameColumn,
    ModelColumns.StringColumn<ItemContributionNode>({
      header: () => <>{t("lists.role_column")}</>,
      id: "contributionRole.label",
    }),
    ModelColumns.PositionColumn<ItemContributionNode>({
      header: t("forms.fields.inner_position"),
      id: "innerPosition",
    }),
    ModelColumns.PositionColumn<ItemContributionNode>({
      header: t("forms.fields.outer_position"),
      id: "outerPosition",
    }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<ItemContributionNode>) =>
      drawerHelper.open("editItemContribution", {
        drawerSlug: row.original.slug,
      }),
    handleDelete: ({ row }: ModelTableActionProps<ItemContributionNode>) =>
      destroy.contribution(
        { contributionId: row.original.id },
        "glossary.contribution",
      ),
  };

  // TODO: We need an authorization check here. The contributors.create check doesn't
  //  exist yet in the API.
  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <CreateContributionButton
        type="item"
        parentSlug={slug}
        onContributor={onContributor}
      />
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<ItemContributionListFragment$data, ItemContributionNode>
      modelName="item_contribution"
      columns={columns}
      actions={actions}
      buttons={buttons}
      data={itemContributions}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
    />
  );
}

interface ItemContributionListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: ItemContributionListFragment$key;
  nameColumn?: "item" | "contributor";
}

type ItemContributionNode = ItemContributionListFragment$data["nodes"][number];

const fragment = graphql`
  fragment ItemContributionListFragment on ItemContributionConnection {
    nodes {
      id
      slug
      createdAt
      updatedAt
      innerPosition
      outerPosition
      contributionRole {
        label
      }
      contributor {
        __typename
        ... on Sluggable {
          slug
        }
        ...ContributorNameColumnFragment
      }
      item {
        slug
        title
      }
    }
    ...ModelListPageFragment
  }
`;

export default ItemContributionList;
