import React, { useState } from "react";
import boardService from "../services/board.service";

function ReplyformComponent(props) {
  let { _id } = props;
  let [view, setView] = useState("無");
  let [comment, setComment] = useState("");
  let commentInput = document.getElementById("comment");
  const handleChangeView = (e) => {
    setView(e.target.value);
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  const handleToSubmit = () => {
    if (comment.length === 0) {
      window.alert("請輸入留言。");
      return;
    }
    console.log("Submit中");
    boardService
      .postComment(view, comment, _id)
      .then(() => {
        boardService
          .getPostID(_id)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    commentInput.value = "";
  };
  return (
    <div>
      <div className="text-center">
        <form className="d-flex justify-content-center flex-row flex-wrap">
          <select
            name="view"
            id="view-select"
            onChange={handleChangeView}
            className="form-select"
            style={{ width: "6.5rem" }}
          >
            <option value="無">無意見</option>
            <option value="讚">認同</option>
            <option value="噓">反對</option>
          </select>
          <input
            id="comment"
            type="text"
            onChange={handleChangeComment}
            className="w-50 mx-1 form-control border-secondary"
          />

          <button onClick={handleToSubmit} className="btn btn-outline-light">
            送出
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReplyformComponent;
