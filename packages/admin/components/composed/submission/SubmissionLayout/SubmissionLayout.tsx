import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { useChildRouteLinks, useRouteSlug } from "hooks";
import { ButtonControlGroup, ButtonControlDrawer } from "components/atomic";
import { StatusBadge } from "components/composed/submission/SubmissionList/StatusBadge";
import { PageHeader, BackToAll } from "components/layout";
import HtmlHead from "components/global/HtmlHead";
import type { SubmissionLayoutFragment$key } from "@/relay/SubmissionLayoutFragment.graphql";
import SubmitForReviewButton from "./SubmitForReviewButton";
import TransitionSubmissionButton from "./TransitionSubmissionButton";

const getRoutes = (mode: "deposit" | "review") => {
  if (mode === "deposit")
    return {
      parentRoute: "my-submissions",
      detailRoute: "my-submissions.detail",
    };

  return {
    parentRoute: "submissions",
    detailRoute: "submissions.detail",
  };
};

export default function SubmissionLayout({
  children,
  data,
  mode,
}: {
  children: React.ReactNode;
  data?: SubmissionLayoutFragment$key;
  mode: "deposit" | "review";
}) {
  const { t } = useTranslation();
  const slug = useRouteSlug() || undefined;

  const { parentRoute, detailRoute } = getRoutes(mode);
  const tabRoutes = useChildRouteLinks(detailRoute, { slug });

  const submission = useFragment(fragment, data);

  const title = submission?.entity?.title;
  const state = submission?.state;

  const canSubmit =
    submission?.availableTransitions.some(
      (transition) => transition.toState === "SUBMITTED",
    ) && mode === "deposit";
  const canReview =
    submission?.canReview.value &&
    !!submission?.availableTransitions.length &&
    state !== "DRAFT" &&
    mode === "review";
  const canTransition =
    !!submission?.availableTransitions.length && mode === "review";

  const buttons = (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      {canReview && (
        <ButtonControlDrawer
          drawer="reviewSubmission"
          drawerQuery={{ drawerSlug: slug || "" }}
          icon="edit"
        >
          {t("actions.submissions.review")}
        </ButtonControlDrawer>
      )}
      {canSubmit && <SubmitForReviewButton submission={submission} />}
      {canTransition && <TransitionSubmissionButton submission={submission} />}
    </ButtonControlGroup>
  );

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
        {/*{parentRoute === "submissions" && !isEditing && (
          <ReviewNav prevSlug={null} nextSlug={null} />
        )}*/}
      </section>
    </>
  );
}

const fragment = graphql`
  fragment SubmissionLayoutFragment on Submission {
    id
    state
    currentStatus {
      canTransition {
        value
      }
      lockedState
      mutableState
      fromState
      toState
    }
    availableTransitions {
      canTransition {
        value
      }
      lockedState
      mutableState
      fromState
      toState
    }
    canReview {
      value
    }
    canRequestReview {
      value
    }
    entity {
      ... on Entity {
        title
      }
    }
  }
`;
