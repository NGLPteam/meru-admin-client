import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { RouteHelper } from "routes";
import MessageBlock from "components/atomic/MessageBlock";
import type { CanSubmitCheckFragment$key } from "@/relay/CanSubmitCheckFragment.graphql";
import SubmissionCreateForm from "../SubmissionCreateForm";

type Props = {
  data: CanSubmitCheckFragment$key;
  preselectedTargetId?: string;
};

export default function CanSubmitCheck({ data, preselectedTargetId }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const { submissionTargets } = useFragment(fragment, data);
  const targets = submissionTargets.nodes;

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

  if (!targets.length) {
    return (
      <MessageBlock
        type="empty"
        name={t("messages.no_targets_heading")}
        message={t("messages.no_targets_message")}
      />
    );
  }

  return (
    <SubmissionCreateForm
      targets={[...targets]}
      preselectedTargetId={preselectedTargetId}
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
        agreementRequired
        agreementContent
        description {
          instructions
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
