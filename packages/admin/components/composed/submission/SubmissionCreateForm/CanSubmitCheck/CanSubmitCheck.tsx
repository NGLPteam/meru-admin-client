import { useRouter } from "next/router";
import { graphql, useFragment } from "react-relay";
import { RouteHelper } from "routes";
import type { CanSubmitCheckFragment$key } from "@/relay/CanSubmitCheckFragment.graphql";
import InvalidTarget from "../InvalidTarget";
import SubmissionCreateForm from "../SubmissionCreateForm";
import type { PreselectedTarget } from "../types";

type Props = {
  data: CanSubmitCheckFragment$key;
  preselectedTarget?: PreselectedTarget;
  preselectedCollectionId?: string;
};

export default function CanSubmitCheck({
  data,
  preselectedTarget,
  preselectedCollectionId,
}: Props) {
  const router = useRouter();

  const { submissionTargets } = useFragment(fragment, data);
  const targets = submissionTargets.nodes;

  const depositableTargets = targets.filter((t) => t.canDeposit.value);

  const redirectToList = () => {
    const route = RouteHelper.findRouteByName("my-submissions");
    if (route) router.push({ pathname: route.path });
  };

  const redirectToEdit = (slug: string) => {
    const route = RouteHelper.findRouteByName(
      "my-submissions.detail.details.edit",
    );
    if (route) router.push({ pathname: route.path, query: { slug } });
  };

  const canDeposit =
    (preselectedTarget && preselectedTarget.canDeposit.value) ||
    (!preselectedTarget && !!depositableTargets.length);

  if (!canDeposit) {
    return (
      <InvalidTarget
        preselectedTarget={preselectedTarget}
        hasDepositableTargets={!!depositableTargets.length}
      />
    );
  }

  return (
    <SubmissionCreateForm
      depositableTargets={[...depositableTargets]}
      preselectedTarget={preselectedTarget}
      preselectedCollectionId={preselectedCollectionId}
      onSuccess={redirectToEdit}
      onCancel={redirectToList}
    />
  );
}

const fragment = graphql`
  fragment CanSubmitCheckFragment on Query {
    submissionTargets(filters: { inState: [OPEN] }) {
      nodes {
        id
        depositMode
        canDeposit {
          value
        }
        canRequestDepositAccess {
          value
        }
        entity {
          ... on Collection {
            id
            slug
            title
          }
        }
        depositTargets {
          id
          entity {
            ... on Collection {
              title
              submissionTarget {
                id
              }
            }
          }
        }
        schemaVersions {
          id
          name
          identifier
        }
      }
    }
  }
`;
