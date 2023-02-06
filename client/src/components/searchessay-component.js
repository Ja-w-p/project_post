import React, { useEffect, useState } from "react";
import boardService from "../services/board.service";
import { useNavigate } from "react-router";
import EssaylistComponent from "./essaylist-component";

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
            <div className="d-flex justify-content-center">
              <EssaylistComponent postData={searchData} />
            </div>
          )}
          {searchData.length === 0 && (
            <div className="p-5">
              <p className="fs-3 text-center">找不到符合條件的文章。</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchEssayComponent;
