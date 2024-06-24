import { Outlet, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  width: 480px;
  display: flex;
  flex-direction: column;
`;
const TITLEHIGHT = "70px";
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: ${TITLEHIGHT};
  width: 100vw;
  position: fixed;
`;
const Title = styled.h1`
  font-size: 20px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 100vh;
  box-sizing: border-box;
`;

const Main = styled.div`
  width: 100vw;
`;

function Layout() {
  return (
    <>
      <TitleWrapper>
        <Title>니 솜깅이 이 솜깅이냐</Title>
      </TitleWrapper>
      <MainWrapper style={{ paddingTop: TITLEHIGHT }}>
        <Main>
          <Outlet />
        </Main>
      </MainWrapper>
    </>
  );
}

export default Layout;
