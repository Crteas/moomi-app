import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10px;
  width: 200px;
  background-color: green;
  border-radius: 10px;
  flex-shrink: 0;
`;
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDollListPage = location.pathname === "/dolls/list";
  const isClothListPage = location.pathname === "/closet/list";
  const isRegistPage = location.pathname === "/doll/regist";
  function clickDollRegiBtn() {
    if (isRegistPage) return;
    navigate("/item/regist");
  }
  return (
    <Wrapper>
      <p>홈</p>
      <br />
      <div onClick={clickDollRegiBtn}>등록</div>
      <br />
      <p>
        <Link to={"/dolls/list"}>솜인형</Link>
      </p>
      {isDollListPage && (
        <ul>
          <li>무속성</li>
          <li>속성</li>
          <li>기타</li>
        </ul>
      )}

      <p>
        <Link to={"/closet/list"}>옷장</Link>
      </p>
      {isClothListPage && (
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      )}
    </Wrapper>
  );
}
