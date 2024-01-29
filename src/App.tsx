import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";

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

function App() {
  const navigate = useNavigate();
  const id = useParams();
  const location = useLocation();
  console.log(location);
  function clickDollRegiBtn() {
    navigate("doll/regist");
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>이게 딸려오자나</Title>
        {location.pathname === "/doll/regist" ? (
          ""
        ) : (
          <div onClick={clickDollRegiBtn}>등록</div>
        )}
        {/* 여기에 header. */}
      </TitleWrapper>
      <div style={{ paddingTop: TITLEHIGHT }}>
        <Outlet />
      </div>
    </Wrapper>
  );
}

export default App;
