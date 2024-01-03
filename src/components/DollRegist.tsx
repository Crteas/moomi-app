import { useForm } from "react-hook-form";
import { useParams } from "react-router";
// 인형정보를 등록하는 페이지
function DollRegist() {
  const id = useParams();
  console.log(id);
  // handleSubmit(onVaild, onInvalid)
  //
  const { register, watch, handleSubmit } = useForm();
  const onValid = () => {};

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("dollName")}
          placeholder="솜인형 이름"
          type="text"
        />
        <input {...register("size")} placeholder="크기" type="text" />
        <input {...register("whereBuy")} placeholder="구매처" type="text" />
        <input {...register("groupOrder")} placeholder="공구주" type="text" />
        <input {...register("price")} placeholder="가격" type="text" />
        <input {...register("etc")} placeholder="상황" type="text" />
        <input {...register("attr")} placeholder="속성" type="text" />
      </form>
    </>
  );
}
export default DollRegist;

//컴포넌트와 페이지를 구분해야하나?
