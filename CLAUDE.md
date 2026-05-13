# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NGLP Web Delivery Platform (WDP) client — a Yarn Workspaces + Turbo monorepo with the admin Next.js app and shared packages. The backend is a GraphQL API (Meru).

## Common Commands

```sh
yarn install                  # Install all dependencies
yarn dev                      # Start admin app (:3000)
yarn build                    # Build the app
yarn start                    # Start the built admin app
yarn lint                     # Lint all packages
yarn fix                      # Auto-fix lint issues
yarn types                    # TypeScript type-check all packages
yarn schema                   # Regenerate GraphQL schema + codegen types
yarn relay                    # Compile Relay artifacts
```

To run commands for a single workspace: `yarn workspace @wdp/admin run <script>` (or `@wdp/lib`).

## Monorepo Structure

| Package | Path | Description |
|---------|------|-------------|
| `@wdp/admin` | `packages/admin` | Admin app — Next.js **Pages Router**, styled-components, Keycloak SSO |
| `@wdp/lib` | `packages/lib` | Shared components, hooks, contexts, theme, helpers |
| `@wdp/eslint` | `packages/eslint` | Shared ESLint flat config |
| `@wdp/tsconfig` | `packages/tsconfig` | Shared TypeScript config |

## Architecture

### Admin app

Uses the Next.js **Pages Router**, Keycloak SSO via `@react-keycloak/ssr`, styled-components for styling, and `next-i18next` for translations. Provider hierarchy: `SSRKeycloakProvider → KeycloakRelayProvider → AppContextProvider`.

### GraphQL + Relay

Data fetching uses **Relay Runtime** with GraphQL. The workflow:
1. Write GraphQL queries/mutations/fragments inline with `graphql` tagged templates
2. Run `yarn relay` to compile Relay artifacts into `__generated__/` directories
3. Run `yarn schema` to regenerate `schema.graphql` and TypeScript types from the API

The admin app has its own `relay.config.js`, `schema.graphql`, and `codegen.ts`. Custom scalar types: `Slug`, `ISO8601DateTime`, `ISO8601Date` (all map to `string`).

### Shared library (`@wdp/lib`)

Exports shared code consumed by the admin app: `api` (contexts, hooks, components for Relay/query state), `theme`, `atomic` components, `routes`, `hooks`, `helpers`, `keycloak`, `search`, and `svgs`.

### Component organization

Components follow an atomic design pattern:
- `atomic/` — small reusable UI (buttons, inputs, links); not tied to API data
- `composed/` — larger composed components; can be tied to API data
- `factories/` — mapped components with shared props (e.g., icon factories)
- `form/` — form components and scaffolding (uses react-hook-form)
- `layout/` — grids, cards, layout primitives
- `global/` — app-wide components (header, footer, navigation)
- `svgs/` — icons and logos

Naming convention: lowercase plural folders for collections (`buttons/`), camelCase singular for single components (`Header/`). Each component folder contains `index.tsx`, `ComponentName.tsx`, and `styles.ts`.

### Styling

styled-components with a theme system in `/theme/`.

### State management

React Context for app state (`PageContext`, `QueryStateContext`, `QueryVariablesContext`, `RouterContext`, `RelayRecordSubscribeContext`). Relay handles server data caching. Forms use react-hook-form.

### Coding conventions

- **Use Relay-generated types for form fields.** Don't write custom `Fields` types for `MutationForm` — import the mutation input type (e.g. `SubmissionTargetConfigureInput`) from the generated `@/relay/` types and use it directly. See `HarvestAttemptCreateForm/FromSource.tsx` for the pattern.
- **Don't over-memoize.** Avoid `useMemo` for cheap computations (mapping arrays, filtering). Avoid `useRef` to work around stale closures — add the value to the dependency array instead. Only reach for `useMemo`/`useRef` when there's a measurable performance reason.

### Authentication

Keycloak SSO via `@react-keycloak/ssr` with silent SSO check.

### Environment

- Node 24.x, Yarn 4.13.0 (with node-modules linker)
- Key env vars: `NEXT_PUBLIC_API_URL` (GraphQL endpoint), `NEXT_PUBLIC_TUS_URL` (file uploads via Tus protocol), Keycloak config vars
- Sandbox API: `https://api.sandbox.meru.host/graphql`

## CI

GitHub Actions runs `yarn lint` and `yarn build:ci` on pushes/PRs to main. No automated test suite.
