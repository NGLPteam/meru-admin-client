import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
} from "components/api/MutationForm";
import { getContributorDisplayName } from "components/composed/contributor/ContributorDisplayName/ContributorDisplayName";

import type {
  UpdateContributionInput,
  ContributionUpdateFormMutation,
} from "@/relay/ContributionUpdateFormMutation.graphql";
import type { ContributionUpdateFormFragment$key } from "@/relay/ContributionUpdateFormFragment.graphql";
import type { ContributionUpdateFormFieldsFragment$key } from "@/relay/ContributionUpdateFormFieldsFragment.graphql";

export default function ContributionUpdateForm({
  data,
  onSuccess,
  onCancel,
}: Props) {
  const { t } = useTranslation();

  const maybeContribution = useFragment<ContributionUpdateFormFragment$key>(
    fragment,
    data,
  );

  let title = "";
  let objectLabel = "forms.fields.object";
  switch (maybeContribution.__typename) {
    case "ItemContribution":
      objectLabel = "forms.fields.item";
      title = maybeContribution.item.title || "";
      break;
    case "CollectionContribution":
      objectLabel = "forms.fields.collection";
      title = maybeContribution.collection.title || "";
      break;
  }

  const role =
    maybeContribution.__typename !== "%other"
      ? maybeContribution.contributionRole?.label
      : "";

  /* eslint-disable max-len */
  const defaultValues = useFragment<ContributionUpdateFormFieldsFragment$key>(
    fieldsFragment,
    maybeContribution.__typename !== "%other" ? maybeContribution : null,
  );
  /* eslint-enable max-len */

  const toVariables = useToVariables<ContributionUpdateFormMutation, Fields>(
    (data) => {
      const contributionId =
        maybeContribution.__typename !== "%other"
          ? maybeContribution.contributionId
          : "";
      return { input: { ...data, contributionId } };
    },
    [],
  );

  const renderForm = useRenderForm<Fields>(
    ({ form: { register } }) => (
      <Forms.Grid>
        <Forms.Input
          name=""
          label="forms.fields.contributor"
          disabled
          defaultValue={getContributorDisplayName(
            maybeContribution.__typename !== "%other"
              ? maybeContribution.contributor
              : null,
          )}
        />
        <Forms.Input
          name=""
          label={objectLabel}
          disabled
          defaultValue={title}
        />
        <Forms.Input
          name=""
          label="forms.fields.role"
          disabled
          defaultValue={role}
        />
        <Forms.Fieldset
          label={t("forms.fields.position")}
          description={t("forms.fields.order_description")}
        >
          <Forms.Input
            type="number"
            label="forms.fields.inner_position"
            description="forms.fields.inner_position_description"
            {...register("innerPosition", { valueAsNumber: true })}
          />
          <Forms.Input
            type="number"
            label="forms.fields.outer_position"
            description="forms.fields.outer_position_description"
            {...register("outerPosition", { valueAsNumber: true })}
          />
        </Forms.Fieldset>
      </Forms.Grid>
    ),
    [],
  );

  return (
    <MutationForm<ContributionUpdateFormMutation, Fields>
      name="updateContribution"
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.update.contribution_success"
      mutation={mutation}
      toVariables={toVariables}
      defaultValues={defaultValues || {}}
    >
      {renderForm}
    </MutationForm>
  );
}

interface Props extends Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> {
  data: ContributionUpdateFormFragment$key;
}

type Fields = Omit<UpdateContributionInput, "contributionId">;

const fieldsFragment = graphql`
  fragment ContributionUpdateFormFieldsFragment on AnyContribution {
    ... on CollectionContribution {
      innerPosition
      outerPosition
    }
    ... on ItemContribution {
      innerPosition
      outerPosition
    }
  }
`;

const mutation = graphql`
  mutation ContributionUpdateFormMutation($input: UpdateContributionInput!) {
    updateContribution(input: $input) {
      contribution {
        ...ContributionUpdateFormFieldsFragment
      }
      ...MutationForm_mutationErrors
    }
  }
`;

const fragment = graphql`
  fragment ContributionUpdateFormFragment on AnyContribution {
    __typename
    ... on CollectionContribution {
      contributionId: id
      contributor {
        __typename
        ... on OrganizationContributor {
          slug
          legalName
        }
        ... on PersonContributor {
          slug
          givenName
          familyName
        }
      }
      collection {
        title
      }
      contributionRole {
        id
        label
      }
      ...ContributionUpdateFormFieldsFragment
    }
    ... on ItemContribution {
      contributionId: id
      contributor {
        __typename
        ... on OrganizationContributor {
          slug
          legalName
        }
        ... on PersonContributor {
          slug
          givenName
          familyName
        }
      }
      item {
        title
      }
      title
      contributionRole {
        id
        label
      }
      ...ContributionUpdateFormFieldsFragment
    }
  }
`;
