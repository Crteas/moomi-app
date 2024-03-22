import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router";
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

type IRegForm = {
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

function Regist() {
  // handleSubmit(onVaild, onInvalid)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IRegForm>();

  const [isLoading, setLoading] = useState(false);

  // 입력을 잘 했다면 실행
  const onValid = async (data: IRegForm) => {
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
        const maxFileSize = 1024 * 1024 * 3;
        if (photo[0].size > maxFileSize) {
          alert("파일 최대크기는 3MB 미만입니다. ");
          return;
        }
      }
      setLoading(true);
      const doc = await addDoc(collection(db, "item"), {
        name,
        whereBuy,
        price,
        size,
        groupOrder,
        etc,
        attr,
        category,
        createdAt: Date.now(),
        userId: user?.uid,
      });

      if (photo) {
        console.log(photo[0]);
        const locationRef = ref(storage, `item/${user?.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, photo[0]); // 파일 업로드
        //파일 업로드 후 그 파일의 퍼블릭 url을 받는것
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      navigate(`/${category}/list`);
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
export default Regist;
