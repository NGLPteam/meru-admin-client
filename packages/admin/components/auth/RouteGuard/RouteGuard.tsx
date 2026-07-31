import { useEffect } from "react";
import { useSignInOut } from "@wdp/lib/api/hooks/useIsAuthenticated";
import { useRouter } from "next/router";
import { useIsAuthorized } from "hooks";
import { useViewerContext } from "contexts";
import UnauthorizedMessage from "../UnauthorizedMessage";

export default function RouteGuard({ children }: Props) {
  const { handleSignInOut, isAuthenticated } = useSignInOut();
  const router = useRouter();
  const isSignInRoute = router.pathname === "/sign_in";

  // Check if the viewer context is loading (auth state is undetermined)
  const { loading } = useViewerContext();

  useEffect(() => {
    if (isSignInRoute || typeof window === "undefined") {
      return;
    }

    // If user is unauthenticated, redirect to the login screen once.
    if (isAuthenticated === false) {
      const retryKey = `auth:redirect-attempted:${router.asPath}`;

      if (window.sessionStorage.getItem(retryKey) === "1") {
        console.error(
          "[auth] Prevented repeated sign-in redirect after a previous failed attempt.",
          {
            path: router.asPath,
          },
        );

        return;
      }

      window.sessionStorage.setItem(retryKey, "1");
      handleSignInOut();
    }
  }, [isSignInRoute, isAuthenticated, handleSignInOut, router.asPath]);

  useEffect(() => {
    if (isAuthenticated !== true || typeof window === "undefined") {
      return;
    }

    window.sessionStorage.removeItem(
      `auth:redirect-attempted:${router.asPath}`,
    );
  }, [isAuthenticated, router.asPath]);

  const isAuthorized = useIsAuthorized({
    actions: "admin.access",
  });

  if (isSignInRoute) {
    return <>{children}</>;
  }

  // If the user is authorized, show children
  // If we've finished loading the page and the user is not authorized, show message
  return isAuthorized ? (
    <>{children}</>
  ) : loading ? null : (
    <UnauthorizedMessage />
  );
}

interface Props {
  children: React.ReactNode;
}
