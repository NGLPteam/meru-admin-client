import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { CountBadge } from "components/atomic";
import { useRevisionRequestedCount } from "hooks";

const RevisionRequestedBadgeInner = () => {
  const { t } = useTranslation();
  const count = useRevisionRequestedCount();
  return (
    <CountBadge
      count={count}
      variant="inline"
      ariaLabel={t("nav.revision_requested_badge", { count })}
    />
  );
};

const RevisionRequestedBadge = () => (
  <Suspense fallback={null}>
    <RevisionRequestedBadgeInner />
  </Suspense>
);

export default RevisionRequestedBadge;
