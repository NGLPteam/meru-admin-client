import { checkFlexGap } from "helpers";
import { Header, Footer } from "components/global";
import { ProgressBar } from "components/atomic";
import { RouteGuard } from "components/auth";
import * as Styled from "./AppBody.styles";

function AppBody({ children }: Props) {
  const isFlexGapSupported = checkFlexGap();

  return (
    <Styled.Body
      className={`${isFlexGapSupported ? "" : "no-flex-gap"} a-bg-neutral00`}
    >
      <Header />
      <ProgressBar />
      <Styled.Main id="main" className="l-container-max">
        <RouteGuard>{children}</RouteGuard>
      </Styled.Main>
      <Footer />
    </Styled.Body>
  );
}

interface Props {
  children: React.ReactNode;
}

export default AppBody;
