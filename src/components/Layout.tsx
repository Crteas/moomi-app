import { Outlet, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase";
import Sidebar from "./Sidebar";

const Wrapper = styled.div`
  height: 100vh;
`;
const TITLEHIGHT = "70px";
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: ${TITLEHIGHT};
  width: 100vw;
  background-color: ${(props) => props.theme.headerColor};
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
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>니 솜깅이 이 솜깅이냐</Title>
        <Button
          onClick={async () => {
            await auth.signOut();
            navigate("/login");
          }}
        >
          로그아웃
        </Button>
        {/* 여기에 header. */}
      </TitleWrapper>
      <MainWrapper style={{ paddingTop: TITLEHIGHT }}>
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </MainWrapper>
    </Wrapper>
  );
}

export default Layout;
