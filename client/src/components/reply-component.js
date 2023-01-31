import React, { useEffect, useState } from "react";
import boardService from "../services/board.service";

function ReplyComponent(props) {
  let { currentUser } = props;
  let _id = sessionStorage.getItem("_id");
  let [reply, setReply] = useState("");
  let [view, setView] = useState("無");
  let [comment, setComment] = useState("");
  let commentInput = document.getElementById("comment");
  const commentColor = (view) => {
    let color;
    switch (view) {
      case "讚":
        color = "green";
        break;
      case "噓":
        color = "red";
        break;
      default:
        color = "gray";
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
    commentInput.value = "";
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
      <div className="mt-3 mx-5 px-5">
        {reply.length !== 0 && (
          <div className="border  px-4 py-2 mb-3">
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
      </div>

      <div className="mt-3 mx-5 px-5">
        {currentUser && (
          <div className="text-center">
            <form className="d-flex justify-content-center flex-row">
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
                className="w-50 mx-2 form-control"
              />

              <button onClick={handleToSubmit} className="btn btn-outline-dark">
                送出
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReplyComponent;
