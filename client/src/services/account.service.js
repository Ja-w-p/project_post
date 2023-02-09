import axios from "axios";
const API_URL = "http://localhost:8080/api/account";

class AccountSerivice {
  deleteAccount(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  patchEmail(_id, email) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/email/" + _id,
      { email },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new AccountSerivice();
