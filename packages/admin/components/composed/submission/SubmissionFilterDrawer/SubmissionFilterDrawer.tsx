import { useTranslation } from "react-i18next";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Drawer } from "components/layout";
import { SubmissionFilterDrawerQuery as Query } from "@/relay/SubmissionFilterDrawerQuery.graphql";
import SubmissionFilterForm from "../SubmissionFilterForm";
import type { DialogProps } from "reakit/Dialog";
import type { SubmissionState } from "types/graphql-schema";

interface Props {
  dialog: DialogProps;
  stateOptions: SubmissionState[];
}

export default function SubmissionFilterDrawer({
  dialog,
  stateOptions,
}: Props) {
  const { t } = useTranslation();

  const data = useLazyLoadQuery<Query>(query, {});

  const schemaOptions = data.schemaVersionOptions.map((opt) => ({
    label: opt.schemaVersion.name,
    value: opt.schemaVersion.id,
  }));

  const targetOptions = (data.submissionTargets?.nodes ?? []).map((node) => ({
    label: node.entity?.title ?? node.id,
    value: node.id,
  }));

  return (
    <Drawer
      label={t("search.filter_options")}
      dialog={dialog}
      hideOnClickOutside={false}
    >
      <SubmissionFilterForm
        stateOptions={stateOptions}
        schemaOptions={schemaOptions}
        targetOptions={targetOptions}
        onSuccess={dialog.hide}
        onCancel={dialog.hide}
      />
    </Drawer>
  );
}

const query = graphql`
  query SubmissionFilterDrawerQuery {
    schemaVersionOptions(kind: ITEM) {
      value
      schemaVersion {
        id
        name
      }
    }
    submissionTargets {
      nodes {
        id
        entity {
          ... on Collection {
            title
          }
        }
      }
    }
  }
`;
