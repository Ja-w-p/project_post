import React, { useEffect, useState } from "react";
import boardService from "../services/board.service";
import { useNavigate } from "react-router";
import ReplyComponent from "./reply-component";
import NotloginComponent from "./notlogin-component";

function EssayComponent(props) {
  let { currentUser } = props;
  let [essay, setEssay] = useState("");
  let [edit, setEdit] = useState("No");
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let _id = sessionStorage.getItem("_id");
  let navigate = useNavigate();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleToEdit = () => {
    boardService
      .patchEditEssay(title, content, _id)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleToConfirm = () => {
    let Yes = window.confirm("確定要刪除這篇文章嗎？");
    if (Yes) {
      handleToDeleteEssay();
    } else {
      window.alert("(*´▽`*)");
    }
  };
  const handleToDeleteEssay = () => {
    boardService
      .deleteEssay(_id)
      .then(() => {
        navigate("/" + essay.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Using effect");
    boardService
      .getPostID(_id)
      .then((data) => {
        setEssay(data.data);
        setTitle(data.data.title);
        setContent(data.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <NotloginComponent currentUser={currentUser} />
      {currentUser && (
        <div className="container">
          <div className="mt-5 pt-3">
            {edit === "Yes" && currentUser.user.ID === essay.auther && (
              <div className="form-group text-center">
                <div className="form-floating my-2">
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleChangeTitle}
                    name="title"
                    placeholder="title"
                    className="form-control"
                  />
                  <label htmlFor="title">標題:</label>
                </div>

                <textarea
                  id="content"
                  rows="10"
                  cols={50}
                  value={content}
                  onChange={handleChangeContent}
                  className="form-control"
                ></textarea>
                <div className="">
                  <button
                    className="btn btn-outline-success m-2"
                    onClick={handleToEdit}
                  >
                    送出
                  </button>
                  <button
                    className="btn btn-outline-secondary m-2"
                    onClick={() => {
                      setEdit("No");
                    }}
                  >
                    取消
                  </button>
                </div>
              </div>
            )}

            {edit === "No" && (
              <div className="container">
                <div className="card text-center mb-3">
                  <div className="card-body">
                    <h3 className="card-title">{essay.title}</h3>
                    <p className="card-subtitle mb-3 text-muted">
                      {essay.auther}
                    </p>
                    <p className="card-text">{essay.content}</p>
                  </div>
                  {currentUser.user.ID === essay.auther && (
                    <div className="m-1 text-end">
                      <div className="">
                        <button
                          onClick={() => {
                            setEdit("Yes");
                          }}
                          className="btn btn-outline-secondary mx-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={handleToConfirm}
                          className="btn btn-outline-danger"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="card-footer text-muted">{essay.date}</div>
                </div>
              </div>
            )}

            <hr />
          </div>
          <div>
            <ReplyComponent currentUser={currentUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EssayComponent;
