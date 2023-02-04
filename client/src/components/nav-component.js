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
            <li className="nav-item me-5 logo">
              <Link className="nav-link active fs-1 fw-bolder" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-house-door-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                </svg>
              </Link>
            </li>
            {currentUser && (
              <div className="pt-3">
                <li className="nav-item bar">
                  <Link className="nav-link fs-3 fw-bold" to="/game">
                    遊戲
                  </Link>
                </li>
              </div>
            )}
            {currentUser && (
              <div className="pt-3">
                <li className="nav-item bar">
                  <Link className="nav-link fs-3 fw-bold" to="/holo">
                    HOLOLIVE
                  </Link>
                </li>
              </div>
            )}

            {currentUser && (
              <div className="pt-3">
                <li className="nav-item bar">
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
                <li className="nav-item bar">
                  <Link className="nav-link fs-5" to="/register">
                    註冊
                  </Link>
                </li>
              </div>
            )}

            {!currentUser && (
              <div>
                <li className="nav-item bar">
                  <Link className="nav-link fs-5" to="/login">
                    登入
                  </Link>
                </li>
              </div>
            )}

            {currentUser && (
              <div>
                <li className="nav-item bar">
                  <Link className="nav-link fs-5" to="/profile">
                    個人紀錄
                  </Link>
                </li>
              </div>
            )}

            {currentUser && (
              <div>
                <li className="nav-item bar">
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
