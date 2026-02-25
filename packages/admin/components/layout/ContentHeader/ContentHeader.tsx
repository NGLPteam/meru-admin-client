import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { LoadingSkeleton, Markdown } from "components/atomic";
import { ContentHeaderFragment$key } from "@/relay/ContentHeaderFragment.graphql";
import * as Styled from "./ContentHeader.styles";

/**
 * Wrapper for content title and right side content
 */
const ContentHeader = ({
  data,
  title,
  titleTag,
  rightSide,
  headerStyle = "primary",
}: Props) => {
  const { markedForPurge } = useFragment(fragment, data) ?? {};

  const { t } = useTranslation();

  return (
    <Styled.Wrapper>
      {title ? (
        <Styled.TitleWrapper>
          <Styled.Title as={headerStyle === "primary" ? "h1" : "h2"}>
            <Markdown.Title>{title}</Markdown.Title>
          </Styled.Title>
          {titleTag}
          {markedForPurge && (
            <Styled.PurgeTag>{t("messages.marked_for_purge")}</Styled.PurgeTag>
          )}
        </Styled.TitleWrapper>
      ) : (
        <div style={{ height: "36px", width: "400px" }}>
          <LoadingSkeleton />
        </div>
      )}
      {rightSide && <Styled.RightSide>{rightSide}</Styled.RightSide>}
    </Styled.Wrapper>
  );
};

interface Props {
  /** Content title */
  title?: string | null;
  /** Optional tag rendered inline with the title (e.g. status badge) */
  titleTag?: React.ReactNode;
  /** Header style, default "primary" (h1) */
  headerStyle?: "primary" | "secondary";
  /** Optional right side content node. Can be a single button, multiple buttons, dropdown, etc. */
  rightSide?: React.ReactNode;
  data?: ContentHeaderFragment$key | null;
}

export default ContentHeader;

const fragment = graphql`
  fragment ContentHeaderFragment on Entity {
    markedForPurge
  }
`;
