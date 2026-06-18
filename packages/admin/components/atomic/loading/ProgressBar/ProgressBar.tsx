import { useTranslation } from "react-i18next";
import { usePageContext } from "hooks";
import * as Styled from "./ProgressBar.styles";

const ProgressBar = ({ label }: Props) => {
  const { t } = useTranslation();
  const { loading } = usePageContext();

  if (!loading) return null;

  return (
    <Styled.Bar role="progressbar" aria-label={t(label || "loading")}>
      <Styled.Sweep />
    </Styled.Bar>
  );
};

interface Props {
  label?: string;
}

export default ProgressBar;
