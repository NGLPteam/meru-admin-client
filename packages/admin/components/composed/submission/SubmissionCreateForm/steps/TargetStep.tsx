import { useTranslation } from "react-i18next";
import { Button } from "components/atomic";
import BaseMarkdown from "components/atomic/Markdown/BaseMarkdown";
import BaseSelect from "components/forms/BaseSelect";
import Checkbox from "components/forms/Checkbox";
import BaseInputLabel from "components/forms/BaseInputLabel";
import { Forms } from "components/api/MutationForm";
import { Footer } from "components/api/MutationForm/MutationForm.styles";
import {
  Wrapper as FieldWrapper,
  Description,
} from "components/forms/BaseInputWrapper/BaseInputWrapper.styles";
import {
  Fieldset as FieldsetStyles,
  FieldsWrapper as FieldsetInner,
} from "components/forms/Fieldset/Fieldset.styles";
import type { SubmissionTargetNode } from "../types";

type Props = {
  targets: SubmissionTargetNode[];
  selectedTarget?: SubmissionTargetNode;
  selectedDescendantId: string;
  certificationAccepted: boolean;
  setSelectedTargetId: (id: string) => void;
  setSelectedDescendantId: (id: string) => void;
  setCertificationAccepted: (val: boolean) => void;
  setRequestPending: (val: boolean) => void;
  onContinue: () => void;
  onCancel: () => void;
};

export default function TargetStep({
  targets,
  selectedTarget,
  selectedDescendantId,
  certificationAccepted,
  setSelectedTargetId,
  setSelectedDescendantId,
  setCertificationAccepted,
  setRequestPending,
  onContinue,
  onCancel,
}: Props) {
  const { t } = useTranslation();

  const {
    agreementRequired = false,
    agreementContent,
    description,
    depositTargets = [],
    depositMode,
  } = selectedTarget ?? {};

  const isDescendant = depositMode === "DESCENDANT";
  const instructions = description?.instructions;

  const onTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTargetId = e.target.value;
    setSelectedTargetId(newTargetId);
    setSelectedDescendantId("");
    setCertificationAccepted(false);
    setRequestPending(false);
  };

  const onDescendantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDescendantId(e.target.value);
  };

  const targetOptions = targets.map((target) => ({
    label: target.entity.title || target.id,
    value: target.id,
  }));

  const depositTargetOptions = depositTargets.map((dt) => ({
    label: dt.entity.title || dt.id,
    value: dt.id,
  }));

  const canContinue =
    !!selectedTarget?.id &&
    (!isDescendant || !!selectedDescendantId) &&
    (!agreementRequired || certificationAccepted);

  return (
    <form>
      <Forms.Grid>
        <FieldWrapper
          css={{
            "flex-basis": "var(--form-grid-item-width-wide)",
          }}
        >
          <BaseInputLabel>
            {t("forms.fields.submission_target")}{" "}
            <span className="a-required">
              * <span className="a-hidden">required</span>
            </span>
          </BaseInputLabel>
          <BaseSelect
            name="submissionTargetId"
            options={targetOptions}
            placeholder={t("forms.fields.select_placeholder")}
            defaultValue={selectedTarget?.id}
            onChange={onTargetChange}
          />
          <Description>
            {t("forms.fields.submission_target_description")}
          </Description>
        </FieldWrapper>
        {isDescendant && !!depositTargetOptions.length && (
          <FieldWrapper
            css={{
              "flex-basis": "var(--form-grid-item-width-wide)",
            }}
          >
            <BaseInputLabel>
              {t("forms.fields.child_submission_target")}{" "}
              <span className="a-required">
                * <span className="a-hidden">required</span>
              </span>
            </BaseInputLabel>
            <BaseSelect
              name="depositTargetId"
              options={depositTargetOptions}
              placeholder={t("forms.fields.select_placeholder")}
              defaultValue={selectedDescendantId}
              onChange={onDescendantChange}
            />
            <Description>
              {t("forms.fields.child_submission_target_description")}
            </Description>
          </FieldWrapper>
        )}
        {selectedTarget && instructions && (
          <FieldsetStyles as="section">
            <BaseInputLabel>
              {t("forms.fields.submission_instructions")}
            </BaseInputLabel>
            <FieldsetInner>
              <BaseMarkdown>{instructions}</BaseMarkdown>
            </FieldsetInner>
          </FieldsetStyles>
        )}
        {selectedTarget && agreementRequired && agreementContent && (
          <FieldsetStyles>
            <BaseInputLabel>
              {t("forms.fields.depositing_agreement_short")}
            </BaseInputLabel>
            <FieldsetInner>
              <BaseMarkdown>{agreementContent}</BaseMarkdown>
              <Checkbox
                checked={certificationAccepted}
                onChange={(e) => setCertificationAccepted(e.target.checked)}
                label={t("forms.fields.depositing_agreement_accept")}
              />
            </FieldsetInner>
          </FieldsetStyles>
        )}
      </Forms.Grid>
      <Footer className="l-flex l-flex--gap">
        <Button type="submit" disabled={!canContinue} onClick={onContinue}>
          {t("common.continue")}
        </Button>
        <Button type="button" onClick={onCancel} $secondary>
          {t("common.cancel")}
        </Button>
      </Footer>
    </form>
  );
}
