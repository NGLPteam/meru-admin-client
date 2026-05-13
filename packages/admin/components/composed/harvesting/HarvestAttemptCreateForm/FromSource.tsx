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
  HarvestAttemptFromSourceInput,
  FromSourceMutation,
} from "@/relay/FromSourceMutation.graphql";
import type { newHarvestAttemptFromSourceQuery } from "@/relay/newHarvestAttemptFromSourceQuery.graphql";
import Fields from "./Fields";

export default function HarvestAttemptCreateForm({ harvestSource }: Props) {
  const router = useRouter();
  const { slug } = useParams();

  const toVariables = useToVariables<
    FromSourceMutation,
    HarvestAttemptFromSourceInput
  >(
    (data) => ({
      input: {
        ...data,
        harvestSourceId: harvestSource?.id ?? "",
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
    redirect("harvestSource.harvestAttempts", slug as string);

  const onSuccess = useOnSuccess<
    FromSourceMutation,
    HarvestAttemptFromSourceInput
  >(
    ({ response }: { response: FromSourceMutation["response"] }) => {
      if (response?.harvestAttemptFromSource?.harvestAttempt)
        redirect(
          "harvestAttempt.details",
          response.harvestAttemptFromSource.harvestAttempt.slug,
        );
    },
    [redirect],
  );

  return (
    <MutationForm<FromSourceMutation, HarvestAttemptFromSourceInput>
      name="harvestAttemptFromSource"
      mutation={mutation}
      defaultValues={{
        extractionMappingTemplate: harvestSource?.extractionMappingTemplate,
      }}
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.create.harvest_attempt_success"
      toVariables={toVariables}
      refetchTags={["harvestAttempts"]}
    >
      {() => <Fields harvestSource={harvestSource} />}
    </MutationForm>
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  harvestSource: newHarvestAttemptFromSourceQuery["response"]["harvestSource"];
}

const mutation = graphql`
  mutation FromSourceMutation($input: HarvestAttemptFromSourceInput!) {
    harvestAttemptFromSource(input: $input) {
      harvestAttempt {
        slug
        ...HarvestAttemptCreateFormFieldsFragment
      }
      ...MutationForm_mutationErrors
    }
  }
`;
