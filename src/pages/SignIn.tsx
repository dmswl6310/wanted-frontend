import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegrex = /.*@+.*\.+.*/;
  const passwordRegrex = /.{8,}/;
  const isValid = emailRegrex.test(email) && passwordRegrex.test(password);

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <h2>로그인</h2>
      <LoginForm onSubmit={handleLogin}>
        <input
          placeholder="이메일(아이디)"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email &&
          !emailRegrex.test(email) &&
          "이메일은 @, . 을 포함해야합니다."}
        <input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password &&
          !passwordRegrex.test(password) &&
          "비밀번호는 8자 이상이어야 합니다."}
        <button type="submit" disabled={!isValid}>
          로그인
        </button>
      </LoginForm>
      <Link to="/signup">회원가입</Link>
    </div>
  );
}

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;
