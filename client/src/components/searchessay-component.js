import React, { useEffect, useState } from "react";
import boardService from "../services/board.service";
import { useNavigate } from "react-router";

function SearchEssayComponent(props) {
  let { currentUser } = props;
  let [searchData, setSearchData] = useState("");
  let navigate = useNavigate();
  let boardName = sessionStorage.getItem("boardName");

  const handleToBoard = () => {
    navigate("/" + boardName);
  };
  const handleSetEssay = (_id) => {
    sessionStorage.setItem("_id", _id);
    navigate("/essay");
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
            <div className="mt-3 mx-5 text-center">
              {searchData.map((post) => (
                <div
                  key={post._id}
                  className="border border-light bg-dark-subtle rounded-top post"
                >
                  <div className="row">
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
