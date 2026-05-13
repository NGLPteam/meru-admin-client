import { useCallback } from "react";
import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify } from "hooks";
import { Button } from "components/atomic";
import {
  ConfirmPruneFromHarvestSourceMutation,
  ConfirmPruneFromHarvestSourceMutation$data,
} from "@/relay/ConfirmPruneFromHarvestSourceMutation.graphql";
import {
  ConfirmPruneFromHarvestAttemptMutation,
  ConfirmPruneFromHarvestAttemptMutation$data,
} from "@/relay/ConfirmPruneFromHarvestAttemptMutation.graphql";
import * as Styled from "../PruneEntitiesModal.styles";
import type {
  HarvestPruneMode,
  MutationAttributeError,
} from "types/graphql-schema";

type Props = {
  mode: string;
  onBack: () => void;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "source" | "attempt";
  id: string;
  title: string;
};

export default function Confirm({
  mode,
  onBack,
  type,
  id,
  title,
  handleClose,
}: Props) {
  const notify = useNotify();
  const { t } = useTranslation();

  const [commitPruneAttempt] =
    useLoadingMutation<ConfirmPruneFromHarvestAttemptMutation>(attemptMutation);
  const [commitPruneSource] =
    useLoadingMutation<ConfirmPruneFromHarvestSourceMutation>(sourceMutation);

  const handleResponse = useCallback(
    (
      data:
        | ConfirmPruneFromHarvestSourceMutation$data["harvestSourcePruneEntities"]
        | ConfirmPruneFromHarvestAttemptMutation$data["harvestAttemptPruneEntities"]
        | null
        | undefined,
      e: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (!data) return;
      const result =
        "harvestSource" in data
          ? data.harvestSource
          : "harvestAttempt" in data
            ? data.harvestAttempt
            : null;
      const { globalErrors, attributeErrors } = data ?? {};

      if (handleClose) handleClose(e);

      if (result?.id) {
        notify.success(t("messages.delete.prune_success", { title }));
      } else if (globalErrors?.length) {
        notify.mutationGlobalError(globalErrors);
      } else if (attributeErrors?.length) {
        notify.mutationAttributeError(
          attributeErrors as MutationAttributeError[],
        );
      }
    },
    [notify, t, handleClose, title],
  );

  const handlePruneAttempt = (e: React.MouseEvent<HTMLButtonElement>) => {
    commitPruneAttempt({
      variables: {
        input: { harvestAttemptId: id, mode: mode as HarvestPruneMode },
      },
      onCompleted: (response) =>
        handleResponse(response["harvestAttemptPruneEntities"], e),
    });
  };

  const handlePruneSource = (e: React.MouseEvent<HTMLButtonElement>) => {
    commitPruneSource({
      variables: {
        input: { harvestSourceId: id, mode: mode as HarvestPruneMode },
      },
      onCompleted: (response) =>
        handleResponse(response["harvestSourcePruneEntities"], e),
    });
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    return type === "source" ? handlePruneSource(e) : handlePruneAttempt(e);
  };

  return (
    <>
      <Styled.Header>
        {t(`harvesting.prune.mode_${mode.toLowerCase()}_confirm_header`)}
      </Styled.Header>
      <Styled.Subheader className="t-label-sm">{title}</Styled.Subheader>
      <div>{t("harvesting.prune.confirm_body")}</div>
      <Styled.ButtonWrapper>
        <Button onClick={onConfirm}>{t("common.confirm")}</Button>
        <Button $secondary onClick={onBack}>
          {t("common.back")}
        </Button>
      </Styled.ButtonWrapper>
    </>
  );
}

const attemptMutation = graphql`
  mutation ConfirmPruneFromHarvestAttemptMutation(
    $input: HarvestAttemptPruneEntitiesInput!
  ) {
    harvestAttemptPruneEntities(input: $input) {
      harvestAttempt {
        id
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

const sourceMutation = graphql`
  mutation ConfirmPruneFromHarvestSourceMutation(
    $input: HarvestSourcePruneEntitiesInput!
  ) {
    harvestSourcePruneEntities(input: $input) {
      harvestSource {
        id
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
