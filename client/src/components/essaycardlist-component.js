import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EssaycardlistComponent(props) {
  let { postData } = props;
  const navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(postData.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumber = pageNumbers.map((number) => {
    return (
      <button
        onClick={() => setCurrentPage(number)}
        key={number}
        className="pageListButton"
      >
        {number}
      </button>
    );
  });

  const handleSetEssay = (_id) => {
    sessionStorage.setItem("_id", _id);
    navigate("/essay");
  };
  return (
    <div className="text-center">
      <div className="row justify-content-center cardBox">
        {currentPosts.map((post) => (
          <div
            key={post._id}
            className="card m-1 border-light-subtle"
            style={{ width: "13rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <button
                  onClick={() => {
                    handleSetEssay(post._id);
                  }}
                  className="titleButton text-decoration-none"
                >
                  {post.title}
                </button>
              </h5>
              <p className="card-subtitle text-secondary-subtle">
                討論版：
                <a href={"/" + post.category} className="card-link link-light">
                  {post.category}
                </a>
              </p>
              <p className="card-content">留言數：{post.reply.length}</p>
            </div>
            <div className="card-footer text-secondary-subtle">
              日期：{post.date.substring(0, 10)}
            </div>
          </div>
        ))}
      </div>

      <p>~{renderPageNumber}~</p>
    </div>
  );
}

export default EssaycardlistComponent;
