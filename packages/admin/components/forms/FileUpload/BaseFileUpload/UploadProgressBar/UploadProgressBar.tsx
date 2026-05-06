import { useTranslation } from "react-i18next";
import isNumber from "lodash/isNumber";
import { useAutoProgress } from "@wdp/lib/hooks";
import * as Styled from "./UploadProgressBar.styles";

const UploadProgressBar = ({
  loading = false,
  percentLoaded,
  label,
}: Props) => {
  if (!loading) return <Styled.Placeholder />;

  return isNumber(percentLoaded) ? (
    <Bar percentLoaded={percentLoaded} label={label} />
  ) : (
    <AutoBar label={label} />
  );
};

const AutoBar = ({ label }: Props) => {
  const percentLoaded = useAutoProgress();
  return <Bar percentLoaded={percentLoaded} label={label} />;
};

const Bar = ({ percentLoaded, label }: Props) => {
  const { t } = useTranslation();
  const percent = percentLoaded ? Math.floor(percentLoaded) : 0;

  return (
    <Styled.BarRoot
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${percent}%`}
      aria-label={t(label || "loading")}
    >
      <Styled.Percent style={{ width: `${percent}%` }}>
        <span className="a-hidden">{percent}%</span>
      </Styled.Percent>
    </Styled.BarRoot>
  );
};

interface Props {
  label?: string;
  loading?: boolean;
  percentLoaded?: number | null;
}

export default UploadProgressBar;
