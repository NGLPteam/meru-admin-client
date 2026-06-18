import { useCallback } from "react";
import { graphql } from "react-relay";
import { useRouter } from "next/router";
import MutationForm, {
  useToVariables,
  useOnSuccess,
} from "components/api/MutationForm";
import { RouteHelper } from "routes";
import { useParams } from "next/navigation";
import type {
  HarvestAttemptFromMappingInput,
  FromMappingMutation,
} from "@/relay/FromMappingMutation.graphql";
import type { newHarvestAttemptFromMappingQuery } from "@/relay/newHarvestAttemptFromMappingQuery.graphql";

import Fields from "./Fields";

export default function HarvestAttemptFromMapping({ harvestMapping }: Props) {
  const router = useRouter();
  const { slug } = useParams();

  const toVariables = useToVariables<
    FromMappingMutation,
    HarvestAttemptFromMappingInput
  >(
    (data) => ({
      input: {
        ...data,
        harvestMappingId: harvestMapping?.id ?? "",
      },
    }),
    [],
  );

  const redirect = useCallback(
    (routeName: string, slug?: string) => {
      const newRoute = RouteHelper.findRouteByName(routeName);

      router.push({
        pathname: newRoute?.path,
        ...(slug ? { query: { slug } } : {}),
      });
    },
    [router],
  );

  const onCancel = () =>
    redirect("harvestMapping.harvestAttempts", slug as string);

  const onSuccess = useOnSuccess<
    FromMappingMutation,
    HarvestAttemptFromMappingInput
  >(
    ({ response }: { response: FromMappingMutation["response"] }) => {
      if (response?.harvestAttemptFromMapping?.harvestAttempt)
        redirect(
          "harvestAttempt.details",
          response.harvestAttemptFromMapping.harvestAttempt.slug,
        );
    },
    [redirect],
  );

  return (
    <MutationForm<FromMappingMutation, HarvestAttemptFromMappingInput>
      name="harvestAttemptFromMapping"
      mutation={mutation}
      defaultValues={{
        extractionMappingTemplate: harvestMapping?.extractionMappingTemplate,
      }}
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.create.harvest_attempt_success"
      toVariables={toVariables}
      refetchTags={["harvestAttempts"]}
    >
      {() => <Fields harvestMapping={harvestMapping} />}
    </MutationForm>
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  harvestMapping: newHarvestAttemptFromMappingQuery["response"]["harvestMapping"];
}

const mutation = graphql`
  mutation FromMappingMutation($input: HarvestAttemptFromMappingInput!) {
    harvestAttemptFromMapping(input: $input) {
      harvestAttempt {
        slug
        ...HarvestAttemptCreateFormFieldsFragment
      }
      ...MutationForm_mutationErrors
    }
  }
`;
