import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useChildRouteLinks, useMaybeFragment, useRouteSlug } from "hooks";
import { ButtonControlGroup, ButtonControlRoute } from "components/atomic";
import { PageHeader, BackToAll } from "components/layout";
import HtmlHead from "components/global/HtmlHead";
import type { HarvestSourceLayoutFragment$key } from "@/relay/HarvestSourceLayoutFragment.graphql";
import PruneEntitiesModal from "../PruneEntitiesModal";

export default function HarvestSourceLayout({
  children,
  data,
}: {
  children: React.ReactNode;
  data?: HarvestSourceLayoutFragment$key | null;
  useRouteHeader?: boolean;
}) {
  const { t } = useTranslation();
  const slug = useRouteSlug() || undefined;
  const manageRoutes = useChildRouteLinks("harvestSource", { slug });
  const harvestSource = useMaybeFragment(fragment, data);

  const buttons = slug && (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
      breakpoint={70}
    >
      <ButtonControlRoute
        route="harvestSource.mappings.new"
        query={{ slug }}
        icon="plus"
      >
        {t("actions.add.harvest_mapping")}
      </ButtonControlRoute>
      <ButtonControlRoute
        route="harvestSource.harvestAttempt.new"
        query={{ slug }}
        icon="plus"
      >
        {t("actions.add.harvest_attempt")}
      </ButtonControlRoute>
      {harvestSource?.id && (
        <PruneEntitiesModal
          id={harvestSource?.id}
          title={harvestSource?.name}
          type="source"
        />
      )}
    </ButtonControlGroup>
  );

  return (
    <>
      <HtmlHead title={harvestSource?.name} />
      <section>
        <BackToAll route="harvesting" />
        <PageHeader
          title={harvestSource?.name}
          tabRoutes={manageRoutes}
          tabLinksOnly
          buttons={buttons}
        />
        {children}
      </section>
    </>
  );
}

const fragment = graphql`
  fragment HarvestSourceLayoutFragment on HarvestSource {
    __typename
    slug
    name
    id
  }
`;
