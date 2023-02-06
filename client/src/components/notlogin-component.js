import React from "react";
import { useNavigate } from "react-router-dom";

function NotloginComponent(props) {
  let { currentUser } = props;
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="container">
      {!currentUser && (
        <div className="m-5 p-5 text-center">
          <p className="fs-1 pb-3">＜請先登入＞</p>
          <button className="btn btn-outline-light" onClick={handleToLogin}>
            前往登入頁
          </button>
        </div>
      )}
    </div>
  );
}

export default NotloginComponent;
