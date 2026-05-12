import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import ModelListPage from "components/composed/model/ModelListPage";
import { useDestroyer, useDrawerHelper } from "hooks";
import ModelColumns from "components/composed/model/ModelColumns";
import { ButtonControlGroup, ButtonControlDrawer } from "components/atomic";
import PageHeader from "components/layout/PageHeader";
import {
  ContributorListFragment$key,
  ContributorListFragment$data,
} from "@/relay/ContributorListFragment.graphql";
import { getContributorDisplayName } from "../ContributorDisplayName";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function ContributorList({
  data,
  headerStyle,
  hideHeader,
}: ContributorListProps) {
  const { t } = useTranslation();
  const destroy = useDestroyer();
  const drawerHelper = useDrawerHelper();

  const { contributors } =
    useFragment<ContributorListFragment$key>(fragment, data) ?? {};

  const columns = [
    ModelColumns.ContributorNameColumn<ContributorNode>(),
    ModelColumns.ContributorAffiliationColumn<ContributorNode>(),
    ModelColumns.ContributorContributionsColumn<ContributorNode>(),
    ModelColumns.CreatedAtColumn<ContributorNode>(),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<ContributorNode>) => {
      if (row.original.__typename === "%other") return;
      drawerHelper.open("editContributor", { drawerSlug: row.original.slug });
    },
    handleDelete: ({ row }: ModelTableActionProps<ContributorNode>) => {
      if (row.original.__typename === "%other") return;
      destroy.contributor(
        { contributorId: row.original.id || "" },
        getContributorDisplayName(row.original) || "glossary.collection",
      );
    },
    handleView: ({ row }: ModelTableActionProps<ContributorNode>) =>
      row.original.slug ? `/contributors/${row.original.slug}` : null,
  };

  // TODO: We need an authorization check here. The contributors.create check doesn't
  //  exist yet in the API.
  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <ButtonControlDrawer drawer="addPerson" icon="plus">
        {t("actions.create.contributor_person")}
      </ButtonControlDrawer>
      <ButtonControlDrawer drawer="addOrganization" icon="plus">
        {t("actions.create.contributor_organization")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<
      ContributorListFragment$data["contributors"],
      ContributorNode
    >
      modelName="contributor"
      buttons={buttons}
      columns={columns}
      actions={actions}
      data={contributors}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      hideFilters
    />
  );
}

interface ContributorListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: ContributorListFragment$key;
}

type ContributorNode =
  ContributorListFragment$data["contributors"]["nodes"][number];

const fragment = graphql`
  fragment ContributorListFragment on Query {
    contributors(
      order: $order
      page: $page
      perPage: 20
      filters: { nameSearch: { needle: $query, strategy: FUZZY } }
    ) {
      nodes {
        __typename
        ... on OrganizationContributor {
          id
          slug
          legalName
          createdAt
          ...ContributorNameColumnFragment
        }
        ... on PersonContributor {
          id
          slug
          givenName
          familyName
          createdAt
        }
        ...ContributorNameColumnFragment
        ...ContributorAffiliationColumnFragment
        ...ContributorContributionsColumnFragment
      }
      ...ModelListPageFragment
    }
  }
`;

export default ContributorList;
