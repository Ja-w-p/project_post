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
  const handleToSetting = () => {
    navigate("/setting");
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
            <div className="mt-5">
              <button
                className="btn btn-outline-secondary"
                onClick={handleToSetting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
              </button>
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
