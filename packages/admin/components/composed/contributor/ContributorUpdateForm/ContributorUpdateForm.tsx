import { graphql } from "react-relay";
import ContributorUpdatePersonForm from "components/composed/contributor/ContributorUpdatePersonForm";
import ContributorUpdateOrganizationForm from "components/composed/contributor/ContributorUpdateOrganizationForm";
import { useMaybeFragment } from "hooks";
import MutationForm from "components/api/MutationForm";
import type { ContributorUpdateFormFragment$key } from "@/relay/ContributorUpdateFormFragment.graphql";

export default function ContributorUpdateForm({
  data,
  onSuccess,
  onCancel,
}: Props) {
  const contributor = useMaybeFragment<ContributorUpdateFormFragment$key>(
    fragment,
    data,
  );

  if (contributor?.__typename === "PersonContributor")
    return (
      <ContributorUpdatePersonForm
        onSuccess={onSuccess}
        onCancel={onCancel}
        data={contributor}
      />
    );
  if (contributor?.__typename === "OrganizationContributor")
    return (
      <ContributorUpdateOrganizationForm
        onSuccess={onSuccess}
        onCancel={onCancel}
        data={contributor}
      />
    );

  return null;
}

const fragment = graphql`
  fragment ContributorUpdateFormFragment on Contributor {
    __typename
    ... on PersonContributor {
      ...ContributorUpdatePersonFormFragment
    }
    ... on OrganizationContributor {
      ...ContributorUpdateOrganizationFormFragment
    }
  }
`;

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  data?: ContributorUpdateFormFragment$key | null;
}
