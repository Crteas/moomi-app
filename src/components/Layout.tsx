import { Outlet, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div``;
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
        <button
          onClick={async () => {
            await auth.signOut();
            navigate("/login");
          }}
        >
          로그아웃
        </button>
        {/* 여기에 header. */}
      </TitleWrapper>
      <div style={{ paddingTop: TITLEHIGHT }}>
        <Outlet />
      </div>
    </Wrapper>
  );
}

export default Layout;
