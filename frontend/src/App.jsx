import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaFire } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { MdPlaylistAdd } from "react-icons/md";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Gaming from "./components/Gaming";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoItemDetailsWrapper from "./components/VideoItemDetailsWrapper";
import SavedVideos from "./components/SavedVideos";
import NotFound from "./components/NotFound";
import SavedContext from "./context/SavedContext";
import "./App.css";

const initialCategoriesList = [
  { name: "Home", id: 1, categoryLogo: AiFillHome },
  { name: "Trending", id: 2, categoryLogo: FaFire },
  { name: "Gaming", id: 3, categoryLogo: SiYoutubegaming },
  { name: "Saved Videos", id: 4, categoryLogo: MdPlaylistAdd },
];

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [categoriesList] = useState(initialCategoriesList);
  const [activeCategoryId, setActiveCategoryId] = useState(
    initialCategoriesList[0].id,
  );
  const [showSideBar, setShowSideBar] = useState(false);

  const addSavedVideos = (video) => {
    setSavedList((prev) =>
      prev.some((savedVideo) => savedVideo.id === video.id)
        ? prev
        : [...prev, video],
    );
  };

  const removeSavedVideo = (id) => {
    setSavedList((prev) => prev.filter((video) => video.id !== id));
  };

  const changeCategory = (id) => setActiveCategoryId(id);

  const onToggleMode = () => setIsDarkMode((prev) => !prev);

  const onShowSideBar = () => setShowSideBar((prev) => !prev);

  return (
    <SavedContext.Provider
      value={{
        savedList,
        isDarkMode,
        addSavedVideos,
        onToggleMode,
        categoriesList,
        activeCategoryId,
        changeCategory,
        showSideBar,
        onShowSideBar,
        removeSavedVideo,
      }}
    >
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trending"
          element={
            <ProtectedRoute>
              <Trending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gaming"
          element={
            <ProtectedRoute>
              <Gaming />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/:id"
          element={
            <ProtectedRoute>
              <VideoItemDetailsWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-videos"
          element={
            <ProtectedRoute>
              <SavedVideos />
            </ProtectedRoute>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </SavedContext.Provider>
  );
};

export default App;
