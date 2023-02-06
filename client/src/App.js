import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavComponent from "./components/nav-component";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import BoardComponent from "./components/board-component";
import PostessayComponent from "./components/postessay-component";
import EssayComponent from "./components/essay-component";
import SearchEssayComponent from "./components/searchessay-component";
import SettingComponent from "./components/setting-component";
import AuthService from "./services/auth.service";
import "./styles/App.css";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div className="App">
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomeComponent currentUser={currentUser} />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/login"
          element={<LoginComponent setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/profile"
          element={<ProfileComponent currentUser={currentUser} />}
        />
        <Route
          path="/game"
          element={
            <BoardComponent currentUser={currentUser} boardName={"game"} />
          }
        />
        <Route
          path="/holo"
          element={
            <BoardComponent currentUser={currentUser} boardName={"holo"} />
          }
        />
        <Route
          path="/food"
          element={
            <BoardComponent currentUser={currentUser} boardName={"food"} />
          }
        />
        <Route
          path="/postessay"
          element={<PostessayComponent currentUser={currentUser} />}
        />
        <Route
          path="/essay"
          element={<EssayComponent currentUser={currentUser} />}
        />
        <Route
          path="/searchessay"
          element={<SearchEssayComponent currentUser={currentUser} />}
        />
        <Route
          path="setting"
          element={
            <SettingComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
