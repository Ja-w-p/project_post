import React, { useEffect, useState } from "react";
import boardService from "../services/board.service";
import { useNavigate } from "react-router";
import BoardessayComponent from "./boardessay-component";

function SearchEssayComponent(props) {
  let { currentUser } = props;
  let [searchData, setSearchData] = useState("");
  let navigate = useNavigate();
  let boardName = sessionStorage.getItem("boardName");

  const handleToBoard = () => {
    navigate("/" + boardName);
  };
  useEffect(() => {
    console.log("Using effect");
    let keyword = sessionStorage.getItem("keyword");
    boardService
      .getSeaech(boardName, keyword)
      .then((post) => {
        setSearchData(post.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {currentUser && (
        <div className="container">
          <div className="text-center mt-5">
            <button
              className="btn btn-outline-dark mt-3"
              onClick={handleToBoard}
            >
              返回版面
            </button>
          </div>
          {searchData.length !== 0 && (
            <div className="mx-5 px-5 pt-5">
              {searchData.map((post) => (
                <BoardessayComponent post={post} />
              ))}
            </div>
          )}
          {searchData.length === 0 && (
            <div className="m-5 p-5 text-center">
              <p className="fs-3">找不到符合條件的文章。</p>
              <button
                className="btn btn-outline-dark mt-3"
                onClick={handleToBoard}
              >
                返回版面
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchEssayComponent;
