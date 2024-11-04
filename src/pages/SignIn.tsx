import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div>
      <h1>로그인</h1>
      <Link to="/signup">회원가입</Link>
    </div>
  );
}
