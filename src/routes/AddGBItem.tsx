import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IGBForm } from "../types/types";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router";
import { useState } from "react";

const Wrapper = styled.div`
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
const Form = styled.form``;
const Input = styled.input``;
const Select = styled.select``;

export default function AddGBItem() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGBForm>();
  const navigate = useNavigate();

  const onVaild = async (data: IGBForm) => {
    if (isLoading) return;
    const user = auth.currentUser;
    const { photo, ...dataWithoutPhoto } = data;
    if (photo?.length) {
      const nMB = 3;
      const maxFileSize = 1024 * 1024 * nMB;
      if (photo[0].size > maxFileSize) {
        alert(`파일 최대크기는 ${nMB}MB 미만입니다. `);
        return;
      }
    }
    try {
      const doc = await addDoc(collection(db, "item"), {
        ...dataWithoutPhoto,
        isGroupBuying: true,
        createdAt: Date.now(),
        userId: user?.uid,
      });
      await updateDoc(doc, {
        id: doc.id,
      });
      if (photo?.length) {
        const locationRef = ref(storage, `item/${user?.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, photo[0]);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onVaild)}>
        <label>카테고리</label>
        <Select defaultValue={"dolls"} {...register("category")}>
          <option value="dolls">솜인형</option>
          <option value="closet">옷장</option>
        </Select>
        <label>속성</label>
        <Select defaultValue="noattr" {...register("attr")}>
          <option value="noattr">무속성</option>
          <option value="attr">속성</option>
        </Select>
        <label>크기</label>
        <Select defaultValue={5} {...register("size")}>
          <option value={5}>5cm</option>
          <option value={10}>10cm</option>
          <option value={15}>15cm</option>
          <option value={20}>20cm</option>
          <option value={25}>25cm</option>
          <option value={30}>30cm</option>
        </Select>
        <br />
        <label>이름</label>
        <Input
          {...register("name", { required: "솜인형 이름을 입력해주세요" })}
          type="text"
          placeholder="솜인형 이름"
        />
        <label>가격</label>
        <Input
          {...register("price", {
            required: "가격을 입력해주세요",
            validate: (value: number) => {
              return isNaN(Number(value)) ? "숫자를 입력해주세요" : true;
            },
          })}
          type="number"
          defaultValue={0}
          placeholder="가격"
        />
        <label>공구주</label>
        <Input
          {...register("groupOrder", {
            required: "공구주가 필수입니다.",
          })}
        />
        <label>총대</label>
        <Input {...register("buyerLeader")} />
        <label>구매처</label>
        <Input {...register("whereBuy")} />
        <label>비고</label>
        <Input {...register("etc")} type="text" />
        <label>링크</label>
        <Input {...register("link")} type="text" />
        <label>사진</label>
        <Input {...register("photo")} type="file" />

        <button type="submit">등록</button>
      </Form>
    </Wrapper>
  );
}
