import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { graphql } from "react-relay";
import { useChildRouteLinks, useMaybeFragment, useRouteSlug } from "hooks";
import {
  ButtonControlGroup,
  ButtonControlConfirm,
  ButtonControlDrawer,
  ButtonControlRoute,
} from "components/atomic";
import { StatusBadge } from "components/composed/submission/SubmissionList/StatusBadge";
import { PageHeader, BackToAll } from "components/layout";
import HtmlHead from "components/global/HtmlHead";
import type { SubmissionLayoutFragment$key } from "@/relay/SubmissionLayoutFragment.graphql";
import ReviewNav from "./ReviewNav";

export default function SubmissionLayout({
  children,
  data,
}: {
  children: React.ReactNode;
  data?: SubmissionLayoutFragment$key | null;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const slug = useRouteSlug() || undefined;

  // Derive route names from the current pathname
  const routePrefix = router.pathname.startsWith("/my-submissions")
    ? "my-submissions"
    : "submissions";
  const parentRoute = routePrefix;
  const detailRoute = `${routePrefix}.detail`;
  const editRoute = `${routePrefix}.detail.details.edit`;

  const tabRoutes = useChildRouteLinks(detailRoute, { slug });
  const submission = useMaybeFragment(fragment, data);
  const isEditing = router.asPath.endsWith("/edit");

  const title = submission?.entity?.title;
  const state = submission?.state;
  const isPublished = state === "PUBLISHED";

  const handleSubmitForReview = (hideDialog: () => void) => {
    // TODO: Wire up to real mutation when API is ready
    hideDialog();
  };

  const buttons = isEditing ? (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      <ButtonControlRoute
        route={`${detailRoute}.details`}
        query={{ slug }}
        icon="close"
      >
        {t("common.cancel")}
      </ButtonControlRoute>
    </ButtonControlGroup>
  ) : !isPublished ? (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      <ButtonControlRoute route={editRoute} query={{ slug }} icon="edit">
        {t("common.edit")}
      </ButtonControlRoute>
      {parentRoute === "submissions" ? (
        <ButtonControlDrawer
          drawer="reviewSubmission"
          drawerQuery={{ drawerSlug: slug || "" }}
          icon="edit"
        >
          {t("actions.review_submission")}
        </ButtonControlDrawer>
      ) : state === "DRAFT" || state === "REVISION_REQUESTED" ? (
        <ButtonControlConfirm
          modalLabel={
            state === "DRAFT"
              ? t("common.submit")
              : t("actions.submissions.resubmit")
          }
          modalBody={
            state === "DRAFT"
              ? t("common.submit")
              : t("actions.resubmit_for_review_confirm")
          }
          aria-label={
            state === "DRAFT"
              ? t("common.submit")
              : t("actions.resubmit_for_review")
          }
          onClick={handleSubmitForReview}
          icon="arrow"
        >
          {state === "DRAFT"
            ? t("common.submit")
            : t("actions.submissions.resubmit")}
        </ButtonControlConfirm>
      ) : null}
    </ButtonControlGroup>
  ) : undefined;

  return (
    <>
      <HtmlHead title={title} />
      <section>
        <BackToAll route={parentRoute} />
        <PageHeader
          title={title}
          titleTag={state ? <StatusBadge status={state} /> : undefined}
          tabRoutes={tabRoutes}
          tabLinksOnly
          buttons={buttons}
        />
        {children}
        {parentRoute === "submissions" && !isEditing && (
          <ReviewNav prevSlug={null} nextSlug={null} />
        )}
      </section>
    </>
  );
}

const fragment = graphql`
  fragment SubmissionLayoutFragment on Submission {
    state
    entity {
      ... on Entity {
        title
      }
    }
  }
`;
