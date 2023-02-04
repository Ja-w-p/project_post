import React, { useState, useEffect } from "react";
import boardService from "../services/board.service";
import NotloginComponent from "./notlogin-component";
import SearchComponent from "./search-component";
import BoardessayComponent from "./boardessay-component";

const BoardComponent = (props) => {
  let { currentUser, boardName } = props;
  let [postData, setPostData] = useState("");
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
          <div className="mt-3 mx-5 px-5 pt-3">
            <SearchComponent boardName={boardName} />

            <div className="mt-3">
              {postData.map((post) => (
                <BoardessayComponent post={post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardComponent;
