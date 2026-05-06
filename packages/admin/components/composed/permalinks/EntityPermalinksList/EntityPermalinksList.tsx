import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDestroyer, useDrawerHelper } from "hooks";
import ModelListPageUnpaginated from "components/composed/model/ModelListPageUnpaginated";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { ButtonControlDrawer, ButtonControlGroup } from "components/atomic";
import type {
  EntityPermalinksListFragment$key,
  EntityPermalinksListFragment$data,
} from "@/relay/EntityPermalinksListFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function EntityPermalinksList({
  data,
  headerStyle,
  hideHeader,
}: EntityPermalinksListProps) {
  const { t } = useTranslation();
  const destroy = useDestroyer();
  const drawerHelper = useDrawerHelper();

  const sourceEntity = useFragment<EntityPermalinksListFragment$key>(
    fragment,
    data,
  );

  const columns = [
    ModelColumns.StringColumn<Node>({
      header: () => <>{t("lists.slug_column")}</>,
      id: "uri",
    }),
    ModelColumns.BooleanColumn<Node>({
      header: () => <>{t("lists.canonical_column")}</>,
      id: "canonical",
    }),
  ];

  const buttons = (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      <ButtonControlDrawer
        drawer="addPermalink"
        drawerQuery={{
          drawerSlug: sourceEntity?.slug ? sourceEntity.slug : "",
        }}
        icon="plus"
        actions="self.update"
      >
        {t("actions.add.permalink")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<Node>) =>
      drawerHelper.open("editPermalink", {
        drawerPermalinkSlug: row.original.slug,
      }),
    handleDelete: ({ row }: ModelTableActionProps<Node>) =>
      destroy.permalink(
        { permalinkId: row.original.id },
        row.original.uri || t("glossary.permalink"),
      ),
    handleView: ({ row }: ModelTableActionProps<Node>) => {
      return row.original.uri ? `/permalink/${row.original.uri}` : null;
    },
  };

  const nodes = sourceEntity?.permalinks?.length
    ? [...sourceEntity.permalinks]
    : [];

  return (
    <ModelListPageUnpaginated<Nodes, Node>
      modelName={"permalink"}
      columns={columns}
      actions={actions}
      data={{ nodes }}
      totalCount={nodes.length}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      buttons={buttons}
    />
  );
}

interface EntityPermalinksListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: EntityPermalinksListFragment$key;
}

type Nodes = { nodes: Node[] };
type Node = NonNullable<
  EntityPermalinksListFragment$data["permalinks"]
>[number];

const fragment = graphql`
  fragment EntityPermalinksListFragment on Entity {
    ... on Item {
      slug
      permalinks {
        id
        slug
        uri
        canonical
      }
    }
    ... on Collection {
      slug
      permalinks {
        id
        slug
        uri
        canonical
      }
    }
    ... on Community {
      slug
      permalinks {
        id
        slug
        uri
        canonical
      }
    }
  }
`;

export default EntityPermalinksList;
