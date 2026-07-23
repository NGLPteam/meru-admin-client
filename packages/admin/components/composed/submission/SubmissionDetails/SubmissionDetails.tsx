import { useFragment, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { formatDate } from "@wdp/lib/helpers";
import DataList from "components/atomic/DataList";
import type { SubmissionDetailsFragment$key } from "@/relay/SubmissionDetailsFragment.graphql";
import SubmissionContributors from "../SubmissionContributors";
import SchemaFields from "./SchemaFieldsDisplay";
import Image from "./ImageDisplay";
import * as Styled from "./SubmissionDetails.styles";

export default function SubmissionDetails({ data }: Props) {
  const { t } = useTranslation();
  const submission = useFragment<SubmissionDetailsFragment$key>(fragment, data);

  const item =
    submission.entity?.__typename === "Item" ? submission.entity : null;

  return (
    <Styled.Wrapper>
      <DataList>
        <DataList.Item
          wide
          label={t("forms.fields.thumbnail")}
          value={
            <Image
              data={item?.thumbnail}
              placeholderProps={{
                seed: item?.id ?? "",
                title: item?.title,
              }}
            />
          }
        />
        <DataList.Item label={t("forms.fields.title")} value={item?.title} />
        <DataList.Item
          label={t("forms.fields.subtitle")}
          value={item?.subtitle}
        />
        <DataList.Item
          label={t("forms.fields.collection")}
          value={submission.submissionTarget?.entity?.title}
        />
        <DataList.Item
          label={t("forms.fields.last_updated")}
          value={formatDate(submission.updatedAt)}
        />
        <DataList.Item
          label={t("forms.fields.summary")}
          value={item?.summary}
          wide
        />
      </DataList>
      {item && (
        <>
          <SubmissionContributors data={item} readonly />
          <SchemaFields data={item} />
        </>
      )}
    </Styled.Wrapper>
  );
}

interface Props {
  data: SubmissionDetailsFragment$key;
}

const fragment = graphql`
  fragment SubmissionDetailsFragment on Submission {
    state
    updatedAt
    entity {
      __typename
      ... on Item {
        id
        title
        subtitle
        summary
        thumbnail {
          ...ImageDisplayFragment
        }
        heroImage {
          ...ImageDisplayFragment
        }
        ...SchemaFieldsDisplayFragment
        ...SubmissionContributorsFragment
      }
    }
    submissionTarget {
      entity {
        title
      }
    }
  }
`;
