import React, { useEffect, useState } from "react";
import boardService from "../services/board.service";
import { useNavigate } from "react-router";
import ReplyComponent from "./reply-component";

function EssayComponent(props) {
  let { currentUser } = props;
  let [essay, setEssay] = useState("");
  let [edit, setEdit] = useState("No");
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let _id = sessionStorage.getItem("_id");
  let navigate = useNavigate();

  const handleToLogin = () => {
    navigate("/login");
  };
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
      {!currentUser && (
        <div className="m-5 p-5 text-center">
          <p className="fs-1 pb-3">＜請先登入＞</p>
          <button className="btn btn-outline-dark" onClick={handleToLogin}>
            前往登入頁
          </button>
        </div>
      )}

      {currentUser && (
        <div className="container">
          <div className="mt-5 pt-3 mx-5 px-5">
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
                          編輯
                        </button>
                        <button
                          onClick={handleToConfirm}
                          className="btn btn-outline-danger"
                        >
                          刪除
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
          <div className="">
            <ReplyComponent currentUser={currentUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EssayComponent;
