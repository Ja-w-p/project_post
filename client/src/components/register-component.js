import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [id, setId] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeFirstName = (e) => {
    setFirstname(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastname(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeID = (e) => {
    setId(e.target.value);
  };

  const handleRegister = () => {
    console.log(firstname);
    AuthService.register(firstname, lastname, email, password, id)
      .then(() => {
        window.alert("註冊成功！");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="container">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="text-center p-5 bg-light border rounded">
          <div className="form-floating accountInput">
            <input
              onChange={handleChangeFirstName}
              className="form-control"
              type="text"
              name="firstname"
              placeholder="firstname"
            />
            <label htmlFor="firstname">名字：</label>
          </div>
          <br />
          <div className="form-floating accountInput">
            <input
              onChange={handleChangeLastName}
              className="form-control"
              type="text"
              name="lastname"
              placeholder="lastname"
            />
            <label htmlFor="lastname">姓氏：</label>
          </div>
          <br />
          <div className="form-floating accountInput">
            <input
              onChange={handleChangeEmail}
              className="form-control"
              type="text"
              name="email"
              placeholder="email"
            />
            <label htmlFor="email">Email：</label>
          </div>
          <br />
          <div className="form-floating accountInput">
            <input
              onChange={handleChangePassword}
              className="form-control"
              type="password"
              name="password"
              placeholder="password"
            />
            <label htmlFor="password">密碼：</label>
          </div>
          <br />
          <div className="form-floating accountInput">
            <input
              onChange={handleChangeID}
              className="form-control"
              type="text"
              name="ID"
              placeholder="id"
            />
            <label htmlFor="ID">ID：</label>
          </div>
          <br />
          <div>
            <button
              type="button"
              onClick={handleRegister}
              className="btn btn-outline-dark"
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
