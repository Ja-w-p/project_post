import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let { setCurrentUser } = props;

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("time", JSON.stringify(Date.now())); //用來驗證token失效時間
        }
        window.alert("登入成功！");
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/");
      })
      .catch((error) => {
        console.log("error" + error.response);
        setMessage(error.response.data);
      });
  };
  return (
    <div className="container">
      <div className="mt-5 mx-5 p-5 bg-light">
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="text-center px-5 mx-5">
          <div className="form-floating">
            <input
              onChange={handleChangeEmail}
              type="email"
              className="form-control"
              id="email"
              placeholder="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <br />
          <div className="form-floating">
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control"
              id="password"
              placeholder="密碼"
            />
            <label htmlFor="password">密碼</label>
          </div>
          <br />
          <div className="">
            <button onClick={handleLogin} className="btn btn-outline-dark">
              登入
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
