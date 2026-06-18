import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import startCase from "lodash/startCase";
import { formatDate } from "@wdp/lib/helpers";
import { useChildRouteLinks, useMaybeFragment, useRouteSlug } from "hooks";
import { PageHeader, BackToAll } from "components/layout";
import { ButtonControlRoute, ButtonControlGroup } from "components/atomic";
import HtmlHead from "components/global/HtmlHead";
import type { HarvestAttemptLayoutFragment$key } from "@/relay/HarvestAttemptLayoutFragment.graphql";
import PruneEntitiesModal from "../PruneEntitiesModal";

export default function HarvestAttemptLayout({
  children,
  data,
}: {
  children: React.ReactNode;
  data?: HarvestAttemptLayoutFragment$key | null;
  useRouteHeader?: boolean;
}) {
  const { t } = useTranslation();
  const slug = useRouteSlug() || undefined;
  const manageRoutes = useChildRouteLinks("harvestAttempt", { slug });
  const {
    id,
    harvestSource,
    harvestMapping,
    harvestSet,
    beganAt,
    targetEntity,
  } = useMaybeFragment(fragment, data) ?? {};

  const format = harvestMapping?.metadataFormat;
  const target = targetEntity?.title;
  const mappingTitle = t("harvesting.mapping_breadcrumb", { format, target });

  const set = harvestSet?.identifier
    ? t("harvesting.set", { set: harvestSet.identifier })
    : "";
  const title = `[${startCase(
    targetEntity?.harvestTargetKind.toLowerCase(),
  )}: ${targetEntity?.title}]${set}${t("harvesting.at", {
    at: formatDate(beganAt ?? ""),
  })}`;

  const backToProps = harvestSource
    ? {
        route: "harvestSource.harvestAttempts",
        query: { slug: harvestSource.slug },
        label: harvestSource.name,
        ...(!!harvestMapping?.slug && {
          secondary: {
            route: "harvestMapping.harvestAttempts",
            query: { slug: harvestMapping.slug },
            label: mappingTitle,
          },
        }),
      }
    : null;

  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      {id && <PruneEntitiesModal id={id} title={title} type="attempt" />}
      {targetEntity?.slug && (
        <ButtonControlRoute
          route={targetEntity.harvestTargetKind.toLowerCase()}
          query={{ slug: targetEntity.slug }}
          icon="linkExternal"
        >
          {t("harvesting.view_target")}
        </ButtonControlRoute>
      )}
    </ButtonControlGroup>
  );

  return (
    <>
      <HtmlHead title={title} />
      <section>
        {backToProps && <BackToAll {...backToProps} />}
        <PageHeader title={title} tabRoutes={manageRoutes} buttons={buttons} />
        {children}
      </section>
    </>
  );
}

const fragment = graphql`
  fragment HarvestAttemptLayoutFragment on HarvestAttempt {
    id
    beganAt
    harvestSource {
      slug
      name
    }
    harvestSet {
      identifier
    }
    harvestMapping {
      slug
      metadataFormat
    }
    targetEntity {
      harvestTargetKind
      title
      slug
    }
  }
`;
