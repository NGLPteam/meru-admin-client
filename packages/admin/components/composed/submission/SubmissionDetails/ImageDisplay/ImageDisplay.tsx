import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { Image } from "components/atomic";
import { IconFactory } from "components/factories";
import { ProcessingFile } from "components/forms/FileUpload/BaseFileUpload/BaseFileUpload.styles";
import CoverPlaceholder from "@wdp/lib/atomic/CoverPlaceholder";
import { ImageDisplayFragment$key } from "@/relay/ImageDisplayFragment.graphql";
import * as Styled from "./ImageDisplay.styles";

export default function ImageDisplay({
  data,
  placeholderProps,
}: {
  data?: ImageDisplayFragment$key;
  placeholderProps: { seed: string; title?: string };
}) {
  const { t } = useTranslation();

  const image = useFragment(fragment, data);

  const canPreview = !!image?.thumb?.png?.url;
  const isProcessing = image?.storage === "CACHE";

  if (canPreview)
    return (
      <Styled.Wrapper>
        <Image
          data={image?.thumb?.png}
          objectFit="contain"
          height={300}
          width={300}
        />
      </Styled.Wrapper>
    );

  if (isProcessing)
    return (
      <Styled.Wrapper>
        <ProcessingFile>
          <IconFactory icon="file" size="xlg" />
          <div>
            {t("forms.file.processing", { name: image.originalFilename })}
          </div>
        </ProcessingFile>
      </Styled.Wrapper>
    );

  return (
    <Styled.Wrapper>
      <CoverPlaceholder {...placeholderProps} />
    </Styled.Wrapper>
  );
}

const fragment = graphql`
  fragment ImageDisplayFragment on ImageAttachment {
    originalFilename
    storage
    thumb {
      png {
        url
        ...ImageFragment
      }
    }
  }
`;
