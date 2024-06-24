import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  IFormItems,
  IGBForm,
  IdollsAndCloset,
  deliveryState,
} from "../types/types";
import { auth, db, storage } from "../firebase";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { formDataState } from "../atomss";
import { User } from "firebase/auth";
import { deleteStoragePhoto } from "../api/firebaseStorage";
import PageWrapper from "../styles/Wrapper";

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
  const [formData, setFormData] = useRecoilState(formDataState);
  const resetFormData = useResetRecoilState(formDataState);
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IGBForm>({
    defaultValues: {
      name: formData?.name,
      amIbuyerLeader: formData?.amIbuyerLeader,
      attr: formData?.attr,
      buyerLeader: formData?.buyerLeader,
      category: formData?.category,
      comment: formData?.comment,
      groupOrder: formData?.groupOrder,
      customLink: formData?.customLink,
      price: formData?.price,
      size: formData?.size,
      deliveryProgress: formData?.deliveryProgress,
      whereBuy: formData?.whereBuy,
      buyers: formData?.buyers,
    },
  });

  const setValues = (data: IdollsAndCloset) => {
    const { createdAt, id, userId, ...setData } = data;
    for (let i in setData) {
      console.log(i, setData[i]);
      const item = i as IFormItems;
      setValue(item, setData[i]);
    }
  };

  const getItem = async () => {
    const user = auth.currentUser;
    if (!id) return;
    setLoading(true);
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
      setValues(data);
      //react hook form 가져오기
    } catch (e) {
      console.log("불러오기중 오류");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData === null) {
      // 채우는거 가져와...
      getItem();
      console.log("가져옴.");
    }
  }, []);
  const watchCheckBox = watch(["amIbuyerLeader"]);
  // fieldValue(name)가 Record<string,any>로 받음
  const { fields, append, remove } = useFieldArray({ control, name: "buyers" });

  const navigate = useNavigate();
  const { id } = useParams();

  // 사진크기 함수
  const validatePhotoSize = (photo: FileList, nMB: number) => {
    const maxFileSize = 1024 * 1024 * nMB;
    return photo[0].size < maxFileSize;
  };

  //사진 추가 함수
  const addPhoto = async (
    photo: FileList,
    user: User,
    doc: DocumentReference
  ) => {
    const locationRef = ref(storage, `dollsAndCloset/${user?.uid}/${doc.id}`);
    const result = await uploadBytes(locationRef, photo[0]);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc, {
      photo: url,
    });
    console.log("등록완료");
  };

  //firebase 인형 데이터 추가 함수
  const addGBItem = async (user: User, data: IGBForm) => {
    const { photo, ...dataWithoutPhoto } = data;
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
      addPhoto(photo, user, doc);
    }
  };

  // firebase안의 인형 데이터 수정 함수
  const updateGBItem = async (user: User, id: string, data: IGBForm) => {
    const { photo, ...dataWithoutPhoto } = data;
    const docRef = doc(db, "dollsAndCloset", id);
    await updateDoc(docRef, {
      ...dataWithoutPhoto,
      isGroupBuying: true,
      createdAt: Date.now(),
      userId: user?.uid,
      id,
    });
    // photo가 있으면 삭제 후 재등록
    if (photo?.length) {
      if (formData?.photo) {
        await deleteStoragePhoto("dollsAndCloset", user, id);
        console.log("사진삭제");
      }
      addPhoto(photo, user, docRef);
      console.log("사진등록");
    }
  };

  //Form submit함수
  const submitFormData = async (data: IGBForm) => {
    if (isLoading) return;

    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    try {
      if (id) {
        // 수정일떄
        updateGBItem(user, id, data);
      } else {
        // 등록일때
        addGBItem(user, data);
      }
      resetFormData();
      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // 합배송 인원 input 제거함수
  const removeBuyersInput = () => {
    if (fields.length <= 1) return;
    remove(fields.length - 1);
  };

  //렌더링시에 한번만 체크하면 충분함.
  useEffect(() => {
    if (!id) {
      resetFormData();
    }
  }, []);
  return (
    <PageWrapper>
      {isLoading ? (
        <></>
      ) : (
        <Form onSubmit={handleSubmit(submitFormData)}>
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
          <br />
          <img src={formData?.photo} width={200} />
          <TextInput
            {...register("photo", {
              required: false,
              validate: {
                fileSize: (file) => {
                  if (!file) {
                    return true;
                  } else {
                    if (file.length !== 0) {
                      return validatePhotoSize(file, 5);
                    }
                  }
                },
              },
            })}
            placeholder="hhh"
            type="file"
          />
          <label htmlFor="">합배송 총대인가요?</label>
          <Input {...register("amIbuyerLeader")} type="checkbox" />

          <div hidden={!watchCheckBox[0]}>
            {fields.map((fields, index) => {
              return (
                <div key={fields.id}>
                  <label>등록자{index + 1}</label>
                  <BuyersInput
                    {...register(`buyers.${index}.value` as const)}
                  />
                  <label>거래장소</label>
                  <BuyersInput
                    {...register(`buyers.${index}.value2` as const)}
                  />
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
      )}
    </PageWrapper>
  );
}
