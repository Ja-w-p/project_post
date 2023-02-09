import React, { useState, useEffect } from "react";
import boardService from "../services/board.service";
import EssaycardlistComponent from "./essaycardlist-component";
import LoadingpageComponent from "./loadingpage-component";
import HomepageimgComponent from "./homepageimg-component";

const HomeComponent = (props) => {
  let { currentUser } = props;
  let [postData, setPostData] = useState("");
  let [loading, setLoading] = useState(null);

  useEffect(() => {
    console.log("Using Effect...");
    setLoading(true);
    if (currentUser) {
      boardService
        .getMostPopular()
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
    <main>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center bg-dark-subtle rounded-pill mt-5">
          {loading && currentUser && <LoadingpageComponent />}
          <div className="py-3">
            {!currentUser && (
              <div className="m-5" style={{ height: "50vh" }}>
                <HomepageimgComponent />
              </div>
            )}
            {currentUser && (
              <div>
                {postData.length !== 0 && (
                  <div style={{ width: "70vw" }}>
                    <p className="fs-3 text-center text-light">熱門文章</p>
                    <EssaycardlistComponent postData={postData} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
