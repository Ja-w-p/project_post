import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BoardService from "../services/board.service";

const ProfileComponent = (props) => {
  const navigate = useNavigate();
  let { currentUser } = props;
  let [postData, setPostData] = useState("");

  const handleToLogin = () => {
    navigate("/login");
  };

  const handlePostEssay = () => {
    navigate("/postessay");
  };
  const handleSetEssay = (_id) => {
    sessionStorage.setItem("_id", _id);
    navigate("/essay");
  };

  useEffect(() => {
    console.log("Using Effect.");
    if (currentUser) {
      BoardService.getUserID(currentUser.user.ID)
        .then((post) => {
          setPostData(post.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      {!currentUser && (
        <div className="m-5 p-5 text-center">
          <p className="fs-1  pb-3">＜請先登入＞</p>
          <button className="btn btn-outline-dark" onClick={handleToLogin}>
            前往登入頁
          </button>
        </div>
      )}
      {currentUser && (
        <div className="pt-5 row">
          <div className="col-md-3">
            <div className="card border-dark" style={{ width: "13rem" }}>
              <div className="card-body">
                <h3 className="card-title text-center">
                  {currentUser.user.ID}{" "}
                </h3>
                <p className="card-subtitle py-2 text-muted">
                  發文數：{postData.length}
                </p>
                <div className="card-content text-center">
                  <button
                    onClick={handlePostEssay}
                    className="btn btn-outline-dark"
                  >
                    發表文章
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted">
                註冊日期：{currentUser.user.date.substring(0, 10)}
              </div>
            </div>
          </div>

          <div className="col-md-9 text-center">
            <p className="fs-3">發表過的文章</p>
            {postData.length === 0 && (
              <div>
                <p className="text-muted">還沒發表過任何文章。</p>
              </div>
            )}
            {postData.length !== 0 && (
              <div className="container">
                <div className="my-5 row">
                  {postData.map((post) => (
                    <div
                      key={post._id}
                      className="card mb-1 mx-1"
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
                          回應數：{post.reply.length}
                        </p>
                      </div>
                      <div className="card-footer text-muted">
                        日期：{post.date.substring(0, 10)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
