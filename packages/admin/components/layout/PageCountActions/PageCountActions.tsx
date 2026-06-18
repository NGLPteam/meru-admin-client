import { Trans, useTranslation } from "react-i18next";
import { PageInfo } from "types/graphql-schema";
import * as Styled from "./PageCountActions.styles";

/**
 * Shows number of items or number of selected items.
 *
 * If items are selected, shows multisection actions.
 */
const PageCountActions = ({
  pageInfo,
  selectedCount = 0,
  actions,
  loading,
}: Props) => {
  const { t } = useTranslation();
  const hasSelected = selectedCount > 0;
  const page = pageInfo?.page || 1;
  const perPage = pageInfo?.perPage || 10;
  const totalCount = pageInfo?.totalCount || 0;
  const start = totalCount > 0 ? (page - 1) * perPage + 1 : 0;
  const end =
    totalCount < perPage || page * perPage > totalCount
      ? totalCount
      : page * perPage;

  return (
    <Styled.Wrapper>
      <Styled.Count className="t-label-md a-color-light">
        {loading ? (
          t("common.loading_ellipsis")
        ) : (
          <>
            <Trans
              i18nKey="lists.showing_count"
              values={{
                start: start.toLocaleString("en-US"),
                end: end.toLocaleString("en-US"),
                total: totalCount.toLocaleString("en-US"),
              }}
              components={[
                <span key="color" className="a-color-accent"></span>,
              ]}
            />
            {hasSelected && (
              <>
                {" · "}
                <Trans
                  i18nKey="lists.selected_count"
                  values={{
                    count: selectedCount,
                    total: totalCount.toLocaleString("en-US"),
                  }}
                  components={[
                    <span key="color" className="a-color-accent"></span>,
                  ]}
                />
              </>
            )}
          </>
        )}
      </Styled.Count>
      {actions ? <Styled.Actions>{actions}</Styled.Actions> : null}
    </Styled.Wrapper>
  );
};

interface Props {
  /** Page info object (page, perPage, pageCount...) */
  pageInfo?: Partial<PageInfo>;
  /** Number of selected items */
  selectedCount?: number;
  /** Actions, an array of buttons or form controls */
  actions?: React.JSX.Element | React.JSX.Element[];
  /** Loading state */
  loading?: boolean;
}

export default PageCountActions;
