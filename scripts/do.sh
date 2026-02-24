#!/usr/bin/env bash

# Used in package.json scripts
# Usage: scripts/do.sh [start | build]

set -eu

usage() {
  >&2 echo "Usage: $0 [start | build]"
  >&2 echo -e "\tEnsure WDP_APP is in the environment for selective compilation, otherwise it will run in parallel."
}

run_command() {
  local cmd="${1?'Must specify a command to start'}"
  local app="${2:-all}"

  case "$app" in
    admin)
      >&2 echo "Running command '${cmd}' for WDP App '${app}'"

      yarn workspace "@wdp/$app" run "$cmd"
      ;;
    *)
      npm-run-all -l --parallel "$cmd":*
      ;;
  esac
}

COMMAND="${1?'Must specify a command to start'}"

APP="${WDP_APP:-all}"

case "$COMMAND" in
  start | build)
    run_command "$COMMAND" "$APP"
    ;;
  *)
    >&2 echo "Unsupported command: ${COMMAND}"
    >&2 echo

    usage

    exit 1
esac
