import { usePreloadedQuery, graphql, PreloadedQuery } from "react-relay";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import GlobalSettingsPage from "components/composed/settings/GlobalSettingsPage";
import { useIsAuthorized } from "hooks";
import { LoadingPage } from "components/atomic";
import { RouteUnauthorizedMessage } from "components/auth/UnauthorizedMessage";
import HtmlHead from "components/global/HtmlHead";
import type { settingsPageQuery as Query } from "@/relay/settingsPageQuery.graphql";

export default function SettingsPageView() {
  const isAuthorized = useIsAuthorized({ actions: ["settings.update"] });

  if (!isAuthorized)
    return (
      <RouteUnauthorizedMessage i18nKey="messages.unauthorized_body.settings" />
    );

  return (
    <>
      <HtmlHead />
      <QueryTransitionWrapper<Query>
        query={query}
        variables={{}}
        refetchTags={["globalConfiguration"]}
        loadingFallback={<LoadingPage />}
      >
        {({ queryRef }) =>
          queryRef ? <ListQuery queryRef={queryRef} /> : <GlobalSettingsPage />
        }
      </QueryTransitionWrapper>
    </>
  );
}

const ListQuery = ({ queryRef }: { queryRef: PreloadedQuery<Query> }) => {
  const data = usePreloadedQuery<Query>(query, queryRef);

  return data && <GlobalSettingsPage data={data.globalConfiguration} />;
};

const query = graphql`
  query settingsPageQuery {
    globalConfiguration {
      ...GlobalSettingsPageFragment
    }
  }
`;
