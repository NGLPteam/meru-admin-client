# Meru Admin

## Development Environment

Meru is separated into workspaces:

- [admin](./packages/admin/README.md) - client admin app
- lib - library of shared components and themes
- eslint - shared lint config
- tsconfig - shared ts config

Install [mise](https://mise.jdx.dev/) and run `mise install` in the project root. This installs the Node and Yarn versions pinned in `mise.toml`.

```sh
mise install
yarn install
yarn dev
```

That's it!

- Admin: http://localhost:3000

### Changing the Node or Yarn version

`mise.toml` is the single source of truth for the Node and Yarn versions. Local development, GitHub Actions, and the Docker image all use the versions pinned there.

1. Edit `node_version` or `yarn_version` in `mise.toml`.
2. Run `mise install`. A postinstall hook (`mise/tasks/sync-tool-versions`) rewrites `packageManager` and `engines.node` in the root `package.json` and the `FROM` line in `Dockerfile` to match.
3. Commit the synced files alongside `mise.toml`.

The `engines.node` fields in the workspace `package.json` files under `packages/` are not synced by the hook. Update them by hand when the Node major version changes.
