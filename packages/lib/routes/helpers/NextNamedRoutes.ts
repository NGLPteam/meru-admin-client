type ChildEntityKind = "COLLECTION" | "ITEM";

const nextStylePathComponent = /\[[^/]+\]/g;

export type BaseRoute = {
  name: string;
  label?: string;
  path?: string;
  redirect?: string;
  routes?: BaseRoute[];
  actions?: string[];
  childKinds?: ChildEntityKind[];
  depositing?: boolean;
};

export type Route = {
  name: string;
  label?: string;
  identifiers: string[];
  path: string;
  regex: RegExp;
  fuzzyRegex: RegExp;
  redirect?: string;
  routes?: BaseRoute[];
  actions?: string[];
};

class NextNamedRoutes {
  constructor(baseRoutes?: BaseRoute[]) {
    // Recursively add base routes
    if (baseRoutes) {
      this.addBaseRoutes(baseRoutes);
    }
  }

  /**
   * All registered routes.
   */
  routes: Route[] = [];

  /**
   * Registers a named route. The path should be the filesystem path corresponding to the route.
   */
  public add = ({
    name,
    path,
    redirect,
    routes,
    label,
    actions,
  }: BaseRoute): NextNamedRoutes => {
    if (!name || !path) {
      console.error(
        `Route requires a name and path. name: ${name}, path: ${path}`,
      );
      return this;
    }

    if (this.findRouteByName(name)) {
      throw new Error(`Duplicate route added: ${name}`);
    }

    this.routes.push({
      name,
      identifiers: NextNamedRoutes.identifiersInPath(path),
      path,
      regex: NextNamedRoutes.pathToRegex(path),
      fuzzyRegex: NextNamedRoutes.fuzzyPathToRegex(path),
      redirect,
      routes,
      label,
      actions,
    });
    return this;
  };

  /**
   * Returns the currently active route (based on window.location)
   * Uses regex matching internally
   */
  public activeRoute = (): Route | null => {
    if (typeof window !== "undefined") {
      const rn = this.findRouteByPath(window.location.pathname);
      if (!rn) {
        console.warn(
          `No route associated with this pathname: ${window.location.pathname}`,
        );
        return null;
      }

      return rn;
    }
    return null;
  };

  /**
   * Returns true if the passed route or child routes are currently active
   * Uses regex if defined, else checks route name for a match
   */
  public isRouteActive = (route: Route | undefined): boolean => {
    if (!route) return false;
    const activeRoute = this.activeRoute();

    // Alternatively, we can check if any of the route's children
    // are the currently active route
    return route?.regex && route.regex.test(activeRoute?.path || "");
  };

  /**
   * Returns true if the passed route or child routes are currently active
   * Uses regex if defined, else checks route name for a match
   */
  public isRouteNameActive = (name: string): boolean => {
    const route = this.findRouteByName(name);
    return this.isRouteActive(route);
  };

  /**
   * Returns true if the passed route or child routes are currently active
   * Uses regex if defined, else checks route name for a match
   */
  public isRouteFuzzyActive = (route: Route): boolean => {
    if (!route) return false;
    const activeRoute = this.activeRoute();

    // Alternatively, we can check if any of the route's children
    // are the currently active route
    return route?.fuzzyRegex
      ? route.fuzzyRegex.test(activeRoute?.path || "")
      : this.isRouteActive(route);
  };

  /**
   * Returns true if the passed route or child routes are currently active
   * Uses regex if defined, else checks route name for a match
   */
  public isRouteNameFuzzyActive = (name: string): boolean => {
    const route = this.findRouteByName(name);
    return route ? this.isRouteFuzzyActive(route) : false;
  };

  /**
   * Returns metadata about a route given its name.
   * @param name The name of the route you want to find.
   */
  public findRouteByName = (name: string): Route | undefined => {
    return this.routes.find((route) => route.name === name);
  };

