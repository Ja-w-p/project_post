import React, { useState } from "react";
import { useNavigate } from "react-router";

function EssaylistComponent(props) {
  let { postData } = props;
  const navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
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
    <div>
      <div className="text-center" style={{ width: "60vw" }}>
        {currentPosts.map((post) => (
          <div
            key={post._id}
            className="border border-secondary-subtle rounded bg-dark-subtle post"
          >
            <div className="row">
              <p className="col-md-1">{post.reply.length}</p>
              <h5 className="col-md-6">
                <button
                  onClick={() => {
                    handleSetEssay(post._id);
                  }}
                  className="titleButton text-decoration-none"
                >
                  {post.title}
                </button>
              </h5>
              <p className="col-md-2">作者：{post.auther}</p>
              <p className="col-md-3">發表日期：{post.date.substring(0, 10)}</p>
            </div>
          </div>
        ))}

        <p>~ {renderPageNumber} ~</p>
      </div>
    </div>
  );
}

export default EssaylistComponent;
