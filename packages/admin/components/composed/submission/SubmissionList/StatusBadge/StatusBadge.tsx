import { useTranslation } from "react-i18next";
import * as Styled from "./StatusBadge.styles";
import type {
  SubmissionState,
  SubmissionReviewState,
} from "types/graphql-schema";

type KnownSubmissionState =
  | Exclude<SubmissionState, "%future added value">
  | Exclude<SubmissionReviewState, "%future added value">;
type ColorConfig = { bg: string; color: string };

const STATUS_COLORS: Record<KnownSubmissionState, ColorConfig> = {
  DRAFT: { bg: "var(--neutral10)", color: "var(--neutral80)" },
  PENDING: { bg: "var(--neutral10)", color: "var(--neutral80)" },
  SUBMITTED: { bg: "var(--brand20)", color: "var(--brand100)" },
  UNDER_REVIEW: { bg: "var(--brand20)", color: "var(--brand100)" },
  REVISION_REQUESTED: {
    bg: "var(--yellowtint)",
    color: "var(--yellowdark)",
  },
  APPROVED: { bg: "var(--greentint)", color: "var(--greendark)" },
  PUBLISHED: { bg: "var(--greentint)", color: "var(--greendark)" },
  REJECTED: { bg: "var(--redtint)", color: "var(--reddark)" },
};

interface Props {
  status: SubmissionState | SubmissionReviewState;
  className?: string;
}

const FALLBACK_COLORS: ColorConfig = {
  bg: "var(--neutral10)",
  color: "var(--neutral80)",
};

const StatusBadge = ({ status, className }: Props) => {
  const { t } = useTranslation();

  if (!status) return null;

  const colors =
    STATUS_COLORS[status as KnownSubmissionState] ?? FALLBACK_COLORS;
  const label = t(`status.${status?.toLowerCase()}_label`);

  return (
    <Styled.Badge $bg={colors.bg} $color={colors.color} className={className}>
      {label}
    </Styled.Badge>
  );
};

export default StatusBadge;
