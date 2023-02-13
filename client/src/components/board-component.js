import React, { useState, useEffect } from "react";
import boardService from "../services/board.service";
import NotloginComponent from "./notlogin-component";
import SearchComponent from "./search-component";
import EssaylistComponent from "./essaylist-component";
import LoadingpageComponent from "./loadingpage-component";
import { useNavigate } from "react-router-dom";

const BoardComponent = (props) => {
  let { currentUser, boardName } = props;
  let [postData, setPostData] = useState("");
  let [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleToPostEssay = () => {
    sessionStorage.setItem("boardName", boardName);
    navigate("/postessay");
  };

  useEffect(() => {
    console.log("Using effect");
    setLoading(true);
    boardService
      .getPost(boardName)
      .then((post) => {
        setPostData(post.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [boardName]); //因為數個討論版共用一個compontent,只要使用者改變訪問路徑（boardname）就更新頁面

  return (
    <div className="container">
      <NotloginComponent currentUser={currentUser} />

      {currentUser && postData && postData.length !== 0 && (
        <div className="mt-3 pt-3">
          <SearchComponent boardName={boardName} />
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-light mb-3"
              onClick={handleToPostEssay}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
              發文
            </button>
          </div>

          <div className="d-flex justify-content-center">
            {loading && <LoadingpageComponent />}
            {!loading && <EssaylistComponent postData={postData} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardComponent;
