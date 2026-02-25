import * as Styled from "./ReviewFeedback.styles";

const ReviewFeedback = ({ name, message }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.Header>{name}</Styled.Header>
      {message && <Styled.Message>{message}</Styled.Message>}
    </Styled.Wrapper>
  );
};

interface Props {
  name: string;
  message?: string | React.JSX.Element;
}

export default ReviewFeedback;
