import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setIsLogined(false);
    } else {
      setIsLogined(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    setIsLogined(false);
  };

  return (
    <div>
      <h2>Home</h2>
      {isLogined ? (
        <MenuContainer>
          {`안녕하세요. ${localStorage.getItem("email")}님!`}
          <button onClick={handleLogout}>로그아웃</button>
        </MenuContainer>
      ) : (
        <MenuContainer>
          <Link to="/signin">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </MenuContainer>
      )}
    </div>
  );
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
