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
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item me-5">
                <Link
                  className="nav-link active fs-1 fw-bolder border border-5 border-light rounded-pill bg-light"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {currentUser && (
                <div className="pt-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link fs-3 link-dark fw-bold"
                      to="/game"
                    >
                      遊戲
                    </Link>
                  </li>
                </div>
              )}
              {currentUser && (
                <div className="pt-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link fs-3 link-dark fw-bold"
                      to="/holo"
                    >
                      HOLOLIVE
                    </Link>
                  </li>
                </div>
              )}

              {currentUser && (
                <div className="pt-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link fs-3 link-dark fw-bold"
                      to="/food"
                    >
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

              {currentUser && (
                <div>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/profile">
                      個人紀錄
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
