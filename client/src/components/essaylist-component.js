import React from "react";
import { useNavigate } from "react-router";

function EssaylistComponent(props) {
  let { postData } = props;
  const navigate = useNavigate();

  const handleSetEssay = (_id) => {
    sessionStorage.setItem("_id", _id);
    navigate("/essay");
  };
  return (
    <div>
      <div className="mt-5 text-center" style={{ width: "60vw" }}>
        {postData.map((post) => (
          <div
            key={post._id}
            className="border border-secondary-subtle rounded bg-dark-subtle post"
          >
            <div className="row">
              <p className="col-md-1">{post.reply.length}</p>
              <h5 className="col-md-6">
                <a
                  href="# "
                  onClick={() => {
                    handleSetEssay(post._id);
                  }}
                  className="link-light text-decoration-none"
                >
                  {post.title}
                </a>
              </h5>
              <p className="col-md-2">作者：{post.auther}</p>
              <p className="col-md-3">發表日期：{post.date.substring(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EssaylistComponent;
