import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { useMaybeFragment, useDestroyer } from "hooks";

import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import {
  ButtonControlDrawer,
  ButtonControlGroup,
  NamedLink,
} from "components/atomic";

import type { EntityLinksListFragment$key } from "@/relay/EntityLinksListFragment.graphql";
import type {
  EntityLinksListDataFragment$data,
  EntityLinksListDataFragment$key,
} from "@/relay/EntityLinksListDataFragment.graphql";
import type { CellContext, ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function EntityLinksList({
  data,
  headerStyle,
  hideHeader,
}: EntityLinksListProps) {
  const { t } = useTranslation();
  const destroy = useDestroyer();

  /* eslint-disable max-len */
  const sourceEntity = useMaybeFragment<EntityLinksListFragment$key>(
    fragment,
    data,
  );
  const linksData = useMaybeFragment<EntityLinksListDataFragment$key>(
    linksFragment,
    sourceEntity?.links,
  );
  /* eslint-enable max-len */

  /** Columns */
  const columns = [
    ModelColumns.NameColumn<EntityLinksNode>({
      route: "collection",
      accessorKey: "target",
      enableSorting: false,
      cell: ({ row, getValue }: CellContext<EntityLinksNode, unknown>) => {
        const value = getValue<EntityLinksNode & { title: string }>();
        if (!row?.original?.target?.slug) return value.slug;

        const route =
          row?.original?.target?.schemaDefinition?.kind === "COLLECTION"
            ? "collection"
            : "item";

        return (
          <NamedLink
            route={route}
            routeParams={{ slug: row.original.target.slug }}
            passHref
          >
            <a className="t-weight-md a-link">{value.title}</a>
          </NamedLink>
        );
      },
    }),
    ModelColumns.StringColumn<EntityLinksNode>({
      header: () => <>{t("lists.schema_column")}</>,
      id: "target.schemaDefinition.name",
    }),
    ModelColumns.StringColumn<EntityLinksNode>({
      header: () => <>{t("lists.type_column")}</>,
      id: "operator",
      cell: ({ getValue }: CellContext<EntityLinksNode, unknown>) =>
        capitalize(getValue<string>()),
    }),
  ];

  const buttons = (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      <ButtonControlDrawer
        drawer="addLink"
        drawerQuery={{
          drawerSlug: sourceEntity?.slug ? sourceEntity.slug : "",
        }}
        icon="plus"
        actions="self.update"
      >
        {t("actions.add.link")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  const actions = {
    handleDelete: ({ row }: ModelTableActionProps<EntityLinksNode>) =>
      destroy.link(
        { entityLinkId: row.original.id },
        row.original.target.title || "glossary.link",
      ),
  };

  return (
    <ModelListPage<EntityLinksListDataFragment$data, EntityLinksNode>
      modelName={"link"}
      columns={columns}
      actions={actions}
      data={linksData}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      buttons={buttons}
    />
  );
}

interface EntityLinksListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: EntityLinksListFragment$key;
}

type EntityLinksNode = EntityLinksListDataFragment$data["nodes"][number];

const linksFragment = graphql`
  fragment EntityLinksListDataFragment on EntityLinkConnection {
    nodes {
      id
      slug
      operator
      target {
        ... on Item {
          slug
          title
          schemaDefinition {
            name
            kind
          }
        }
        ... on Collection {
          slug
          title
          schemaDefinition {
            name
            kind
          }
        }
      }
    }
    ...ModelListPageFragment
  }
`;

const fragment = graphql`
  fragment EntityLinksListFragment on Entity {
    ... on Item {
      slug
      links(page: $page) {
        ...EntityLinksListDataFragment
      }
    }
    ... on Collection {
      slug
      links(page: $page) {
        ...EntityLinksListDataFragment
      }
    }
  }
`;

export default EntityLinksList;
