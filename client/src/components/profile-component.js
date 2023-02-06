import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BoardService from "../services/board.service";
import NotloginComponent from "./notlogin-component";
import EssaycardlistComponent from "./essaycardlist-component";

const ProfileComponent = (props) => {
  const navigate = useNavigate();
  let { currentUser } = props;
  let [postData, setPostData] = useState("");

  const handlePostEssay = () => {
    navigate("/postessay");
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
      <NotloginComponent currentUser={currentUser} />
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                    發表文章
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted">
                註冊日期：{currentUser.user.date.substring(0, 10)}
              </div>
            </div>
            <div className="my-3">
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

          <div className="col-md-9 text-center bg-dark-subtle rounded-end-pill p-5">
            <p className="fs-3">發表過的文章</p>
            {postData.length === 0 && (
              <div>
                <p className="text-muted">還沒發表過任何文章。</p>
              </div>
            )}
            {postData.length !== 0 && (
              <div className="container">
                <EssaycardlistComponent postData={postData} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
