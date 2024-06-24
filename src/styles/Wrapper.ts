import styled from "styled-components";

//만약 창의 크기가 490아래로 떨어지면 더 줄여야함.
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
`;

const PageWrapper = styled(Wrapper)`
  margin: 0 auto;
  margin-top: 10px;
  width: 480px;
  padding: 10px;
  border-radius: 10px;
`;

export default PageWrapper;
