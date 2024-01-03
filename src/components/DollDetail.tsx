import { useParams } from "react-router";
import { DollImg, IdollInfo, dollLists } from "./DollList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DollDetailWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColor};
`;

function DollDetail() {
  const { id } = useParams();
  const [dollInfo, setDollInfo] = useState<IdollInfo>();
  useEffect(() => {
    setDollInfo(dollLists[Number(id)]);
  }, [id]);
  return (
    <DollDetailWrapper>
      <header>
        <Link to={"/"}>이전으로</Link>
      </header>
      <main>
        <div>
          <DollImg src="../som1.jpg" />
        </div>
        <div>이름: {dollInfo?.dollName}</div>
        <div>공구주: {dollInfo?.groupOrder}</div>
        <div>가격: {dollInfo?.price}</div>
        <div>크기: {dollInfo?.size}</div>
        <div>구매처: {dollInfo?.whereBuy}</div>
        <div>속성: {dollInfo?.attr ? "속성" : "무속성"}</div>
        <div>비고: {dollInfo?.etc ? dollInfo.etc : "없음"}</div>
      </main>
    </DollDetailWrapper>
  );
}

export default DollDetail;
