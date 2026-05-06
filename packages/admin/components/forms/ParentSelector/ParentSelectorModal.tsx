import { useState } from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import Modal from "components/layout/Modal";
import { EntitySelector } from "components/forms";
import MutationForm, {
  useRenderForm,
  useToVariables,
} from "components/api/MutationForm";

import {
  ReparentEntityInput,
  ParentSelectorModalMutation,
} from "@/relay/ParentSelectorModalMutation.graphql";
import * as Styled from "./ParentSelector.styles";
import type { DialogState } from "reakit/Dialog";
import type { SchemaVersion } from "types/graphql-schema";

import type { EntityOption } from "components/forms/EntitySelector/EntitySelectorController";

export default function ParentSelectorModal({
  dialog,
  entityId,
  parentId,
  parentSlug,
  entityKind,
  entitySchemaVersion,
}: Props) {
  const { t } = useTranslation();

  const defaultValues = {
    parentId,
  };

  const toVariables = useToVariables<ParentSelectorModalMutation, Fields>(
    (data) => ({
      input: { ...data, childId: entityId },
    }),
    [],
  );

  const parentSchemas = entitySchemaVersion?.enforcesParent
    ? entitySchemaVersion.enforcedParentVersions?.map(
        (schema) => `${schema.namespace}:${schema.identifier}`,
      )
    : [];
  const parentKinds = entityKind === "collection" ? ["COLLECTION"] : [];

  const [selected, setSelected] = useState<EntityOption | undefined>(undefined);

  const renderForm = useRenderForm<Fields>(
    ({ form: { setValue, register } }) => {
      const onSelect = (entity: EntityOption | undefined) => {
        setValue("parentId", entity?.id ?? parentId);
        setSelected(entity);
      };

      return (
        <EntitySelector
          {...register("parentId", { required: true })}
          onSelect={onSelect}
          selected={selected}
          label={t("forms.parent.label")}
          startSlug={parentSlug}
          resetValue={parentId}
          omitSelfId={entityId}
          selectableTypes={{ kinds: parentKinds, schemas: parentSchemas }}
          height="40vh"
        />
      );
    },
    [selected],
  );

  return (
    <Modal
      label={t("forms.parent.change_label")}
      dialog={dialog}
      hideOnClickOutside={false}
    >
      {({ handleClose }) => (
        <Styled.ModalContent className="t-rte">
          <Styled.Message>{t("forms.parent.change_message")}</Styled.Message>
          <MutationForm<ParentSelectorModalMutation, Fields>
            name="reparentEntity"
            mutation={mutation}
            successNotification={t("messages.update.parent_success")}
            failureNotification={t("messages.update.parent_failure")}
            toVariables={toVariables}
            onSuccess={handleClose}
            onCancel={handleClose}
            defaultValues={defaultValues}
            hideGlobalErrorHeader
            refetchTags={["parent"]}
          >
            {renderForm}
          </MutationForm>
        </Styled.ModalContent>
      )}
    </Modal>
  );
}

interface EntitySchemaVersion extends Omit<
  Partial<SchemaVersion>,
  "enforcedParentVersions"
> {
  enforcedParentVersions: readonly { identifier: string; namespace: string }[];
}

type Props = {
  dialog: DialogState;
  entityId: string;
  entityKind: string;
  parentId: string;
  parentSlug?: string;
  entitySchemaVersion: EntitySchemaVersion;
};

type Fields = ReparentEntityInput;

const mutation = graphql`
  mutation ParentSelectorModalMutation($input: ReparentEntityInput!) {
    reparentEntity(input: $input) {
      ...MutationForm_mutationErrors
    }
  }
`;
