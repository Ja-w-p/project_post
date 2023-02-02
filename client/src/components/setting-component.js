import React from "react";

function SettingComponent(props) {
  let { currentUser } = props;
  return (
    <div className="container">
      <div className="text-center">
        <p className="fs-2 mt-2">個人資料</p>
      </div>
      <div className="m-5">
        <div className="m-5">
          <p>
            姓名：{currentUser.user.firstName} {currentUser.user.lastName}
          </p>
          <p>聯絡信箱：{currentUser.user.email}</p>
        </div>
        <div className="text-end">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-outline-dark dropdown-toggle"
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
                <button className="dropdown-item">更改信箱</button>
              </li>
              <li>
                <button className="dropdown-item">刪除帳號</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingComponent;
