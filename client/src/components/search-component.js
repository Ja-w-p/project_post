import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchComponent(props) {
  let { boardName } = props;
  let [keyword, setKeyword] = useState("");
  let navigate = useNavigate();

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleToSubmit = () => {
    sessionStorage.setItem("boardName", boardName);
    sessionStorage.setItem("keyword", keyword);
    navigate("/searchessay");
  };
  return (
    <div>
      <form className="d-flex justify-content-center mx-5 pb-3">
        <input
          className="w-50 form-control mx-3 border-secondary"
          type="Search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleChangeKeyword}
        />
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={handleToSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          搜尋
        </button>
      </form>
    </div>
  );
}

export default SearchComponent;
