import React, { useState } from "react";
import { useNavigate } from "react-router";
import BoardService from "../services/board.service";
import NotloginComponent from "./notlogin-component";

function PostessayComponent(props) {
  const navigate = useNavigate();
  let { currentUser } = props;
  let [title, setTitle] = useState("");
  let [category, setCategory] = useState("");
  let [content, setContent] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleToSubmit = () => {
    BoardService.postEssay(title, category, content)
      .then(() => {
        window.alert("發表成功！");
        navigate("/" + category);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div>
      <NotloginComponent currentUser={currentUser} />
      {currentUser && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <div className="form-group text-center bg-dark-subtle p-3 border border-dark-subtle rounded">
            <div className="d-flex flex-row">
              <div className="form-floating col">
                <input
                  id="title"
                  type="text"
                  onChange={handleChangeTitle}
                  className="form-control"
                  name="title"
                  placeholder="title"
                />
                <label htmlFor="title">標題:</label>
              </div>

              <select
                name="category"
                id="category-select"
                onChange={handleChangeCategory}
                className="form-control col"
              >
                <option value="">--請選擇討論板--</option>
                <option value="game">遊戲</option>
                <option value="holo">Hololive</option>
                <option value="food">美食</option>
              </select>
            </div>

            <textarea
              id="content"
              rows={15}
              onChange={handleChangeContent}
              className="form-control"
              style={{ width: "90vw" }}
            ></textarea>
            <button
              className="btn btn-outline-light mt-3"
              onClick={handleToSubmit}
            >
              發表文章
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}

export default PostessayComponent;
