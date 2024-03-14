import { NavigateFunction, Params, useNavigate, useParams } from "react-router";
import { DollImg } from "../components/ItemList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { IdollInfo } from "../types/types";
import { User } from "firebase/auth";

const DollDetailWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColor};
`;

const Column = styled.div``;
const DeleteBtn = styled.button``;
const EditBtn = styled.button``;

function DollDetail() {
  const user: User | null = auth.currentUser;
  const navigate = useNavigate();
  const { id } = useParams(); // url의 id를 불러옴
  const [dollInfo, setDollInfo] = useState<IdollInfo>();
  const fetchDoll = async () => {
    if (!id) return; // 잘못된 아이디 처리해야함
    try {
      const docRef = doc(db, "item", id);
      const dollDetail = (await getDoc(docRef)).data() as IdollInfo;
      setDollInfo(dollDetail);
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async () => {
    if (!dollInfo || !id) return; //예외처리
    const { photo, userId } = dollInfo;
    console.log(id, photo, userId);
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "item", id));
      if (photo) {
        const photoRef = ref(storage, `item/${user?.uid}/${id}`);
        await deleteObject(photoRef);
      }
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const editBtnClick = async () => {
    navigate(`/dolls/${id}/edit`);
  };

  useEffect(() => {
    fetchDoll();
  }, []);
  return (
    <DollDetailWrapper>
      <header>
        <Link to={"/dolls/list"}>이전으로</Link>
      </header>
      <main>
        <div>
          <DollImg src={dollInfo?.photo} />
        </div>
        <div>이름: {dollInfo?.name}</div>
        <div>
          공구주: {dollInfo?.groupOrder ? dollInfo?.groupOrder : "없음"}
        </div>
        <div>가격: {dollInfo?.price}</div>
        <div>크기: {dollInfo?.size} cm</div>
        <div>구매처: {dollInfo?.whereBuy}</div>
        <div>속성: {dollInfo?.attr === "attr" ? "속성" : "무속성"}</div>
        <div>비고: {dollInfo?.etc}</div>
      </main>
      {user?.uid === dollInfo?.userId ? (
        <Column>
          <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
          <EditBtn onClick={editBtnClick}>수정</EditBtn>
        </Column>
      ) : null}
    </DollDetailWrapper>
  );
}

export default DollDetail;
