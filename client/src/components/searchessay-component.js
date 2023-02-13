import React, { useEffect, useState } from "react";
import boardService from "../services/board.service";
import { useNavigate } from "react-router";
import EssaylistComponent from "./essaylist-component";
import LoadingpageComponent from "./loadingpage-component";

function SearchEssayComponent(props) {
  let { currentUser } = props;
  let [searchData, setSearchData] = useState("");
  let [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  let boardName = sessionStorage.getItem("boardName");
  let keyword = sessionStorage.getItem("keyword");
  const handleToBoard = () => {
    navigate("/" + boardName);
  };
  useEffect(() => {
    console.log("Using effect");
    setLoading(true);
    boardService
      .getSeaech(boardName, keyword)
      .then((post) => {
        setSearchData(post.data);
        setLoading(false);
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
          {loading && <LoadingpageComponent />}
          {!loading && (
            <div className="text-center mt-5">
              <p className="fs-3">包含 「{keyword}」 的文章標題如下：</p>
              <button
                className="btn btn-outline-light my-3"
                onClick={handleToBoard}
              >
                返回版面
              </button>
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
      )}
    </div>
  );
}

export default SearchEssayComponent;
