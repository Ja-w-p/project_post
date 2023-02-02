import axios from "axios";
const API_URL = "http://localhost:8080/api/board";

class BoardService {
  getPost(boardName) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/" + boardName, {
      headers: {
        Authorization: token,
      },
    });
  }
  getPostID(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/essay/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  postEssay(title, category, content) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/postessay",
      { title, category, content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getUserID(ID) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/profile/" + ID, {
      headers: {
        Authorization: token,
      },
    });
  }
  postComment(view, comment, _id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/essay/" + _id,
      { view, comment },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  patchEditEssay(title, content, _id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/essay/" + _id,
      { title, content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  deleteEssay(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/essay/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  getSeaech(boardName, keyword) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/search/" + boardName + "/" + keyword, {
      headers: {
        Authorization: token,
      },
    });
  }
  getMostPopular() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/mostpopular", {
      headers: {
        Authorization: token,
      },
    });
  }
  deleteAccount(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/account/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new BoardService();
