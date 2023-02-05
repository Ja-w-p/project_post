import React, { useState, useEffect } from "react";
import boardService from "../services/board.service";
import { useNavigate } from "react-router-dom";

const HomeComponent = (props) => {
  let { currentUser } = props;
  let [postData, setPostData] = useState("");

  let navigate = useNavigate();

  const handleSetEssay = (_id) => {
    sessionStorage.setItem("_id", _id);
    navigate("/essay");
  };

  useEffect(() => {
    if (currentUser) {
      boardService
        .getMostPopular()
        .then((post) => {
          setPostData(post.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <main>
      <div className="container">
        <div className="bg-dark-subtle mt-5 ms-5 py-5 rounded-pill d-flex">
          {!currentUser && (
            <div className="p-5">
              <p className="fs-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                minima tenetur odio tempore fuga at voluptas natus inventore
                odit! Incidunt temporibus qui sapiente molestias, nihil modi
                error ea dolor a. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Harum qui ad quam voluptatum facilis natus vel
                enim dolor optio tempora obcaecati, sapiente iure facere
                eligendi cupiditate ipsa nemo deserunt molestiae.
              </p>
            </div>
          )}
          {currentUser && postData && postData.length !== 0 && (
            <div className="row justify-content-center text-center">
              <p className="fs-3">熱門文章</p>
              {postData.map((post) => (
                <div
                  key={post._id}
                  className="card m-1"
                  style={{ width: "13rem" }}
                >
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
                      <a
                        href={"/" + post.category}
                        className="card-link link-dark"
                      >
                        {post.category}
                      </a>
                    </p>
                    <p className="card-content">
                      討論人數：{post.reply.length}
                    </p>
                  </div>
                  <div className="card-footer text-muted">
                    日期：{post.date.substring(0, 10)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
