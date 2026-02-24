import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import { useChildRouteLinks, useMaybeFragment, useRouteSlug } from "hooks";
import { ButtonControlGroup, ButtonControlDrawer } from "components/atomic";
import { PageHeader, BackToAll } from "components/layout";
import HtmlHead from "components/global/HtmlHead";
import { MOCK_SUBMISSIONS } from "components/composed/submission/SubmissionList/mockData";
import type { SubmissionLayoutFragment$key } from "@/relay/SubmissionLayoutFragment.graphql";

export default function SubmissionLayout({
  children,
  data,
  slug: slugProp,
  parentRoute = "my-submissions",
  detailRoute = "my-submissions.detail",
}: {
  children: React.ReactNode;
  data?: SubmissionLayoutFragment$key | null;
  slug?: string;
  parentRoute?: string;
  detailRoute?: string;
}) {
  const { t } = useTranslation();
  const routeSlug = useRouteSlug() || undefined;
  const slug = slugProp || routeSlug;
  const tabRoutes = useChildRouteLinks(detailRoute, { slug });
  const item = useMaybeFragment(fragment, data);

  // Fall back to mock data title when no API data is available
  const title =
    item?.title || MOCK_SUBMISSIONS.find((s) => s.slug === slug)?.title;

  const buttons = parentRoute === "submissions" && (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      <ButtonControlDrawer
        drawer="reviewSubmission"
        drawerQuery={{ drawerSlug: slug || "" }}
        icon="edit"
      >
        {t("actions.review_submission")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  return (
    <>
      <HtmlHead title={title} />
      <section>
        <BackToAll route={parentRoute} />
        <PageHeader
          title={title}
          tabRoutes={tabRoutes}
          tabLinksOnly
          buttons={buttons || undefined}
        />
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
