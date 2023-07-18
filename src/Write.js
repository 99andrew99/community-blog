import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "./fbase";
import { useState, useEffect } from "react";

// Add a new document in collection "cities"

const TopContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1400px) {
    margin-top: 5vh;
  }
  @media screen and (max-width: 550px) {
    margin-top: 5vh;
  }
`;
const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;

  @media screen and (max-width: 1400px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 550px) {
    font-size: 1.2rem;
  }
`;
const PostForm = styled(Form)`
  width: 30%;
  height: 40%;
  display: flex;

  @media screen and (max-width: 1400px) {
    width: 50%;
    height: 50%;
  }
  @media screen and (max-width: 550px) {
    width: 80%;
    height: 80%;
  }
`;

function Write({ currentUser }) {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const postObj = {
        ...doc.data(),
        id: doc.id,
      };
      setPosts((p) => [postObj, ...p]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const postSomething = async (event) => {
    event.preventDefault();
    const data = event.target.postdata.value;

    try {
      await addDoc(collection(db, "posts"), {
        post,
        user: currentUser,
        createdAt: new Date().toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });

      alert("포스트 성공");
      window.location.reload();
    } catch (error) {
      alert("포스트 실패");
      console.log(error);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setPost(value);
  };

  return (
    <TopContainer>
      <Title>글작성</Title>
      <PostForm onSubmit={postSomething}>
        <PostForm.Control
          style={{ height: "100%" }}
          type="text"
          name="postdata"
          onChange={onChange}
          placeholder="포스트할 글을 작성하세요."
          required
        />
        <Button
          style={{ marginLeft: "auto", marginRight: "auto" }}
          variant="outline-primary"
          type="submit"
        >
          Submit
        </Button>
      </PostForm>
    </TopContainer>
  );
}

export default Write;
