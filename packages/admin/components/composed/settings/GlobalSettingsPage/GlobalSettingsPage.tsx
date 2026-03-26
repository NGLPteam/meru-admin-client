import { useFragment, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import PageHeader from "components/layout/PageHeader";
import { ButtonControlGroup, LoadingPage } from "components/atomic";
import ClearInstanceCache from "components/atomic/buttons/ButtonControl/patterns/ButtonControlClearInstanceCache";
import GlobalSettingsEditForm from "components/composed/settings/GlobalSettingsEditForm";
import type { GlobalSettingsPageFragment$key } from "@/relay/GlobalSettingsPageFragment.graphql";

export default function GlobalSettingsPage({ data }: Props) {
  const { t } = useTranslation();

  const globalConfiguration = useFragment<GlobalSettingsPageFragment$key>(
    fragment,
    data,
  );

  const buttons = (
    <ButtonControlGroup toggleLabel={t("options")} menuLabel={t("options")}>
      <ClearInstanceCache />
    </ButtonControlGroup>
  );

  return (
    <>
      <PageHeader title={t("nav.global_settings")} buttons={buttons} />
      {globalConfiguration ? (
        <GlobalSettingsEditForm data={globalConfiguration} />
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

interface Props {
  data?: GlobalSettingsPageFragment$key;
}

const fragment = graphql`
  fragment GlobalSettingsPageFragment on GlobalConfiguration {
    ...GlobalSettingsEditFormFragment
  }
`;
