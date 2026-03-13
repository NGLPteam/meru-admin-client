import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@react-keycloak/ssr";
import { graphql, usePreloadedQuery, PreloadedQuery } from "react-relay";
import { useViewerContext } from "contexts";
import { useIsAuthorized } from "hooks";
import { MessageBanner } from "components/atomic";
import { DashboardLayoutQuery } from "@/relay/DashboardLayoutQuery.graphql";
import DashboardInstallation from "../DashboardInstallation";
import DashboardCollections from "../DashboardCollections";
import DashboardItems from "../DashboardItems";
import DashboardDepositor from "../DashboardDepositor";
import * as Styled from "./DashboardLayout.styles";
import type { KeycloakInstance } from "keycloak-js";

export default function DashboardLayout({ queryRef }: Props) {
  const queryData = usePreloadedQuery(query, queryRef);
  const { t } = useTranslation();

  const { globalAdmin } = useViewerContext();

  const { keycloak } = useKeycloak<KeycloakInstance>();
  const userId = keycloak?.subject;

  const isAdmin = useIsAuthorized({ actions: "admin.access" });
  const cookieName = `no_admin_banner_dismissed_${userId}`;
  const [bannerDismissed, setBannerDismissed] = useState(() =>
    typeof document !== "undefined"
      ? document.cookie.includes(`${cookieName}=1`)
      : false,
  );

  if (!isAdmin) {
    return (
      <Styled.Wrapper>
        {!bannerDismissed && (
          <Styled.BannerArea>
            <MessageBanner
              variant="info"
              icon="warning"
              name={t("dashboard.no_admin_access_title")}
              message={t("dashboard.no_admin_access_message")}
              onDismiss={() => {
                document.cookie = `${cookieName}=1; path=/; max-age=31536000`;
                setBannerDismissed(true);
              }}
            />
          </Styled.BannerArea>
        )}
        <DashboardDepositor data={queryData} />
      </Styled.Wrapper>
    );
  }

  return (
    <Styled.Wrapper>
      <DashboardCollections data={queryData} />
      {globalAdmin ? (
        <DashboardInstallation data={queryData} />
      ) : (
        <DashboardItems data={queryData} />
      )}
    </Styled.Wrapper>
  );
}

interface Props {
  queryRef: PreloadedQuery<DashboardLayoutQuery>;
}

export const query = graphql`
  query DashboardLayoutQuery($page: Int, $order: EntityOrder, $viewerId: ID!) {
    ...DashboardInstallationFragment
    ...DashboardCollectionsFragment @arguments(page: $page, order: $order)
    ...DashboardItemsFragment @arguments(page: $page, order: $order)
    ...DashboardDepositorFragment @arguments(viewerId: $viewerId)
  }
`;
