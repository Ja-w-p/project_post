import React from "react";
import { useNavigate } from "react-router";

function BoardessayComponent(props) {
  let { post } = props;
  const navigate = useNavigate();

  const handleSetEssay = (_id) => {
    sessionStorage.setItem("_id", _id);
    navigate("/essay");
  };
  return (
    <div>
      <div
        key={post._id}
        className="row border border-light bg-dark-subtle mx-5 pt-3 rounded-top"
      >
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
        <p className="col-md-4">發表日期：{post.date.substring(0, 10)}</p>
      </div>
    </div>
  );
}

export default BoardessayComponent;
