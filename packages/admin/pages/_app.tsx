import { Suspense } from "react";
import Head from "next/head";
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";
import { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { KeycloakRelayProvider, keycloakConfig } from "@wdp/lib/keycloak";
import {
  parseCookies,
  useRemoveServerInjectedCSS,
  useDeserializeRecords,
} from "@wdp/lib/app";
import { AppContextProvider } from "contexts";
import GlobalStyles from "theme";
import { AppBody, DrawerController, RouterProgress } from "components/global";
import { RouteHelper } from "routes";
import { Toast, LoadingPage } from "components/atomic";
import { updateI18n } from "../i18n";
import type { Page } from "@wdp/lib/types/page";
import type { KeycloakInitOptions } from "keycloak-js";
import type { AppProps, AppContext } from "next/app";

const NGLPApp = ({
  Component,
  pageProps,
  cookies = {},
  records: r,
}: AppProps & InitialProps) => {
  updateI18n("en");

  useRemoveServerInjectedCSS();
  const records = useDeserializeRecords(r);

  const persistor = SSRCookies(cookies);

  const initOptions: KeycloakInitOptions = {
    onLoad: "check-sso",
  };

  if (typeof window !== "undefined" && window?.location?.origin) {
    initOptions.silentCheckSsoRedirectUri = `${window.location.origin}/silent-sso.html`;
  }

  const ssrProps: KeycloakProviderProps = {
    initOptions,
    keycloakConfig,
    LoadingComponent: <LoadingPage />,
    persistor,
  };

  // Handle redirect routes.
  const router = useRouter();
  if (typeof window !== "undefined") {
    const activeRoute = RouteHelper.activeRoute();
    if (activeRoute?.redirect) {
      router.replace({
        pathname: activeRoute?.redirect,
        query: { ...router.query },
      });
    }
  }

  const defaultLayout = ({
    PageComponent,
    pageComponentProps,
  }: {
    PageComponent: typeof Component;
    pageComponentProps: typeof pageProps;
  }) => {
    return <PageComponent {...pageComponentProps} />;
  };

  const getLayout = Component.getLayout || defaultLayout;

  return (
    <>
      <Head>
        <title>Meru Admin</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <GlobalStyles />
      <SSRKeycloakProvider {...ssrProps}>
        <KeycloakRelayProvider records={records} isAdmin>
          <AppContextProvider>
            <RouterProgress />
            <AppBody>
              <Toast />
              <Suspense fallback={<LoadingPage />}>
                {getLayout({
                  PageComponent: Component,
                  pageComponentProps: pageProps,
                })}
              </Suspense>
              <DrawerController />
            </AppBody>
          </AppContextProvider>
        </KeycloakRelayProvider>
      </SSRKeycloakProvider>
    </>
  );
};

NGLPApp.getInitialProps = async (context: AppContext) => {
  return {
    cookies: parseCookies(context?.ctx?.req) || {},
    pageProps: {},
  };
};
interface InitialProps {
  cookies?: Record<string, string>;
  records?: RecordMap;
  Component: Page;
}

type KeycloakProviderProps = React.ComponentProps<typeof SSRKeycloakProvider>;

export default appWithTranslation(NGLPApp);
