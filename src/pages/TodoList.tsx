import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Post {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  editable: boolean;
}

export default function TodoList() {
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();

  const handleNewBtn = () => {
    const emptyPost: Post = {
      title: "",
      content: "",
      id: "",
      createdAt: "",
      updatedAt: "",
      editable: true,
    };
    setPost(emptyPost);
  };
  const handleComplete = () => {
    if (post?.id) {
      handleUpdateTodo();
    } else {
      handleCreateTodo();
    }
  };

  const handleUpdateTodo = () => {};

  const handleCreateTodo = async () => {
    const response = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: post?.title,
        content: post?.content,
      }),
    });

    const result = await (await response.json()).data;

    if (response.status == 200) {
      const newPost: Post = {
        title: result.title,
        content: result.content,
        id: result.id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        editable: false,
      };

      setPost(newPost);
    } else {
      localStorage.clear();
      navigate("/signin");
      alert("문제가 있습니다. 재로그인 해주시기 바랍니다.");
    }
  };

  return (
    <div>
      <h2>TodoList</h2>
      <TodoContainer>
        <ListContainer>
          <ul>
            <li>헬로</li>
            <li>하이</li>
            <li onClick={handleNewBtn}>new</li>
          </ul>
        </ListContainer>
        <DetailWrapper>
          {post != null && (
            <Detail>
              <input disabled={!post?.editable}>{post?.title}</input>
              <input disabled={!post?.editable}>{post?.content}</input>
              <button onClick={handleComplete}></button>
            </Detail>
          )}
        </DetailWrapper>
      </TodoContainer>
    </div>
  );
}

const TodoContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const ListContainer = styled.div``;

const DetailWrapper = styled.div``;
const Detail = styled.div``;
