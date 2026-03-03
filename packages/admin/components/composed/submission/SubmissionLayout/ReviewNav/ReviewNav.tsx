import { useTranslation } from "react-i18next";
import { ButtonControl, ButtonControlRoute } from "components/atomic";
import * as Styled from "./ReviewNav.styles";

export default function ReviewNav({
  prevSlug,
  nextSlug,
}: {
  prevSlug: string | null;
  nextSlug: string | null;
}) {
  const { t } = useTranslation();

  return (
    <Styled.ReviewNav>
      {prevSlug ? (
        <ButtonControlRoute
          route="submissions.detail.details"
          query={{ slug: prevSlug }}
          icon="arrow"
          iconRotate={270}
          iconLeft
        >
          {t("actions.review_previous")}
        </ButtonControlRoute>
      ) : (
        <ButtonControl icon="arrow" iconRotate={270} iconLeft disabled>
          {t("actions.review_previous")}
        </ButtonControl>
      )}
      {nextSlug ? (
        <ButtonControlRoute
          route="submissions.detail.details"
          query={{ slug: nextSlug }}
          icon="arrow"
          iconRotate={90}
        >
          {t("actions.review_next")}
        </ButtonControlRoute>
      ) : (
        <ButtonControl icon="arrow" iconRotate={90} disabled>
          {t("actions.review_next")}
        </ButtonControl>
      )}
    </Styled.ReviewNav>
  );
}
