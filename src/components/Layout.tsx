import { Outlet, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  height: 100vh;
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

const Button = styled.button`
  border-radius: 150px;
  border: none;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 100vh;
  box-sizing: border-box;
`;

const Main = styled.div`
  margin: 10px;
  width: 100%;
`;

function Layout() {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>니 솜깅이 이 솜깅이냐</Title>
      </TitleWrapper>
      <MainWrapper style={{ paddingTop: TITLEHIGHT }}>
        <Main>
          <Outlet />
        </Main>
      </MainWrapper>
    </Wrapper>
  );
}

export default Layout;
