import { useRef } from "react";
import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import pick from "lodash/pick";
import MutationForm, {
  useRenderForm,
  useToVariables,
  useOnSuccess,
  Forms,
} from "components/api/MutationForm";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify, usePageContext } from "hooks";
import type {
  CreatePersonContributorFormMutation,
  CreatePersonContributorInput,
} from "@/relay/CreatePersonContributorFormMutation.graphql";
import type {
  CreatePersonContributorFormAddMutation,
  UpsertContributionInput,
} from "@/relay/CreatePersonContributorFormAddMutation.graphql";
import type { UseFormReturn } from "react-hook-form";
import type { MutationAttributeError } from "types/graphql-schema";

type Fields = Pick<
  CreatePersonContributorInput,
  "givenName" | "familyName" | "title" | "email" | "affiliation"
> &
  Pick<UpsertContributionInput, "roleId">;

interface Props {
  itemId: string;
  onClose: () => void;
}

export default function CreatePersonContributorForm({
  itemId,
  onClose,
}: Props) {
  const { t } = useTranslation();
  const notify = useNotify();
  const { setTriggeredRefetchTags } = usePageContext();
  const formRef = useRef<UseFormReturn<Fields> | null>(null);

  const [commitAdd] =
    useLoadingMutation<CreatePersonContributorFormAddMutation>(
      addContributionMutation,
    );

  const onSuccess = useOnSuccess<CreatePersonContributorFormMutation, Fields>(
    ({ response, values }) => {
      const contributorId = response.createPersonContributor?.contributor?.id;
      if (!contributorId) return;

      commitAdd({
        variables: {
          input: {
            contributableId: itemId,
            contributorId,
            roleId: values.roleId || undefined,
          },
        },
        onCompleted: (addResponse) => {
          const payload = addResponse.upsertContribution;

          if (payload?.contribution) {
            notify.success(t("messages.create.contribution_success"));
            setTriggeredRefetchTags(["contributions"]);
            formRef.current?.reset();
            onClose();
          } else if (payload?.globalErrors?.length) {
            notify.mutationGlobalError(payload.globalErrors);
          } else if (payload?.attributeErrors?.length) {
            notify.mutationAttributeError(
              payload.attributeErrors as MutationAttributeError[],
            );
          }
        },
        onError: () => notify.error(t("messages.create.contribution_failure")),
      });
    },
    [itemId, commitAdd, notify, t, setTriggeredRefetchTags, onClose],
  );

  const toVariables = useToVariables<
    CreatePersonContributorFormMutation,
    Fields
  >(
    (data) => ({
      input: pick(data, [
        "givenName",
        "familyName",
        "title",
        "email",
        "affiliation",
      ]),
    }),
    [],
  );

  const renderForm = useRenderForm<Fields>(
    ({ form }) => {
      formRef.current = form;
      return (
        <Forms.Grid>
          <Forms.Input
            label="forms.fields.given_name"
            {...form.register("givenName")}
          />
          <Forms.Input
            label="forms.fields.family_name"
            {...form.register("familyName")}
          />
          <Forms.Input label="forms.fields.title" {...form.register("title")} />
          <Forms.Email
            label="forms.fields.email"
            {...form.register("email")}
            description="Format: example@email.com"
          />
          <Forms.Input
            label="forms.fields.affiliation"
            {...form.register("affiliation")}
          />
          <Forms.ContributionRoleSelect
            id={itemId}
            label="forms.fields.role"
            {...form.register("roleId")}
          />
        </Forms.Grid>
      );
    },
    [itemId],
  );

  return (
    <MutationForm<CreatePersonContributorFormMutation, Fields>
      name="createPersonContributor"
      mutation={mutation}
      toVariables={toVariables}
      onSuccess={onSuccess}
      onCancel={onClose}
      saveLabel="common.save"
      failureNotification="messages.create.contributor_failure"
    >
      {renderForm}
    </MutationForm>
  );
}

const mutation = graphql`
  mutation CreatePersonContributorFormMutation(
    $input: CreatePersonContributorInput!
  ) {
    createPersonContributor(input: $input) {
      contributor {
        id
        __typename
        givenName
        familyName
      }
      ...MutationForm_mutationErrors
    }
  }
`;

const addContributionMutation = graphql`
  mutation CreatePersonContributorFormAddMutation(
    $input: UpsertContributionInput!
  ) {
    upsertContribution(input: $input) {
      contribution {
        ... on ItemContribution {
          id
          outerPosition
          contributionRole {
            id
            label
          }
          item {
            ...SubmissionContributorsFragment
          }
        }
      }
      globalErrors {
        message
        type
      }
      attributeErrors {
        messages
        path
        type
      }
    }
  }
`;
