import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router";
import { IdollInfo } from "../types/types";
// 인형정보를 등록하는 페이지
const FormContainer = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  width: 480px;
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    background: none;
    border: none;
    height: 30px;
    margin-bottom: 10px;
    border-bottom: 1px solid #bbb;
    &:focus {
      outline: none;
    }
  }
`;
const ErrorSpan = styled.span`
  padding-left: 10px;
  color: red;
`;
const DollInput = styled.input.attrs({ autoComplete: "off" })``;

type IForm = {
  name: string;
  size: string;
  whereBuy: string;
  groupOrder: string;
  price: number;
  attr: string;
  etc: string;
  category: string;
  photo?: FileList;
  extraError?: string;
};
function DollEdit() {
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const setInputValue = async () => {
    try {
      const docRef = doc(db, "item", String(id));
      const docSnap = await getDoc(docRef);
      return docSnap.data() as IdollInfo;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setInputValue();
  }, []);

  // 입력을 잘 했다면 실행
  const onValid = async (data: IForm) => {
    const user = auth.currentUser;
    const {
      name,
      whereBuy,
      price,
      size,
      groupOrder,
      etc,
      attr,
      photo,
      category,
    } = data;
    try {
      if (photo) {
        if (photo.length > 0) {
          const maxFileSize = 1024 * 1024 * 3;
          if (photo[0].size > maxFileSize) {
            alert("파일 최대크기는 3MB 미만입니다. ");
            return;
          }
        }
      }
      setLoading(true);
      // 수정으로 바꾸기

      const docRef = doc(db, "item", String(id));

      console.log(`item/${user?.uid}/${id}`);
      await updateDoc(docRef, {
        name,
        whereBuy,
        price,
        size,
        groupOrder,
        etc,
        attr,
        category,
      });

      // 사진 삭제후 재등록
      if (photo) {
        if (photo.length > 0) {
          // 이미지 주소
          const imgRef = ref(storage, `item/${user?.uid}/${id}`);
          // 파일삭제
          await deleteObject(imgRef);
          const locationRef = ref(storage, `item/${user?.uid}/${id}`);
          const result = await uploadBytes(locationRef, photo[0]); // 파일 업로드
          // 파일 업로드 후 그 파일의 퍼블릭 url을 받는것
          const url = await getDownloadURL(result.ref);
          await updateDoc(docRef, {
            photo: url,
          });
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      //네비게이트 바꾸기
      // navigate(`/${category}/list`);
    }
  };
  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onValid)}>
        <label>카테고리</label>
        <select {...register("category")}>
          <option value={"dolls"}>솜인형</option>
          <option value={"closet"}>옷장</option>
          <option value={"other"}>기타</option>
        </select>
        <label htmlFor="attr">속성</label>
        <select id="attr" {...register("attr")}>
          <option value="noattr">무속성</option>
          <option value="attr">속성</option>
        </select>
        <br />
        <label htmlFor="dollName">솜인형 이름</label>
        <ErrorSpan>{errors.name?.message as string}</ErrorSpan>
        <DollInput
          id="name"
          {...register("name", { required: "솜인형 이름을 입력해주세요." })}
          placeholder="솜인형 이름"
          type="text"
        />
        <label htmlFor="size">크기</label>
        <ErrorSpan>{errors.size?.message as string}</ErrorSpan>
        <DollInput
          id="size"
          {...register("size", {
            required: "크기를 입력해주세요.",
          })}
          placeholder="크기"
          type="text"
        />
        <label htmlFor="whereBuy">구매처</label>
        <ErrorSpan>{errors.whereBuy?.message as string}</ErrorSpan>
        <DollInput
          id="whereBuy"
          {...register("whereBuy", { required: "구매처를 입력해주세요." })}
          placeholder="구매처"
          type="text"
        />
        <label htmlFor="groupOrder">공구주</label>
        <DollInput
          id="groupOrder"
          {...register("groupOrder")}
          placeholder="공구주"
          type="text"
        />
        <label htmlFor="price">가격</label>
        <ErrorSpan>{errors.price?.message as string}</ErrorSpan>
        <DollInput
          id="price"
          {...register("price", {
            required: "가격을 입력해주세요.",
            min: { value: 0, message: "정말로?" },
          })}
          placeholder="가격"
          type="number"
        />

        <label htmlFor="etc">비고</label>
        <DollInput
          id="etc"
          {...register("etc", { maxLength: 30 })}
          placeholder="비고"
          type="text"
        />
        <label>사진</label>
        <DollInput
          id="photo"
          {...register("photo", { validate: {} })}
          type="file"
          accept="image/*"
        />
        <button type="submit">등록</button>
        <ErrorSpan>{errors.extraError?.message as string}</ErrorSpan>
      </form>
    </FormContainer>
  );
}
export default DollEdit;
