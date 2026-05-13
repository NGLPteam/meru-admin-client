import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePageContext } from "hooks";

export default function RouterProgress() {
  const router = useRouter();
  const { setLoading } = usePageContext();

  useEffect(() => {
    const start = () => setLoading(true);
    const stop = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", stop);
    router.events.on("routeChangeError", stop);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", stop);
      router.events.off("routeChangeError", stop);
    };
  }, [router.events, setLoading]);

  return null;
}
