import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import styled from "styled-components";
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

const DollInput = styled.input.attrs({ autoComplete: "off" })``;
function DollRegist() {
  const id = useParams();
  // handleSubmit(onVaild, onInvalid)
  //
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="dollName">솜인형 이름</label>
        <DollInput
          id="dollName"
          {...register("dollName", { required: true })}
          placeholder="솜인형 이름"
          type="text"
        />
        <label htmlFor="size">크기</label>
        <DollInput
          id="size"
          {...register("size", { required: true })}
          placeholder="크기"
          type="text"
        />
        <label htmlFor="whereBuy">구매처</label>
        <DollInput
          id="whereBuy"
          {...register("whereBuy", { required: true })}
          placeholder="구매처"
          type="text"
        />
        <label htmlFor="groupOrder">공구주</label>
        <DollInput
          id="groupOrder"
          {...register("groupOrder", { required: true })}
          placeholder="공구주"
          type="text"
        />
        <label htmlFor="price">가격</label>
        <DollInput
          id="price"
          {...register("price", { required: true })}
          placeholder="가격"
          type="text"
        />
        <label htmlFor="etc">상황</label>
        <DollInput
          id="etc"
          {...register("etc", { required: true })}
          placeholder="상황"
          type="text"
        />
        <label htmlFor="attr">속성</label>
        <DollInput
          id="attr"
          {...register("attr", { required: true })}
          placeholder="속성"
          type="text"
        />
        <button>등록</button>
      </form>
    </FormContainer>
  );
}
export default DollRegist;

//컴포넌트와 페이지를 구분해야하나?
