import styled from "styled-components";
import { signOut } from "firebase/auth";
import { authService } from "./fbase";
import Button from "react-bootstrap/Button";
import Write from "./Write";
import Posts from "./Posts";

const TopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 7vh;
  align-items: center;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 0;

  @media screen and (max-width: 1400px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 550px) {
    font-size: 1.5rem;
  }
`;

const Logout = styled(Button)`
  margin-left: auto;
  width: 100px;
  height: 40px;

  @media screen and (max-width: 1400px) {
    width: 75px;
    height: 30px;
    font-size: 0.7rem;
  }
  @media screen and (max-width: 550px) {
    width: 75px;
    height: 30px;
    font-size: 0.7rem;
  }
`;

const CurrentUser = styled.p`
  margin-left: 20px;
  margin-bottom: 0;
  font-weight: 600;
  margin-right: 20px;

  @media screen and (max-width: 1400px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

const MainContainer = styled.div`
  width: 100vw;
  height: 90vh;
`;

function Home({ currentUser }) {
  const name = currentUser;
  const logout = () => {
    signOut(authService);
  };

  return (
    <TopContainer>
      <Header>
        <Title>블로그</Title>
        <Logout variant="outline-primary" onClick={logout}>
          로그아웃
        </Logout>
        <CurrentUser>{currentUser}</CurrentUser>
      </Header>

      <MainContainer>
        <Write currentUser={name} />
        <Posts />
      </MainContainer>
    </TopContainer>
  );
}

export default Home;
