import { useMemo } from "react";
import { graphql } from "react-relay";
import { useMaybeFragment } from "@wdp/lib/api/hooks";
import { useGlobalContext, useViewerContext } from "contexts";
import { useChildRouteLinksFragment$key } from "@/relay/useChildRouteLinksFragment.graphql";
import { RouteHelper } from "../routes";
import useLatestPresentValue from "./useLatestPresentValue";
import type { Props as NamedLinkProps } from "components/atomic/links/NamedLink/NamedLink";

interface Link extends NamedLinkProps {
  label?: string;
  actions?: string[] | undefined;
}

export function useChildRouteLinks(
  parentRoute: string,
  query: { [key: string]: string | number | string[] | undefined },
  /** Optional allowed actions data. Will be compared to actions on the route. */
  data?: useChildRouteLinksFragment$key | null,
): Link[] {
  const mainRoute = RouteHelper.findRouteByName(parentRoute);

  const entity = useMaybeFragment(fragment, data);

  const memoizedEntity = useLatestPresentValue(entity);

  const viewer = useViewerContext();

  const globalData = useGlobalContext();
  const depositingEnabled =
    globalData?.globalConfiguration?.depositing?.enabled ?? false;

  const childRoutes = useMemo(() => {
    if (!mainRoute || !mainRoute.routes) return [];
    return mainRoute.routes;
  }, [mainRoute]);

  const links = useMemo(() => {
    const filteredRoutes = childRoutes.filter((route) => {
      if (route.depositing && !depositingEnabled) return false;
      if (route.childKinds) {
        const allowed = route.childKinds.every((kind) =>
          memoizedEntity?.current?.schemaVersion?.enforcedChildKinds?.includes(
            kind,
          ),
        );
        if (!allowed) return false;
      }
      // If no actions are defined, we assume this route is accessible.
      if (!route.actions || route.actions.length === 0) return true;

      // Filter routes by checking if all actions are included in allowedActions
      return route.actions.every(
        (action) =>
          memoizedEntity?.current?.allowedActions?.includes(action) ||
          viewer?.allowedActions?.includes(action),
      );
    });

    return filteredRoutes.map((childRoute) => ({
      label: childRoute.label,
      route: childRoute.name,
      query: query,
      actions: childRoute.actions,
    }));
  }, [childRoutes, memoizedEntity, query, viewer, depositingEnabled]);

  return links;
}

export default useChildRouteLinks;

const fragment = graphql`
  fragment useChildRouteLinksFragment on Entity {
    allowedActions
    schemaVersion {
      enforcedChildKinds
    }
  }
`;
