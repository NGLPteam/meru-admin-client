import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import startCase from "lodash/startCase";
import { useChildRouteLinks, useMaybeFragment, useRouteSlug } from "hooks";
import { PageHeader, BackToAll } from "components/layout";
import { ButtonControlGroup, ButtonControlRoute } from "components/atomic";
import HtmlHead from "components/global/HtmlHead";
import type { HarvestMappingLayoutFragment$key } from "@/relay/HarvestMappingLayoutFragment.graphql";

export default function HarvestMappingLayout({
  children,
  data,
}: {
  children: React.ReactNode;
  data?: HarvestMappingLayoutFragment$key | null;
  useRouteHeader?: boolean;
}) {
  const slug = useRouteSlug() || undefined;
  const manageRoutes = useChildRouteLinks("harvestMapping", { slug });
  const { harvestSource, harvestSet, targetEntity } =
    useMaybeFragment(fragment, data) ?? {};

  const { t } = useTranslation();

  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      {slug && (
        <ButtonControlRoute
          route="harvestMapping.harvestAttempt.new"
          query={{ slug }}
          icon="plus"
        >
          {t("actions.add.harvest_attempt")}
        </ButtonControlRoute>
      )}
    </ButtonControlGroup>
  );

  const set = harvestSet?.identifier
    ? t("harvesting.set", { set: harvestSet.identifier })
    : "";
  const title = `[${startCase(
    targetEntity?.harvestTargetKind.toLowerCase(),
  )}: ${targetEntity?.title}]${set}`;

  return (
    <>
      <HtmlHead title={title} />
      <section>
        {harvestSource && (
          <BackToAll
            route="harvestSource.mappings"
            query={{ slug: harvestSource.slug }}
            label={harvestSource.name}
          />
        )}
        <PageHeader
          title={title}
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
  fragment HarvestMappingLayoutFragment on HarvestMapping {
    harvestSource {
      slug
      name
    }
    harvestSet {
      identifier
    }
    targetEntity {
      harvestTargetKind
      title
    }
  }
`;
