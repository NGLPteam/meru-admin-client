import * as Styled from "./StatusBadge.styles";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Draft: { bg: "var(--neutral10)", color: "var(--neutral80)" },
  "In Review": { bg: "var(--brand20)", color: "var(--brand100)" },
  "Revisions Requested": {
    bg: "var(--yellowtint)",
    color: "var(--yellowdark)",
  },
  Published: { bg: "var(--greentint)", color: "var(--greendark)" },
};

const FALLBACK_COLORS = { bg: "var(--neutral10)", color: "var(--neutral80)" };

interface Props {
  status: string;
  className?: string;
}

const StatusBadge = ({ status, className }: Props) => {
  const colors = STATUS_COLORS[status] ?? FALLBACK_COLORS;

  return (
    <Styled.Badge $bg={colors.bg} $color={colors.color} className={className}>
      {status}
    </Styled.Badge>
  );
};

export default StatusBadge;
