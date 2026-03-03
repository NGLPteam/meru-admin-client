import { useTranslation, Trans } from "react-i18next";
import * as Styled from "./SelectAll.styles";

interface Pagination {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages?: number;
}

interface Props {
  pagination: Pagination;
  unit: string;
  onSelect?: () => void;
  onClear?: () => void;
  onSelectPage?: () => void;
  allSelected: boolean;
  idsSelectedCount: number;
}

function getRangeValues(pagination: Pagination) {
  const start = (pagination.currentPage - 1) * pagination.perPage + 1;
  const end = Math.min(
    pagination.currentPage * pagination.perPage,
    pagination.totalCount,
  );
  return { start, end, totalCount: pagination.totalCount };
}

export default function SelectAll({
  pagination,
  unit,
  onSelect,
  onClear,
  onSelectPage,
  allSelected,
  idsSelectedCount,
}: Props) {
  const { t } = useTranslation();

  const hasSelection = allSelected || !!idsSelectedCount;

  const { start, end, totalCount } = getRangeValues(pagination);
  const pageCount = end - start + 1;
  const unpaginated = pagination?.totalPages === 1;

  // Valid because page change resets bulk selection
  const allPageSelected = idsSelectedCount === pageCount;

  const showActions =
    (!allPageSelected && !allSelected) || (hasSelection && !allSelected);

  return (
    <>
      {showActions && (
        <Styled.Total role="status">
          {!allPageSelected && !allSelected && (
            <Styled.Select onClick={onSelectPage}>
              {t("actions.select_all")}
            </Styled.Select>
          )}
          {hasSelection && !allSelected && (
            <Styled.Select onClick={onClear}>
              {t("actions.clear_selection")}
            </Styled.Select>
          )}
        </Styled.Total>
      )}
      {!unpaginated && (allPageSelected || allSelected) && (
        <Styled.All>
          <span>
            <Trans
              i18nKey={"counts.bulk_actions_match"}
              values={{
                total: idsSelectedCount || pagination.totalCount,
                unit,
              }}
              components={[<Styled.Highlighted key="0" />]}
            />
          </span>
          {!allSelected ? (
            <Styled.Select onClick={onSelect}>
              {t("actions.select_all_matching", { count: totalCount, unit })}
            </Styled.Select>
          ) : (
            <Styled.Select onClick={onClear}>
              {t("actions.clear_selection")}
            </Styled.Select>
          )}
        </Styled.All>
      )}
    </>
  );
}

SelectAll.displayName = "Table.BulkActions.SelectAll";
