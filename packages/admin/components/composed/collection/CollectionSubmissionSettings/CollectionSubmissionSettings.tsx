import { useFragment, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { MessageBanner } from "components/atomic/MessageBanner";
import SubmissionTargetConfigureForm from "components/composed/submissionTarget/SubmissionTargetConfigureForm";
import SubmissionTargetStateToggle from "components/composed/submissionTarget/SubmissionTargetStateToggle";
import type { CollectionSubmissionSettingsFragment$key } from "@/relay/CollectionSubmissionSettingsFragment.graphql";
import * as Styled from "./CollectionSubmissionSettings.styles";

export default function CollectionSubmissionSettings({ data }: Props) {
  const { t } = useTranslation();

  const collection = useFragment<CollectionSubmissionSettingsFragment$key>(
    fragment,
    data,
  );

  const { collectionId, schemaVersion, submissionTarget } = collection;

  return (
    <>
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
        collectionSchema={schemaVersion}
        data={submissionTarget ?? null}
      />
    </>
  );
}

interface Props {
  data: CollectionSubmissionSettingsFragment$key;
}

const fragment = graphql`
  fragment CollectionSubmissionSettingsFragment on Collection {
    collectionId: id
    schemaVersion {
      submittableVersions {
        id
        name
      }
    }
    submissionTarget {
      ...SubmissionTargetConfigureFormFragment
      ...SubmissionTargetStateToggleFragment
    }
  }
`;
