import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { CountBadge } from "components/atomic";
import { usePendingReviewCount, useRevisionRequestedCount } from "hooks";

const AvatarAlertBadgeInner = () => {
  const { t } = useTranslation();
  const reviews = usePendingReviewCount();
  const revisions = useRevisionRequestedCount();
  const count = reviews + revisions;
  return (
    <CountBadge
      count={count}
      variant="overlay"
      ariaLabel={t("nav.account_alert_badge", { count })}
    />
  );
};

const AvatarAlertBadge = () => (
  <Suspense fallback={null}>
    <AvatarAlertBadgeInner />
  </Suspense>
);

export default AvatarAlertBadge;
