import { useEffect, useRef } from "react";
import { useKeycloak } from "@react-keycloak/ssr";
import { useRouter } from "next/router";
import type { KeycloakInstance } from "keycloak-js";

export default function SignInPage() {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const attemptedLoginRef = useRef(false);

  useEffect(
    function () {
      if (!initialized || typeof window === "undefined") {
        return;
      }

      if (keycloak?.authenticated) {
        router.push("/");

        return;
      }

      if (attemptedLoginRef.current) {
        console.error(
          "[auth] Prevented repeated sign-in redirect loop on /sign_in.",
        );

        return;
      }

      attemptedLoginRef.current = true;

      keycloak
        ?.login()
        .catch((error: unknown) => {
          console.error("[auth] Keycloak login failed.", error);
        })
        .finally(() => {
          attemptedLoginRef.current = false;
        });
    },
    [initialized, keycloak, router],
  );

  return null;
}
