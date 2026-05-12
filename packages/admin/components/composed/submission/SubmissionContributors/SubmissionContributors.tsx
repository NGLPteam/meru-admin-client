import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useDialogState } from "reakit/Dialog";
import Modal from "components/layout/Modal";
import { ButtonControl } from "components/atomic";
import { IconFactory } from "components/factories";
import { getContributorDisplayName } from "components/composed/contributor/ContributorDisplayName";
import { useDestroyer } from "hooks";
import type { SubmissionContributorsFragment$key } from "@/relay/SubmissionContributorsFragment.graphql";
import AddContributorForm from "./AddContributorForm";
import * as Styled from "./SubmissionContributors.styles";

interface Props {
  data: SubmissionContributorsFragment$key;
  readonly?: boolean;
}

export default function SubmissionContributors({
  data,
  readonly = false,
}: Props) {
  const { t } = useTranslation();
  const dialog = useDialogState({ animated: true });
  const item = useFragment<SubmissionContributorsFragment$key>(fragment, data);
  const destroy = useDestroyer();

  const contributions = item?.contributions?.nodes ?? [];

  return (
    <>
      <Styled.Wrapper>
        <Styled.Header>
          <Styled.Label>{t("forms.fields.contributors")}</Styled.Label>
          {!readonly && (
            <ButtonControl
              type="button"
              icon="plus"
              iconLeft
              onClick={() => dialog.show()}
            >
              {t("actions.add.contributor")}
            </ButtonControl>
          )}
        </Styled.Header>
        <Styled.Box $readonly={readonly}>
          {!contributions.length ? (
            <Styled.Empty>{t("lists.no_contributors")}</Styled.Empty>
          ) : (
            <Styled.Table>
              <thead>
                <tr>
                  <Styled.HeaderCell>
                    {t("forms.fields.name")}
                  </Styled.HeaderCell>
                  <Styled.HeaderCell>
                    {t("forms.fields.role")}
                  </Styled.HeaderCell>
                  <Styled.HeaderCell data-cell-type="position">
                    {t("forms.fields.position")}
                  </Styled.HeaderCell>
                  {!readonly && (
                    <Styled.HeaderCell
                      data-cell-type="actions"
                      aria-label={t("common.delete")}
                    />
                  )}
                </tr>
              </thead>
              <tbody>
                {contributions.map((c) => (
                  <tr key={c.id}>
                    <Styled.Cell>
                      {getContributorDisplayName(c.contributor)}
                    </Styled.Cell>
                    <Styled.Cell>{c.contributionRole?.label ?? ""}</Styled.Cell>
                    <Styled.Cell data-cell-type="position">
                      {c.outerPosition != null ? c.outerPosition : ""}
                    </Styled.Cell>
                    {!readonly && (
                      <Styled.Cell data-cell-type="actions">
                        <Styled.RemoveButton
                          type="button"
                          aria-label={t("common.delete")}
                          onClick={() =>
                            destroy.contribution(
                              { contributionId: c.id },
                              "glossary.contribution",
                            )
                          }
                        >
                          <IconFactory icon="delete" />
                        </Styled.RemoveButton>
                      </Styled.Cell>
                    )}
                  </tr>
                ))}
              </tbody>
            </Styled.Table>
          )}
        </Styled.Box>
      </Styled.Wrapper>
      <Modal
        label={t("actions.add.contributor")}
        dialog={dialog}
        hideOnClickOutside={false}
      >
        {({ handleClose }) => (
          <AddContributorForm itemId={item.id} onClose={handleClose} />
        )}
      </Modal>
    </>
  );
}

const fragment = graphql`
  fragment SubmissionContributorsFragment on Item {
    id
    contributions(page: 1, perPage: 50, order: OLDEST) {
      nodes {
        id
        outerPosition
        contributionRole {
          label
        }
        contributor {
          __typename
          ... on PersonContributor {
            givenName
            familyName
          }
          ... on OrganizationContributor {
            legalName
          }
        }
      }
    }
  }
`;
