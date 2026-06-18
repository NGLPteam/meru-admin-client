import isNil from "lodash/isNil";
import {
  Breadcrumbs,
  NamedLink,
  SidebarNav,
  MobileSubNav,
  TabNav,
} from "components/atomic";
import { ContentHeader } from "components/layout";
import { ContentHeaderFragment$key } from "@/relay/ContentHeaderFragment.graphql";
import * as Styled from "./PageHeader.styles";

type BreadcrumbProps = React.ComponentProps<typeof Breadcrumbs>;
type NamedLinkProps = React.ComponentProps<typeof NamedLink>;
type ContentHeaderProps = React.ComponentProps<typeof ContentHeader>;
type SidebarNavProps = React.ComponentProps<typeof SidebarNav>;

/**
 * Wrapper for content header, breadcrumbs, and child tabs
 */
const PageHeader = ({
  title,
  titleTag,
  breadcrumbsProps,
  tabRoutes,
  tabLinksOnly,
  buttons,
  headerStyle = "primary",
  hideHeader = false,
  sidebarLinks,
  data,
}: Props) => {
  return (
    <Styled.Header
      className={hideHeader ? "a-hidden" : ""}
      $headerStyle={headerStyle}
    >
      {!isNil(breadcrumbsProps) ? <Breadcrumbs {...breadcrumbsProps} /> : null}
      <ContentHeader
        data={data}
        headerStyle={headerStyle}
        title={title}
        titleTag={titleTag}
        rightSide={buttons}
      />
      {tabRoutes && (
        <Styled.TabsWrapper>
          <TabNav links={tabRoutes} linksOnly={tabLinksOnly} />
        </Styled.TabsWrapper>
      )}
      {(tabRoutes || sidebarLinks) && (
        <Styled.MobileNavWrapper>
          <MobileSubNav tabRoutes={tabRoutes} sidebarLinks={sidebarLinks} />
        </Styled.MobileNavWrapper>
      )}
    </Styled.Header>
  );
};

interface Link extends NamedLinkProps {
  label?: string;
}

interface Props extends Pick<ContentHeaderProps, "headerStyle"> {
  /** Page title */
  title?: string | null;
  /** Optional tag rendered inline with the title (e.g. status badge) */
  titleTag?: React.ReactNode;
  /** Breadcrumb props to be passed down to Breadcrumbs component */
  breadcrumbsProps?: BreadcrumbProps;
  /** Child tabs (TabNav) */
  tabRoutes?: Link[];
  tabLinksOnly?: boolean;
  /** Child buttons */
  buttons?: React.ReactNode;
  /** Hides the header visually, leaves header in for screen readers */
  hideHeader?: boolean;
  /** Sidebar links */
  sidebarLinks?: SidebarNavProps["links"];
  data?: ContentHeaderFragment$key | null;
}

export default PageHeader;
