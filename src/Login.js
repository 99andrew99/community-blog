import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "./fbase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const TopContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const SecondContainer = styled.div`
  width: 25%;
  height: 40%;
  border-radius: 10px;
  border: 1px solid #0b5ed7;
  padding: 20px;

  @media screen and (max-width: 1400px) {
    width: 50%;
    height: 38%;
  }
  @media screen and (max-width: 550px) {
    width: 80%;
    height: 45%;
  }
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;

  @media screen and (max-width: 550px) {
    font-size: 1.5rem;
  }
`;

const FormBox = styled(Form)`
  height: 80%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

const FormButton = styled(Button)`
  margin-top: 30px;

  @media screen and (max-width: 550px) {
    margin-top: auto;
    font-size: 0.7rem;
  }
`;

function Login() {
  const loginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value; // 이메일 입력값 가져오기
    const password = e.target.password.value; // 비밀번호 입력값 가져오기

    try {
      // Firebase Authentication의 createUserWithEmailAndPassword 함수를 사용하여 회원가입 처리
      const userCredential = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
      const user = userCredential.user;

      //   console.log("회원가입 성공:", user);
      alert("로그인 성공");
    } catch (error) {
      //   console.log("회원가입 실패:", error);
      alert("로그인 실패");
    }
  };

  const signSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value; // 이메일 입력값 가져오기
    const password = e.target.password.value; // 비밀번호 입력값 가져오기

    try {
      // Firebase Authentication의 createUserWithEmailAndPassword 함수를 사용하여 회원가입 처리
      const userCredential = await createUserWithEmailAndPassword(
        authService,
        email,
        password
      );

      //   console.log("회원가입 성공:", user);
      alert("회원가입 성공");
    } catch (error) {
      //   console.log("회원가입 실패:", error);
      alert("회원가입 실패");
    }
  };

  const gLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authService, provider);
  };

  return (
    <TopContainer>
      <SecondContainer>
        <Title>로그인</Title>
        <FormBox onSubmit={loginSubmit}>
          <Form.Label htmlFor="email">이메일</Form.Label>
          <Form.Control type="email" name="email" required />
          <Form.Label htmlFor="password">비밀번호</Form.Label>
          <Form.Control type="password" name="password" required />
          <FormButton variant="outline-primary" type="submit" value="로그인">
            로그인
          </FormButton>
          <FormButton variant="outline-primary" onClick={gLogin}>
            구글 로그인
          </FormButton>
        </FormBox>
      </SecondContainer>

      <SecondContainer>
        <Title>회원가입</Title>
        <FormBox onSubmit={signSubmit}>
          <Form.Label htmlFor="email">이메일</Form.Label>
          <Form.Control type="email" name="email" required />
          <Form.Label htmlFor="password">비밀번호</Form.Label>
          <Form.Control type="password" name="password" required />
          <FormButton variant="outline-primary" type="submit" value="회원가입">
            회원가입
          </FormButton>
        </FormBox>
      </SecondContainer>
    </TopContainer>
  );
}

export default Login;
