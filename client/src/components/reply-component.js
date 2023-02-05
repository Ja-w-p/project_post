import React, { useEffect, useState } from "react";
import boardService from "../services/board.service";
import ReplyformComponent from "./replyform-component";

function ReplyComponent() {
  let _id = sessionStorage.getItem("_id");
  let [reply, setReply] = useState("");
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
      <div className="">
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
      </div>

      <div className="mt-3">
        <ReplyformComponent _id={_id} />
      </div>
    </div>
  );
}

export default ReplyComponent;
