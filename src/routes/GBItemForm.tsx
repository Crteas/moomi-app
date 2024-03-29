import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { IGBForm, deliveryState } from "../types/types";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  width: 480px;
  display: flex;
  flex-direction: column;
  input: {
  }
`;
const Form = styled.form``;
const Input = styled.input`
  background: none;
  border: none;

  &:focus {
    outline: none;
  }
`;
const TextInput = styled(Input)`
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid #bbb;
`;

const BuyersInput = styled.input``;
const Select = styled.select``;

export default function GBItemForm() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowingBuyers, setShowingBuyers] = useState<boolean>(false);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IGBForm>({});
  const watchCheckBox = watch(["amIbuyerLeader"]);
  // fieldValue(name)가 Record<string,any>로 받음
  const { fields, append, remove } = useFieldArray({ control, name: "buyers" });

  const navigate = useNavigate();
  const { id } = useParams();
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
      if (id) {
        // 수정일떄
      } else {
        // 등록일때
        const doc = await addDoc(collection(db, "dollsAndCloset"), {
          ...dataWithoutPhoto,
          isGroupBuying: true,
          createdAt: Date.now(),
          userId: user?.uid,
        });
        await updateDoc(doc, {
          id: doc.id,
        });
        if (photo?.length) {
          const locationRef = ref(
            storage,
            `dollsAndCloset/${user?.uid}/${doc.id}`
          );
          const result = await uploadBytes(locationRef, photo[0]);
          const url = await getDownloadURL(result.ref);
          await updateDoc(doc, {
            photo: url,
          });
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };
  const removeBuyersInput = () => {
    if (fields.length <= 1) return;
    remove(fields.length - 1);
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
        <label>배송상황</label>
        <Select {...register("deliveryProgress")}>
          <option value={deliveryState.inProduction}>제작중</option>
          <option value={deliveryState.inTransit}>배송중</option>
          <option value={deliveryState.delivered}>배송완료</option>
        </Select>
        <br />
        <label>이름</label>
        <TextInput
          {...register("name", { required: "솜인형 이름을 입력해주세요" })}
          type="text"
          placeholder="솜인형 이름"
        />
        <label>가격</label>
        <TextInput
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
        <TextInput
          {...register("groupOrder", {
            required: "공구주가 필수입니다.",
          })}
        />
        <label>총대</label>
        <TextInput {...register("buyerLeader")} />
        <label>구매처</label>
        <TextInput {...register("whereBuy")} />
        <label>비고</label>
        <TextInput {...register("comment")} type="text" />
        <label>링크</label>
        <TextInput {...register("customLink")} type="text" />
        <label>사진</label>
        <TextInput {...register("photo")} type="file" />
        <label htmlFor="">합배송 총대인가요?</label>
        <Input {...register("amIbuyerLeader")} type="checkbox" />

        <div hidden={!watchCheckBox[0]}>
          {fields.map((fields, index) => {
            return (
              <div key={fields.id}>
                <label>등록자{index + 1}</label>
                <BuyersInput {...register(`buyers.${index}.value` as const)} />
                <label>거래장소</label>
                <BuyersInput {...register(`buyers.${index}.value2` as const)} />
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => append({ value: "", value2: "" })}
          >
            추가
          </button>
          <button type="button" onClick={removeBuyersInput}>
            삭제
          </button>
        </div>
        <br />
        <button type="submit">{id ? "수정" : "등록"}</button>
      </Form>
    </Wrapper>
  );
}
