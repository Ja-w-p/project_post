import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import boardService from "../services/board.service";

const HomeComponent = (props) => {
  let { currentUser } = props;
  let [popularPost, setPopularPost] = useState("");
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
          setPopularPost(post.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <main>
      <div className="container pb-4">
        <div className="p-5 bg-light mt-5 mx-5">
          <div className="p-4 ">
            {!currentUser && (
              <div>
                <p className="fs-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  minima tenetur odio tempore fuga at voluptas natus inventore
                  odit! Incidunt temporibus qui sapiente molestias, nihil modi
                  error ea dolor a. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Harum qui ad quam voluptatum facilis natus
                  vel enim dolor optio tempora obcaecati, sapiente iure facere
                  eligendi cupiditate ipsa nemo deserunt molestiae.
                </p>
              </div>
            )}
            {currentUser && popularPost && popularPost.length !== 0 && (
              <div className="row">
                <p className="fs-3 text-center">熱門文章</p>
                {popularPost.map((post) => (
                  <div
                    key={post._id}
                    className="card mb-1 mx-1 "
                    style={{ width: "13rem" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        <a
                          href="# "
                          onClick={() => {
                            handleSetEssay(post._id);
                          }}
                          className="link-dark"
                        >
                          {post.title}
                        </a>
                      </h5>
                      <p className="card-subtitle text-muted">
                        討論版：
                        <a href={"/" + post.category} className="link-dark">
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
      </div>
    </main>
  );
};

export default HomeComponent;
