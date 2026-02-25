import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { graphql } from "react-relay";
import { useChildRouteLinks, useMaybeFragment, useRouteSlug } from "hooks";
import {
  ButtonControlGroup,
  ButtonControlConfirm,
  ButtonControlDrawer,
  ButtonControlRoute,
  NamedLink,
  ReviewFeedback,
  StatusBadge,
} from "components/atomic";
import { IconFactory } from "components/factories";
import { PageHeader, BackToAll } from "components/layout";
import HtmlHead from "components/global/HtmlHead";
import { MOCK_SUBMISSIONS } from "components/composed/submission/SubmissionList/mockData";
import type { SubmissionLayoutFragment$key } from "@/relay/SubmissionLayoutFragment.graphql";
import * as Styled from "./SubmissionLayout.styles";

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
  const item = useMaybeFragment(fragment, data);
  const isEditing = router.asPath.endsWith("/edit");

  // Fall back to mock data when no API data is available
  const submission = MOCK_SUBMISSIONS.find((s) => s.slug === slug);
  const title = item?.title || submission?.title;

  // TODO (pagination): When real API data replaces mocks, "Review Next" will
  // need to fetch the next page of results at the boundary (e.g. after the last
  // submission on a page, fetch the next page). For now we use the mock array.
  const currentIndex = MOCK_SUBMISSIONS.findIndex((s) => s.slug === slug);
  const nextSlug =
    currentIndex >= 0 && currentIndex < MOCK_SUBMISSIONS.length - 1
      ? MOCK_SUBMISSIONS[currentIndex + 1].slug
      : null;

  const isPublished = submission?.status === "Published";

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
      ) : submission?.status === "Draft" ||
        submission?.status === "Revisions Requested" ? (
        <ButtonControlConfirm
          modalLabel={
            submission.status === "Draft"
              ? t("actions.submit_for_review")
              : t("actions.resubmit_for_review")
          }
          modalBody={
            submission.status === "Draft"
              ? t("actions.submit_for_review_confirm")
              : t("actions.resubmit_for_review_confirm")
          }
          aria-label={
            submission.status === "Draft"
              ? t("actions.submit_for_review")
              : t("actions.resubmit_for_review")
          }
          onClick={handleSubmitForReview}
          icon="arrow"
        >
          {submission.status === "Draft"
            ? t("actions.submit_for_review")
            : t("actions.resubmit_for_review")}
        </ButtonControlConfirm>
      ) : null}
    </ButtonControlGroup>
  ) : undefined;

  return (
    <>
      <HtmlHead title={title} />
      <section>
        <Styled.NavRow>
          <BackToAll route={parentRoute} />
          {nextSlug && parentRoute === "submissions" && (
            <NamedLink
              route="submissions.detail.details"
              query={{ slug: nextSlug }}
              passHref
            >
              <Styled.ReviewNextLink className="a-link">
                <span>{t("actions.review_next")}</span>
                <IconFactory icon="arrow" rotate={90} size="xs" />
              </Styled.ReviewNextLink>
            </NamedLink>
          )}
        </Styled.NavRow>
        <PageHeader
          title={title}
          titleTag={
            submission?.status ? (
              <StatusBadge status={submission.status} />
            ) : undefined
          }
          tabRoutes={tabRoutes}
          tabLinksOnly
          buttons={buttons}
        />
        {submission?.reviewComment && (
          <ReviewFeedback
            name={t("submission_detail.revisions_requested")}
            message={submission.reviewComment}
          />
        )}
        {children}
      </section>
    </>
  );
}

const fragment = graphql`
  fragment SubmissionLayoutFragment on Item {
    __typename
    slug
    title
  }
`;
