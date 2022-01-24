import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./routes/home/HomePage";
import WelcomePage from "./routes/welcome/WelcomePage";
import AppwriteService from "./database/appwriteService";
import UserPage from "./routes/user/UserPage";

const appwriteService = new AppwriteService(
  "https://appwrite.maltelab.tk/v1",
  "react-test",
  "postsCollectionId",
  "usersCollectionId"
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<WelcomePage appwriteService={appwriteService} />}
        />
        <Route
          path="/home"
          element={<HomePage appwriteService={appwriteService} />}
        />
        <Route
          path="/user/:userId"
          element={<UserPage appwriteService={appwriteService} />}
        />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
