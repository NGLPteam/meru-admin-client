import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { CountBadge } from "components/atomic";
import { usePendingReviewCount } from "hooks";

const PendingReviewBadgeInner = () => {
  const { t } = useTranslation();
  const count = usePendingReviewCount();
  return (
    <CountBadge
      count={count}
      variant="inline"
      ariaLabel={t("nav.pending_reviews_badge", { count })}
    />
  );
};

const PendingReviewBadge = () => (
  <Suspense fallback={null}>
    <PendingReviewBadgeInner />
  </Suspense>
);

export default PendingReviewBadge;
