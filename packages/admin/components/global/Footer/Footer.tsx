import { useTranslation } from "react-i18next";
import { useMaybeFragment } from "@wdp/lib/api/hooks";
import { graphql } from "react-relay";
import appData from "fixtures/app.data";
import { InstallationLogo } from "components/global";
import { renderNavLink } from "helpers";
import { Authorize } from "components/auth";
import { NamedLink, Markdown } from "components/atomic";
import { useGlobalContext, useViewerContext } from "contexts";
import { FooterFragment$key } from "@/relay/FooterFragment.graphql";
import * as Styled from "./Footer.styles";

function Footer() {
  const { footerData } = appData;
  const { t } = useTranslation();

  const data = useGlobalContext();
  const depositingEnabled =
    data?.globalConfiguration?.depositing?.enabled ?? false;
  const { globalAdmin } = useViewerContext();

  const siteData = useMaybeFragment<FooterFragment$key>(
    fragment,
    data?.globalConfiguration,
  );

  const description = siteData?.site.footer.description;

  const renderGlobalSettings = () =>
    globalAdmin ? (
      <Styled.ListItem>
        <NamedLink key="settings" route="settings" passHref>
          <a>{t("nav.global_settings")}</a>
        </NamedLink>
      </Styled.ListItem>
    ) : null;

  return (
    <Styled.Wrapper>
      <Styled.Nav className="l-grid">
        <div
          className={`l-grid__item l-flex l-flex--gap l-flex--col ${
            description ? "l-grid__item--4" : "l-grid__item--10"
          }`}
        >
          <InstallationLogo />
          <Styled.PoweredBy className="">
            {t("app.powered_by")}
          </Styled.PoweredBy>
        </div>
        {footerData.navigation.map((nav, i) => (
          <Authorize key={i} actions={nav.actions}>
            <div className="l-grid__item l-grid__item--2">
              <Styled.Header>{t(nav.header)}</Styled.Header>
              <Styled.List>
                {nav.children &&
                  nav.children
                    .filter(
                      (child) =>
                        depositingEnabled ||
                        !("depositing" in child && child.depositing),
                    )
                    .map((child, i) =>
                      renderNavLink(child, i, Styled.ListItem),
                    )}
                {globalAdmin && renderGlobalSettings()}
              </Styled.List>
            </div>
          </Authorize>
        ))}
        {description && (
          <div className="l-grid__item l-grid__item--6">
            <Styled.Header>{t(footerData.about.header)}</Styled.Header>
            <div className="t-rte">
              <Markdown.Base>{description}</Markdown.Base>
            </div>
          </div>
        )}
      </Styled.Nav>
      {footerData.copyright && (
        <Styled.Copyright className="l-grid">
          <div className="l-grid__item l-grid__item--4" role="presentation" />
          {siteData?.site.footer.copyrightStatement && (
            <div className="l-grid__item l-grid__item--8">
              {`© ${siteData.site.footer.copyrightStatement}`}
            </div>
          )}
        </Styled.Copyright>
      )}
    </Styled.Wrapper>
  );
}

export default Footer;

const fragment = graphql`
  fragment FooterFragment on GlobalConfiguration {
    site {
      footer {
        copyrightStatement
        description
      }
    }
  }
`;
