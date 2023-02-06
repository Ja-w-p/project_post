import React from "react";
import { useNavigate } from "react-router-dom";

function EssaycardlistComponent(props) {
  let { postData } = props;
  let navigate = useNavigate();

  const handleSetEssay = (_id) => {
    sessionStorage.setItem("_id", _id);
    navigate("/essay");
  };
  return (
    <div className="row justify-content-center text-center">
      {postData.map((post) => (
        <div key={post._id} className="card m-1" style={{ width: "13rem" }}>
          <div className="card-body">
            <h5 className="card-title">
              <a
                href="# "
                onClick={() => {
                  handleSetEssay(post._id);
                }}
                className="card-link link-dark"
              >
                {post.title}
              </a>
            </h5>
            <p className="card-subtitle text-muted">
              討論版：
              <a href={"/" + post.category} className="card-link link-dark">
                {post.category}
              </a>
            </p>
            <p className="card-content">討論人數：{post.reply.length}</p>
          </div>
          <div className="card-footer text-muted">
            日期：{post.date.substring(0, 10)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EssaycardlistComponent;