  /**
   * Returns metadata about a route, based on a browser path.
   * Uses regex matching internally.
   * @param path The path to search for.
   */
  public findRouteByPath = (path: string): Route | undefined => {
    return this.routes.find((route) => route.regex.test(path));
  };

  /**
   * Returns the pathname (what is visible in URL bar) for the given route and parameters
   * @param name The route to render.
   * @param params The parameters that should be injected into the route
   */
  private pathnameForParams(
    name: string,
    params: { [key: string]: string },
  ): string {
    const route = this.findRouteByName(name);
    if (!route) {
      throw new Error(`Could not find route: ${name}`);
    }

    return NextNamedRoutes.injectParamsIntoPath(route.path, params);
  }

  /**
   * Recursively adds base routes
   * @param baseRoutes The routes to add
   */
  private addBaseRoutes(baseRoutes: BaseRoute[]) {
    if (!baseRoutes) {
      throw new Error(`No base routes defined`);
    }

    const addRoute = ({
      name,
      path,
      redirect,
      routes,
      label,
      actions,
    }: BaseRoute) => {
      this.add({ name, path, redirect, routes, label, actions });

      if (routes) {
        routes.forEach(addRoute);
      }
    };

    baseRoutes.forEach(addRoute);
  }

  static injectParamsIntoPath(
    nextStylePath: string,
    params: { [key: string]: string },
  ): string {
    const identifiers = NextNamedRoutes.identifiersInPath(nextStylePath);
    const pathname = identifiers.reduce((prev, curr) => {
      return prev.replace(`[${curr}]`, params[curr]);
    }, nextStylePath);

    // Add any search params to the route
    const searchParams = Object.keys(params).filter(
      (key) => !identifiers.includes(key),
    );
    let searchParamString = "";
    if (searchParams.length > 0) {
      searchParams.forEach((key) => {
        if (params[key]) {
          if (searchParamString.length === 0) {
            searchParamString = "?";
          } else if (searchParamString.length > 1) {
            searchParamString += "&";
          }
          searchParamString +=
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }
      });
    }

    return pathname + searchParamString;
  }

  static pathToRegex(nextStylePath: string): RegExp {
    const escapedPath = nextStylePath.replace(/[-{}()*+?.,\\^$|#\s]/g, "\\$&");
    const identifiers = NextNamedRoutes.identifiersInPath(escapedPath);

    // Create a regex using the identifiers
    return new RegExp(
      "^" +
        identifiers.reduce((prev, curr) => {
          return prev.replace(`[${curr}]`, "(?:([^/]+?))");
        }, nextStylePath) +
        "$",
    );
  }

  static fuzzyPathToRegex(nextStylePath: string): RegExp {
    const escapedPath = nextStylePath.replace(/[-{}()*+?.,\\^$|#\s]/g, "\\$&");
    const identifiers = NextNamedRoutes.identifiersInPath(escapedPath);

    // Create a regex using the identifiers
    return new RegExp(
      "^" +
        identifiers.reduce((prev, curr) => {
          return prev.replace(`[${curr}]`, "(?:([^/]+?))");
        }, nextStylePath),
    );
  }

  static identifiersInPath(nextStylePath: string): string[] {
    const matches = [];

    // string.matchAll is not standard enough yet :(
    nextStylePathComponent.lastIndex = 0;
    let m = nextStylePathComponent.exec(nextStylePath);
    while (m) {
      matches.push(m[0]);
      m = nextStylePathComponent.exec(nextStylePath);
    }

    // Check for duplicates before returning, better be safe than sorry
    const seen: { [key: string]: boolean } = {};
    return matches.map((m) => {
      const id = m.substr(1, m.length - 2);
      if (seen[id]) {
        throw new Error(`Duplicate identifier in path ${nextStylePath}: ${id}`);
      }
      seen[id] = true;
      return id;
    });
  }
}

export default NextNamedRoutes;
