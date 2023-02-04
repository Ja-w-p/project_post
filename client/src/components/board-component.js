import React, { useState, useEffect } from "react";
import boardService from "../services/board.service";
import NotloginComponent from "./notlogin-component";
import SearchComponent from "./search-component";
import { useNavigate } from "react-router";

const BoardComponent = (props) => {
  let { currentUser, boardName } = props;
  let [postData, setPostData] = useState("");
  const navigate = useNavigate();

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
      <NotloginComponent currentUser={currentUser} />

      {currentUser && postData && postData.length !== 0 && (
        <div className="container">
          <div className="mt-3 pt-3">
            <SearchComponent boardName={boardName} />

            <div className="mt-3 mx-5 text-center">
              {postData.map((post) => (
                <div key={post._id}>
                  <div className="row border border-light bg-dark-subtle rounded">
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
