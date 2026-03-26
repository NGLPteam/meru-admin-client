import { graphql } from "react-relay";
import { useMaybeFragment } from "hooks";
import { SiteLogoUploadFragment$key } from "@/relay/SiteLogoUploadFragment.graphql";
import BaseFileUpload from "../BaseFileUpload";
import * as Styled from "./SiteLogoUpload.styles";

type UploadProps = React.ComponentProps<typeof BaseFileUpload>;

export default function SiteLogoUpload({ data, ...inputProps }: Props) {
  const imageData = useMaybeFragment(fragment, data);
  // Base file upload has a strict image object
  const image = {
    png: { url: imageData?.original.url, alt: imageData?.original?.alt },
  };

  return (
    <Styled.Wrapper>
      <BaseFileUpload
        image={image}
        originalFilename={imageData?.originalFilename}
        storage={imageData?.storage ? imageData.storage.toString() : undefined}
        accept="image/*"
        {...inputProps}
      />
    </Styled.Wrapper>
  );
}

interface Props extends Omit<UploadProps, "image" | "storage"> {
  data?: SiteLogoUploadFragment$key | null;
}

const fragment = graphql`
  fragment SiteLogoUploadFragment on SiteLogoAttachment {
    originalFilename
    storage
    original {
      url
      alt
    }
  }
`;
