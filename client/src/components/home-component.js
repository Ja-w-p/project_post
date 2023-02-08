import React, { useState, useEffect } from "react";
import boardService from "../services/board.service";
import EssaycardlistComponent from "./essaycardlist-component";
import LoadingpageComponent from "./loadingpage-component";

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
        {loading && currentUser && <LoadingpageComponent />}
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
          {currentUser && (
            <div>
              {postData.length !== 0 && (
                <div>
                  <p className="fs-3 text-center text-light">熱門文章</p>
                  <EssaycardlistComponent postData={postData} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
