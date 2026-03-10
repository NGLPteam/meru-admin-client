import { useFragment, graphql } from "react-relay";
import { Forms } from "components/api/MutationForm";
import { formatDate } from "@wdp/lib/helpers";
import MockInput from "components/forms/MockInput";
import type { SubmissionDetailsFragment$key } from "@/relay/SubmissionDetailsFragment.graphql";

export default function SubmissionDetails({ data }: Props) {
  const submission = useFragment<SubmissionDetailsFragment$key>(fragment, data);

  const item =
    submission.entity?.__typename === "Item" ? submission.entity : null;

  const thumbnailUrl = item?.thumbnail?.small?.png?.url;
  const heroImageUrl = item?.heroImage?.small?.png?.url;

  return (
    <Forms.Grid>
      <MockInput label="forms.fields.title" value={item?.title ?? ""} isWide />
      <MockInput
        label="forms.fields.subtitle"
        value={item?.subtitle ?? ""}
        isWide
      />
      <MockInput
        label="forms.fields.collection"
        value={submission.submissionTarget?.entity?.title ?? ""}
      />
      <MockInput label="forms.fields.status" value={submission.state} />
      <MockInput
        label="forms.fields.last_updated"
        value={formatDate(submission.updatedAt)}
      />
      <MockInput
        label="forms.fields.thumbnail"
        value={
          thumbnailUrl ? (
            <img src={thumbnailUrl} alt={item?.title ?? ""} />
          ) : null
        }
      />
      <MockInput
        label="forms.fields.hero_image"
        value={
          heroImageUrl ? (
            <img src={heroImageUrl} alt={item?.title ?? ""} />
          ) : null
        }
      />
      <MockInput
        label="forms.fields.summary"
        value={item?.summary ?? ""}
        isWide
      />
    </Forms.Grid>
  );
}

interface Props {
  data: SubmissionDetailsFragment$key;
}

const fragment = graphql`
  fragment SubmissionDetailsFragment on Submission {
    state
    createdAt
    updatedAt
    entity {
      __typename
      ... on Item {
        title
        subtitle
        summary
        thumbnail {
          small {
            png {
              url
            }
          }
        }
        heroImage {
          small {
            png {
              url
            }
          }
        }
      }
    }
    submissionTarget {
      entity {
        title
      }
    }
  }
`;
