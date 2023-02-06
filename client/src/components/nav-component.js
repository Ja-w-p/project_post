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
          <Link className="nav-brand fs-1 logo me-3" to="/">
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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
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
              {!currentUser && (
                <div className="pt-4">
                  <li className="nav-item bar">
                    <Link className="nav-link fs-5" to="/register">
                      註冊
                    </Link>
                  </li>
                </div>
              )}

              {!currentUser && (
                <div className="pt-4">
                  <li className="nav-item bar">
                    <Link className="nav-link fs-5" to="/login">
                      登入
                    </Link>
                  </li>
                </div>
              )}

              {currentUser && (
                <div className="pt-4">
                  <li className="nav-item bar">
                    <Link className="nav-link fs-5" to="/profile">
                      個人紀錄
                    </Link>
                  </li>
                </div>
              )}

              {currentUser && (
                <div className="pt-4">
                  <li className="nav-item bar">
                    <Link
                      onClick={handleLogout}
                      className="nav-link fs-5"
                      to="/"
                    >
                      登出
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;
