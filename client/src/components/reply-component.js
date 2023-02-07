import React, { useEffect, useState, useRef } from "react";
import boardService from "../services/board.service";

function ReplyComponent() {
  let _id = sessionStorage.getItem("_id");
  let [reply, setReply] = useState("");
  let [view, setView] = useState("無");
  let [comment, setComment] = useState("");
  let commentInputRef = useRef();
  const commentColor = (view) => {
    let color;
    switch (view) {
      case "讚":
        color = "#36BF36";
        break;
      case "噓":
        color = "#E60000";
        break;
      default:
        color = "#A9A9A9";
        break;
    }
    return color;
  };
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
            setReply(data.data.reply);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    commentInputRef.value = "";
  };
  useEffect(() => {
    console.log("Using Effect...");
    boardService
      .getPostID(_id)
      .then((data) => {
        setReply(data.data.reply);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      {reply.length !== 0 && (
        <div className="border px-2 py-2 rounded">
          {reply.map((reply) => (
            <div key={reply._id}>
              <p>
                <span
                  style={{
                    color: commentColor(reply.view),
                  }}
                >
                  {reply.name}:
                </span>
                {reply.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="my-3">
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
              ref={commentInputRef}
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
    </div>
  );
}

export default ReplyComponent;
