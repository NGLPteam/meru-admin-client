import { useTranslation } from "react-i18next";
import { IconFactory } from "components/factories";
import * as Styled from "./MessageBanner.styles";
import type { IconKeys } from "components/factories/IconFactory/IconFactory";

const MessageBanner = ({
  name,
  message,
  variant = "warning",
  icon,
  onDismiss,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Styled.Wrapper $variant={variant}>
      {icon && (
        <Styled.Icon $variant={variant}>
          <IconFactory icon={icon} size="md" />
        </Styled.Icon>
      )}
      <Styled.Content>
        <Styled.Header $variant={variant} $hasMessage={!!message}>
          {name}
        </Styled.Header>
        {message && <Styled.Message>{message}</Styled.Message>}
      </Styled.Content>
      {onDismiss && (
        <Styled.DismissButton
          onClick={onDismiss}
          aria-label={t("common.close")}
        >
          <IconFactory icon="close" size="sm" />
        </Styled.DismissButton>
      )}
    </Styled.Wrapper>
  );
};

interface Props {
  name: string;
  message?: string | React.JSX.Element;
  variant?: "warning" | "info";
  icon?: IconKeys;
  onDismiss?: () => void;
}

export default MessageBanner;
