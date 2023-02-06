import React, { useState, useEffect } from "react";
import boardService from "../services/board.service";
import EssaycardlistComponent from "./essaycardlist-component";

const HomeComponent = (props) => {
  let { currentUser } = props;
  let [postData, setPostData] = useState("");

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
    // eslint-disable-next-line
  }, []);

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
            <div>
              <p className="fs-3 text-center">熱門文章</p>
              <EssaycardlistComponent postData={postData} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
