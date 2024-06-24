import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { IdollsAndCloset } from "../types/types";
import { useRecoilState } from "recoil";
import { formDataState } from "../atomss";
import { deleteStoragePhoto } from "../api/firebaseStorage";
import ItemDetail from "../components/ItemDetail";
import PageWrapper from "../styles/Wrapper";
import Button from "../styles/Button";

const EditButton = styled(Button)``;
const DeleteButton = styled(Button)``;
const ControllWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`;

export default function GBItemDetail() {
  const { id } = useParams();
  const [itemInfo, setItemInfo] = useState<IdollsAndCloset | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [formData, setFormData] = useRecoilState(formDataState);
  const navigate = useNavigate();

  const getItem = async () => {
    const user = auth.currentUser;
    if (!id) return;
    setIsLoading(true);
    try {
      const docRef = doc(db, "dollsAndCloset", id);
      const snapShot = await getDoc(docRef);
      if (!snapShot.exists()) {
        return;
      }
      const data = snapShot.data() as IdollsAndCloset;
      if (data.userId !== user?.uid) {
        return;
      }
      console.log(data);
      setItemInfo(data);
    } catch (e) {
      console.log("불러오기중 오류");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGBItem = async () => {
    const user = auth.currentUser;
    if (!id || !user) return;
    setDeleteLoading(true);
    const isDelete = window.confirm("삭제?");
    if (!isDelete) return;
    try {
      const docRef = doc(db, "dollsAndCloset", id);
      await deleteDoc(docRef);
      await deleteStoragePhoto("dollsAndCloset", user, id);
      navigate("/GBList");
    } catch (e) {
      console.log("삭제중 오류.");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);
  return (
    <PageWrapper>
      {isLoading ? (
        "잠시만 기다려주세요."
      ) : itemInfo === null ? (
        "인형정보가 없습니다."
      ) : (
        <div>
          <ItemDetail itemInfo={itemInfo} />

          <ControllWrapper>
            <EditButton
              onClick={() => {
                setFormData(itemInfo);
                navigate(`/GBitem/${id}/edit`);
              }}
            >
              수정
            </EditButton>
            <DeleteButton onClick={deleteGBItem}>삭제</DeleteButton>
          </ControllWrapper>
        </div>
      )}
    </PageWrapper>
  );
}
