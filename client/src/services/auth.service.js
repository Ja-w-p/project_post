import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(firstName, lastName, email, password, ID) {
    return axios.post(API_URL + "/register", {
      firstName,
      lastName,
      email,
      password,
      ID,
    });
  }
  getCurrentUser() {
    let nowTime = Date.now();
    let loginTime = JSON.parse(localStorage.getItem("time"));
    let twentyfourhours = 86400000; //ms

    if (nowTime - loginTime > twentyfourhours) {
      localStorage.removeItem("user");
      localStorage.removeItem("time");
    }
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
