import React, { useState, useEffect } from "react";
import BoardService from "../services/board.service";
import NotloginComponent from "./notlogin-component";
import EssaycardlistComponent from "./essaycardlist-component";
import LoadingpageComponent from "./loadingpage-component";
import SettingbuttonComponent from "./settingbutton-component";

const ProfileComponent = (props) => {
  let { currentUser } = props;
  let [postData, setPostData] = useState("");
  let [loading, setLoading] = useState("");

  useEffect(() => {
    console.log("Using Effect.");
    setLoading(true);
    if (currentUser) {
      BoardService.getUserID(currentUser.user.ID)
        .then((post) => {
          setPostData(post.data);
          setLoading(false);
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
            <div className="card border-light" style={{ width: "13rem" }}>
              <div className="card-body">
                <h3 className="card-title text-center text-light">
                  {currentUser.user.ID}{" "}
                </h3>
                <p className="card-subtitle py-2 text-secondary-subtle">
                  發文數：{postData.length}
                </p>
              </div>
              <div className="card-footer text-secondary-subtle">
                註冊日期：{currentUser.user.date.substring(0, 10)}
              </div>
            </div>
            <SettingbuttonComponent />
          </div>

          <div className="col-md-9 text-center bg-dark-subtle rounded-end-pill p-5">
            {loading && <LoadingpageComponent />}
            {postData.length === 0 && (
              <div>
                <p className="text-muted">還沒發表過任何文章。</p>
              </div>
            )}
            {postData.length !== 0 && (
              <div className="container">
                <p className="fs-3 text-center text-light">發表過的文章</p>
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
