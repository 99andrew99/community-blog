import Login from "./Login";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./fbase";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";

const TopContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  const [logined, setLogined] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const unsubscribe = useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        const uid = user.email;
        console.log(uid);
        setCurrentUser(uid);
        setLogined(true);
      } else {
        setLogined(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (logined === null) {
    // 로그인 상태 확인 전에는 로딩 또는 다른 로그인 체크 화면을 렌더링
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopContainer>
        {logined ? <Home currentUser={currentUser} /> : <Login />}
      </TopContainer>
    </>
  );
}

export default App;
