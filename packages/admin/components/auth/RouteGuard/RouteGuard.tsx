import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSignInOut } from "@wdp/lib/api/hooks/useIsAuthenticated";
import { useIsAuthorized } from "hooks";
import { useViewerContext } from "contexts";
import UnauthorizedMessage from "../UnauthorizedMessage";

export default function RouteGuard({ children }: Props) {
  const { handleSignInOut, isAuthenticated } = useSignInOut();
  const router = useRouter();

  // Check if the viewer context is loading (auth state is undetermined)
  const { loading } = useViewerContext();

  useEffect(() => {
    // If user is unauthenticated, redirect to the login screen
    if (isAuthenticated === false) handleSignInOut();
  }, [isAuthenticated, handleSignInOut]);

  const isAuthorized = useIsAuthorized({
    actions: "admin.access",
  });

  // Allow authenticated users to access the homepage and my-submissions routes
  const isOpenRoute =
    router.pathname === "/" || router.pathname.startsWith("/my-submissions");

  // If the user is authorized or on an open route, show children
  // If we've finished loading the page and the user is not authorized, show message
  return isAuthorized || isOpenRoute ? (
    <>{children}</>
  ) : loading ? null : (
    <UnauthorizedMessage />
  );
}

interface Props {
  children: React.ReactNode;
}
