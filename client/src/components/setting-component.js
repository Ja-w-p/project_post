import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthServe from "../services/auth.service";
import accountService from "../services/account.service";
import NotloginComponent from "./notlogin-component";

function SettingComponent(props) {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [flag, setFlag] = useState(0);
  let [newEmail, setNewEmail] = useState("");
  let [inputMsg, setInputMsg] = useState(""); //驗證使用者刪除帳號的訊息
  let [errMsg, setErrMsg] = useState("");

  const handleChangeNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const HandleChangeDeleteMsg = (e) => {
    setInputMsg(e.target.value);
  };
  const handleToEditEmail = () => {
    accountService
      .patchEmail(currentUser.user._id, newEmail)
      .then(() => {
        AuthServe.logout();
        window.alert("Email已更新，請重新登入");
        setCurrentUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setErrMsg(error.response.data);
      });
  };

  const handleToDeleteAccount = () => {
    if (inputMsg !== "我想刪除帳號") {
      window.alert("輸入錯誤");
      setFlag(0);
    } else {
      accountService
        .deleteAccount(currentUser.user._id)
        .then(() => {
          AuthServe.logout();
          window.alert("刪除成功。");
          setCurrentUser(null);
          navigate("/register");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <NotloginComponent currentUser={currentUser} />
      {currentUser && (
        <div
          className="container border rounded mt-3 text-light bg-light-subtle"
          style={{ height: "85vh" }}
        >
          <p className="fs-2 mt-2 text-center">個人資料</p>

          <div className="text-center">
            <div className="d-flex align-items-center justify-content-center">
              <table className="table" style={{ width: "50vw" }}>
                <thead>
                  <tr>
                    <th scope="col">姓</th>
                    <th scope="col">名</th>
                    <th scope="col">聯絡信箱</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currentUser.user.firstName}</td>
                    <td>{currentUser.user.lastName}</td>
                    <td>{currentUser.user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setFlag(1);
                    }}
                  >
                    更改信箱
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setFlag(2);
                    }}
                  >
                    刪除帳號
                  </button>
                </li>
              </ul>
            </div>

            {flag === 1 && (
              <div
                className="d-flex align-items-center justify-content-center flex-column"
                style={{ height: "30vh" }}
              >
                {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                <div
                  className="bg-warning-subtle border border-warning rounded py-4"
                  style={{ width: "20rem" }}
                >
                  <div className="text-center mt-3">
                    <label>新聯絡信箱：</label>
                    <input
                      type="text"
                      onChange={handleChangeNewEmail}
                      className="border border-warning-subtle"
                    />
                    <div className="mt-3">
                      <button
                        onClick={handleToEditEmail}
                        className="btn btn-warning"
                      >
                        確認
                      </button>
                      <button
                        onClick={() => {
                          setFlag(0);
                          setErrMsg(null);
                        }}
                        className="btn btn-outline-secondary ms-2"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {flag === 2 && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "40vh" }}
              >
                <div
                  className="bg-danger-subtle border border-danger rounded p-4"
                  style={{ width: "22rem" }}
                >
                  <div className="text-center mt-2">
                    <p className="fw-bold">
                      如果確定要刪除帳號，請輸入以下文字：
                    </p>
                    <p className="text-danger">我想刪除帳號</p>
                    <input
                      type="text"
                      onChange={HandleChangeDeleteMsg}
                      className="border border-danger-subtle"
                    />
                    <div className="mt-3">
                      <button
                        onClick={handleToDeleteAccount}
                        className="btn btn-outline-danger"
                      >
                        確認
                      </button>
                      <button
                        onClick={() => {
                          setFlag(0);
                        }}
                        className="btn btn-secondary ms-2"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingComponent;
