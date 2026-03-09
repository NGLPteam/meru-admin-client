import { useFragment, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
} from "components/api/MutationForm";
import { logoFieldDescription } from "helpers/i18n";
import type {
  GlobalSettingsEditFormMutation,
  UpdateGlobalConfigurationInput,
} from "@/relay/GlobalSettingsEditFormMutation.graphql";
import type { GlobalSettingsEditFormFragment$key } from "@/relay/GlobalSettingsEditFormFragment.graphql";

export default function GlobalSettingsEditForm({
  data,
  onSuccess,
  onCancel,
}: Props) {
  const { logo, contributionRoles, ...settings } =
    useFragment<GlobalSettingsEditFormFragment$key>(fragment, data);

  const toVariables = useToVariables<GlobalSettingsEditFormMutation, Fields>(
    (data) => ({ input: { ...data } }),
    [],
  );

  const defaultValues = {
    ...settings,
    contributionRoles: {
      controlledVocabularyId: contributionRoles.controlledVocabulary.id,
      defaultItemId: contributionRoles.defaultItem.id,
    },
  };

  const { t } = useTranslation();

  const renderForm = useRenderForm<Fields>(
    ({ form: { register } }) => (
      <Forms.Grid>
        <Forms.Input
          label="forms.fields.provider_name"
          {...register("site.providerName")}
        />
        <Forms.Input
          label="forms.fields.installation_name"
          {...register("site.installationName")}
        />
        <Forms.SiteLogoUpload
          label="forms.fields.logo"
          name="logo"
          data={logo}
          clearName="clearLogo"
          description={logoFieldDescription}
        />
        <Forms.Select
          label="forms.fields.logo_settings"
          options={[
            {
              label: t("forms.fields.select_placeholder"),
              value: "NONE",
            },
            {
              label: t("forms.fields.logo_settings_with_text"),
              value: "WITH_TEXT",
            },
            {
              label: t("forms.fields.logo_settings_without_text"),
              value: "SANS_TEXT",
            },
          ]}
          description={t("forms.fields.logo_settings_description")}
          {...register("site.logoMode")}
        />
        <Forms.Textarea
          label="forms.fields.installation_home_copy"
          description="forms.fields.installation_home_copy_description"
          {...register("site.installationHomePageCopy")}
        />
        <Forms.Fieldset label={t("forms.fields.controlled_vocabularies")}>
          <Forms.ControlledVocabularySelect
            label="forms.fields.contribution_roles"
            {...register("contributionRoles.controlledVocabularyId")}
          />
          <Forms.ContributionRoleSelect
            label="forms.fields.default_contribution_role"
            {...register("contributionRoles.defaultItemId")}
          />
        </Forms.Fieldset>
        <Forms.Select
          label="forms.fields.theme_color"
          description={t("forms.fields.theme_color_description")}
          options={[
            { label: "Cream", value: "cream" },
            { label: "Gray", value: "gray" },
            { label: "Blue", value: "blue" },
          ]}
          required
          {...register("theme.color")}
        />
        <Forms.Select
          label="forms.fields.theme_font"
          description={t("forms.fields.theme_font_description")}
          options={[
            { label: "Ilisarniq", value: "style1" },
            { label: "Switzer", value: "style2" },
            { label: "Sentient", value: "style3" },
          ]}
          required
          {...register("theme.font")}
        />
        <Forms.Fieldset label={t("forms.fields.depositing_settings")}>
          <Forms.Checkbox
            label="forms.fields.depositing_enabled"
            description="forms.fields.depositing_enabled_description"
            {...register("depositing.enabled")}
          />
          <Forms.Textarea
            label="forms.fields.depositing_agreement"
            description="forms.fields.depositing_agreement_description"
            {...register("depositing.agreement")}
          />
        </Forms.Fieldset>
        <Forms.Fieldset label={t("forms.fields.entity_settings")}>
          <Forms.Checkbox
            description="forms.fields.supress_external_links_description"
            label="forms.fields.supress_external_links"
            {...register("entities.suppressExternalLinks")}
          />
        </Forms.Fieldset>
        <Forms.Fieldset label={t("forms.fields.footer")}>
          <Forms.Textarea
            label="forms.fields.footer_description"
            description="forms.fields.footer_description_description"
            {...register("site.footer.description")}
          />
          <Forms.Input
            label="forms.fields.copyright_statement"
            description="forms.fields.copyright_statement_description"
            {...register("site.footer.copyrightStatement")}
          />
        </Forms.Fieldset>
      </Forms.Grid>
    ),
    [],
  );

  return (
    <MutationForm<GlobalSettingsEditFormMutation, Fields>
      mutation={mutation}
      onSuccess={onSuccess}
      onCancel={onCancel}
      successNotification="messages.update.global_settings_success"
      failureNotification="messages.update.global_settings_failure"
      name="updateGlobalConfiguration"
      refetchTags={["globalConfiguration"]}
      toVariables={toVariables}
      defaultValues={defaultValues}
    >
      {renderForm}
    </MutationForm>
  );
}

type Props = Pick<
  React.ComponentProps<typeof MutationForm>,
  "onSuccess" | "onCancel"
> & { data: GlobalSettingsEditFormFragment$key };

type Fields = Omit<UpdateGlobalConfigurationInput, "announcementId">;

const fragment = graphql`
  fragment GlobalSettingsEditFormFragment on GlobalConfiguration {
    site {
      providerName
      installationName
      installationHomePageCopy
      footer {
        description
        copyrightStatement
      }
      logoMode
    }
    theme {
      color
      font
    }
    depositing {
      enabled
      agreement
    }
    entities {
      suppressExternalLinks
    }
    logo {
      ...SiteLogoUploadFragment
    }
    contributionRoles {
      controlledVocabulary {
        id
      }
      defaultItem {
        id
      }
    }
  }
`;

const mutation = graphql`
  mutation GlobalSettingsEditFormMutation(
    $input: UpdateGlobalConfigurationInput!
  ) {
    updateGlobalConfiguration(input: $input) {
      globalConfiguration {
        site {
          providerName
          installationName
          installationHomePageCopy
          footer {
            description
            copyrightStatement
          }
          logoMode
        }
        theme {
          color
          font
        }
        depositing {
          enabled
          agreement
        }
        entities {
          suppressExternalLinks
        }
        contributionRoles {
          controlledVocabulary {
            id
          }
          defaultItem {
            id
          }
        }
      }
      ...MutationForm_mutationErrors
    }
  }
`;
