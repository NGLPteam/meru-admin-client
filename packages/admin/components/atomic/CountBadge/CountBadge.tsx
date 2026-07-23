import * as Styled from "./CountBadge.styles";

interface Props {
  count: number;
  variant?: "overlay" | "inline";
  className?: string;
  ariaLabel?: string;
}

const formatCount = (n: number) => (n > 99 ? "99+" : String(n));

const CountBadge = ({
  count,
  variant = "inline",
  className,
  ariaLabel,
}: Props) => {
  if (count <= 0) return null;

  return (
    <Styled.Badge
      $variant={variant}
      className={className}
      aria-label={ariaLabel}
    >
      {formatCount(count)}
    </Styled.Badge>
  );
};

export default CountBadge;
