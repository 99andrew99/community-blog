import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./fbase";

const TopContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostCard = styled(Card)`
  width: 20%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: center;
  /* height: 40%; */

  @media screen and (max-width: 1400px) {
    width: 40%;
    font-size: 0.8rem;
    margin-top: 2vh;
  }
  @media screen and (max-width: 550px) {
    width: 70%;
    font-size: 0.8rem;
    margin-top: 2vh;
  }
`;

function Posts() {
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

  const reformDate = (createdAt) => {
    const dateParts = createdAt.split(". ");
    const timeParts = dateParts[3].split(" ")[1].split(":");
    if (dateParts[3].split(" ")[0] === "오후" && timeParts[0] !== "12") {
      timeParts[0] = (parseInt(timeParts[0]) + 12).toString();
    }
    return new Date(
      `${dateParts[0]}.${dateParts[1]}.${dateParts[2]} ${timeParts.join(":")}`
    );
  };

  const sortedPosts = [...posts]
    .sort((a, b) => reformDate(b.createdAt) - reformDate(a.createdAt))
    .slice(0, 6);

  return (
    <TopContainer>
      {sortedPosts.map((post) => (
        <PostCard bg={"primary"} text={"white"} key={post.createdAt}>
          <PostCard.Title style={{ fontWeight: "600" }}>
            {post.post}
          </PostCard.Title>
          <PostCard.Link style={{ textDecoration: "none", color: "white" }}>
            작성시간:{post.createdAt}
          </PostCard.Link>
          <PostCard.Link
            style={{
              textDecoration: "none",
              color: "white",
              marginLeft: "0",
            }}
          >
            작성자:{post.user}
          </PostCard.Link>
        </PostCard>
      ))}
    </TopContainer>
  );
}

export default Posts;
