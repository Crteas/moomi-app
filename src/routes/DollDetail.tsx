import { useNavigate, useParams } from "react-router";
import { DollImg, IdollInfo } from "./DollList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

const DollDetailWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColor};
`;

const Column = styled.div``;
const DeleteBtn = styled.button``;
const EditBtn = styled.button``;

function DollDetail() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { id } = useParams();
  const [dollInfo, setDollInfo] = useState<IdollInfo>();
  const fetchDoll = async () => {
    if (!id) return; // 잘못된 아이디 처리해야함
    const docRef = doc(db, "dolls", id);
    const dollDetail = (await getDoc(docRef)).data() as IdollInfo;
    setDollInfo(dollDetail);
  };

  const onDelete = async () => {
    if (!dollInfo || !id) return; //예외처리
    const { photo, userId } = dollInfo;
    console.log(id, photo, userId);
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "dolls", id));
      if (photo) {
        const photoRef = ref(storage, `dolls/${user?.uid}/${id}`);
        await deleteObject(photoRef);
      }
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDoll();
  }, []);
  return (
    <DollDetailWrapper>
      <header>
        <Link to={"/"}>이전으로</Link>
      </header>
      <main>
        <div>
          <DollImg src={dollInfo?.photo} />
        </div>
        <div>이름: {dollInfo?.dollName}</div>
        <div>공구주: {dollInfo?.groupOrder}</div>
        <div>가격: {dollInfo?.price}</div>
        <div>크기: {dollInfo?.size}</div>
        <div>구매처: {dollInfo?.whereBuy}</div>
        <div>속성: {dollInfo?.attr ? "속성" : "무속성"}</div>
        <div>비고: {dollInfo?.etc ? dollInfo.etc : "없음"}</div>
      </main>
      {user?.uid === dollInfo?.userId ? (
        <Column>
          <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
          <EditBtn>수정</EditBtn>
        </Column>
      ) : null}
    </DollDetailWrapper>
  );
}

export default DollDetail;
