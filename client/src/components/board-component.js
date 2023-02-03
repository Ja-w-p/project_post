import React, { useState, useEffect } from "react";
import boardService from "../services/board.service";
import { useNavigate } from "react-router";

const BoardComponent = (props) => {
  let { currentUser, boardName } = props;
  let [postData, setPostData] = useState("");
  let [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleToSubmit = () => {
    sessionStorage.setItem("boardName", boardName);
    sessionStorage.setItem("keyword", keyword);
    navigate("/search");
  };

  const handleToLogin = () => {
    navigate("/login");
  };

  const handleSetEssay = (_id) => {
    sessionStorage.setItem("_id", _id);
    navigate("/essay");
  };
  useEffect(() => {
    console.log("Using effect");
    boardService
      .getPost(boardName)
      .then((post) => {
        setPostData(post.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [boardName]); //因為數個討論版共用一個compontent,只要使用者改變訪問路徑（boardname）就更新頁面

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
      {currentUser && postData && postData.length !== 0 && (
        <div className="container">
          <div className="mt-3 mx-5 px-5 pt-3">
            <div>
              <form className="d-flex justify-content-center flex-row mx-5 pb-3">
                <input
                  className="w-50 form-control mx-3"
                  type="Search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleChangeKeyword}
                />
                <button
                  className="btn btn-outline-dark"
                  onClick={handleToSubmit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  搜尋
                </button>
              </form>
            </div>
            <div className="mt-3">
              {postData.map((post) => (
                <div
                  key={post._id}
                  className="row border border-light bg-dark-subtle mx-5 mb-2 pt-3 rounded-top"
                >
                  <p className="col-md-1">{post.reply.length}</p>
                  <h5 className="col-md-4">
                    <a
                      href="# "
                      onClick={() => {
                        handleSetEssay(post._id);
                      }}
                      className="link-dark text-decoration-none"
                    >
                      {post.title}
                    </a>
                  </h5>

                  <p className="col-md-3">作者：{post.auther}</p>

                  <p className="col-md-4">
                    發表日期：{post.date.substring(0, 10)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardComponent;
