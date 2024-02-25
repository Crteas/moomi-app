import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 100px;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input``;
const Switcher = styled.div``;
type IUserData = {
  email: string;
  name: string;
  password: string;
  error?: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IUserData>();

  const onVaild = async (data: IUserData) => {
    const { email, password } = data;
    if (isLoading) return;
    try {
      // 자격증명시도.
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, "/////", e.message);
        //에러처리할것
        setError("error", { message: e.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const onInvaild = () => {
    clearErrors("error");
    handleSubmit(onVaild)();
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onVaild, onInvaild)}>
        <label htmlFor="">이메일</label>
        <Input
          {...register("email", { required: true, minLength: 5 })}
          placeholder="이메일"
          type="email"
          required
        />
        <label htmlFor="">비밀번호</label>
        <Input
          {...register("password")}
          placeholder="비밀번호"
          type="password"
          required
        />
        <Input type="submit" value={"로그인"} />
      </Form>
      <span>{errors.error?.message as string}</span>
      <Switcher>
        아이디가 없으신가요?
        <Link to="/create-account">아이디 만들기</Link>
      </Switcher>
    </Wrapper>
  );
}

export default LoginPage;
