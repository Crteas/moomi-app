import styled from "styled-components";
import { Outlet } from "react-router-dom";

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Title = styled.h1``;

function App() {
  return (
    <div>
      <TitleWrapper>
        <Title>솜깅</Title>
      </TitleWrapper>
      <Outlet />
    </div>
  );
}

export default App;
