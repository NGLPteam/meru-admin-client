import { useFragment, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import capitalize from "lodash/capitalize";
import { ContentHeader } from "components/layout";
import { MessageBanner } from "components/atomic/MessageBanner";
import type { CollectionSubmissionSettingsFragment$key } from "@/relay/CollectionSubmissionSettingsFragment.graphql";
import type { submissionsManageSlugCollectionsPagesQuery$data } from "@/relay/submissionsManageSlugCollectionsPagesQuery.graphql";
import SubmissionTargetConfigureForm from "./SubmissionTargetConfigureForm";
import SubmissionTargetStateToggle from "./SubmissionTargetStateToggle";
import * as Styled from "./CollectionSubmissionSettings.styles";

export default function CollectionSubmissionSettings({
  data,
  schemaVersionOptions,
}: Props) {
  const { t } = useTranslation();

  const collection = useFragment<CollectionSubmissionSettingsFragment$key>(
    fragment,
    data,
  );

  const { collectionId, submissionTarget } = collection;

  return (
    <>
      <ContentHeader
        headerStyle="secondary"
        title={capitalize(t("glossary.submission_other"))}
      />
      {submissionTarget ? (
        <Styled.ToggleWrapper>
          <SubmissionTargetStateToggle data={submissionTarget} />
        </Styled.ToggleWrapper>
      ) : (
        <MessageBanner
          name={t("messages.submission_target_required_name")}
          message={t("messages.submission_target_required")}
          variant="info"
          icon="statusWarning"
        />
      )}
      <SubmissionTargetConfigureForm
        collectionId={collectionId}
        data={submissionTarget ?? null}
        schemaVersionOptions={schemaVersionOptions}
      />
    </>
  );
}

interface Props {
  data: CollectionSubmissionSettingsFragment$key;
  schemaVersionOptions: submissionsManageSlugCollectionsPagesQuery$data["schemaVersionOptions"];
}

const fragment = graphql`
  fragment CollectionSubmissionSettingsFragment on Collection {
    collectionId: id
    submissionTarget {
      ...SubmissionTargetConfigureFormFragment
      ...SubmissionTargetStateToggleFragment
    }
  }
`;
