import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;

  const handleLogout = () => {
    AuthService.logout();
    window.alert("成功登出！");
    setCurrentUser(null);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item me-5">
              <Link className="nav-link active fs-1 fw-bolder" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-house-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                </svg>
              </Link>
            </li>
            {currentUser && (
              <div className="pt-3">
                <li className="nav-item">
                  <Link className="nav-link fs-3 fw-bold" to="/game">
                    遊戲
                  </Link>
                </li>
              </div>
            )}
            {currentUser && (
              <div className="pt-3">
                <li className="nav-item">
                  <Link className="nav-link fs-3 fw-bold" to="/holo">
                    HOLOLIVE
                  </Link>
                </li>
              </div>
            )}

            {currentUser && (
              <div className="pt-3">
                <li className="nav-item">
                  <Link className="nav-link fs-3 fw-bold" to="/food">
                    美食
                  </Link>
                </li>
              </div>
            )}
          </ul>
          {currentUser && <div></div>}

          <ul className="navbar-nav">
            {!currentUser && (
              <div>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/register">
                    註冊
                  </Link>
                </li>
              </div>
            )}

            {!currentUser && (
              <div>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/login">
                    登入
                  </Link>
                </li>
              </div>
            )}

            {currentUser && (
              <div>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/profile">
                    個人紀錄
                  </Link>
                </li>
              </div>
            )}

            {currentUser && (
              <div>
                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link fs-5" to="/">
                    登出
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;
