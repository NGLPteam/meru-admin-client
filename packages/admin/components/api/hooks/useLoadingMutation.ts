import { useCallback } from "react";
import {
  useMutation,
  type GraphQLTaggedNode,
  type UseMutationConfig,
} from "react-relay";
import { Disposable, MutationParameters } from "relay-runtime";
import { usePageContext } from "hooks";

/**
 * Drop-in replacement for `useMutation` that toggles the global PageContext
 * `loading` flag while the mutation is in flight, so the top progress bar shows.
 */
export default function useLoadingMutation<M extends MutationParameters>(
  mutation: GraphQLTaggedNode,
) {
  const { setLoading } = usePageContext();
  const [commit, inFlight] = useMutation<M>(mutation);

  const wrapped = useCallback(
    (config: UseMutationConfig<M>): Disposable => {
      setLoading(true);
      return commit({
        ...config,
        onCompleted: (response, errors) => {
          setLoading(false);
          config.onCompleted?.(response, errors);
        },
        onError: (error) => {
          setLoading(false);
          config.onError?.(error);
        },
      });
    },
    [commit, setLoading],
  );

  return [wrapped, inFlight] as const;
}
