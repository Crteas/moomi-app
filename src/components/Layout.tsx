import { Outlet, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase";

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

const Sidebar = styled.div`
  margin: 10px;
  width: 200px;
  background-color: green;
  border-radius: 10px;
  flex-shrink: 0;
`;

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  function clickDollRegiBtn() {
    navigate("doll/regist");
  }
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>니 솜깅이 이 솜깅이냐</Title>
        {location.pathname === "/doll/regist" ? (
          ""
        ) : (
          <div onClick={clickDollRegiBtn}>등록</div>
        )}
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
        <Sidebar>
          <p>홈</p>
          <br />
          <p>솜인형</p>
          <ul>
            <li>무속성</li>
            <li>속성</li>
            <li>기타</li>
          </ul>
        </Sidebar>
        <Main>
          <Outlet />
        </Main>
      </MainWrapper>
    </Wrapper>
  );
}

export default Layout;
