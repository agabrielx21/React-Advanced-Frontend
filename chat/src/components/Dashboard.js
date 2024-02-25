import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.png"
import { FaRegClock } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const timeSinceLogin = useSelector(state => state.reducer.timeSinceLogin);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      console.log("Failed to log out");
    }
  }

  return (
    <>
    <div className="flex flex-col items-center justify-between py-12 h-screen gap-3">
    <div className="text-xl text-royal-300 font-mono underline">
      User Dashboard
    </div>
      <div className="h-full bg-royal-100 w-1/3 rounded-lg shadow-lg p-8 font-mono text-royal-700 flex justify-center flex-col gap-4">
      <div className="flex justify-center items-center">
      {currentUser.photoURL ? <img
        className="h-9 w-9 rounded-full mr-2"
        src={currentUser.photoURL}
        alt="user avatar"
      /> : <img
      className="h-9 w-9 rounded-full mr-2"
      src={defaultAvatar}
      alt="user avatar"
    />}
        {currentUser.email}
      </div>
      <div className="flex justify-center items-center my-4">
        <FaRegClock className="h-6 w-6 mr-2 text-black" />
        {timeSinceLogin !== null && (
        <p>Time spent on our app: {timeSinceLogin} minutes</p>
      )}
      </div>
      <div className="flex justify-center items-center">
      <Link to="/chat" className="flex items-center gap-2 font-mono border-2 border-black rounded py-1 px-4 hover:border-white hover:bg-royal-500 hover:text-white hover:font-semibold">
      <IoChatbubbles />
        Go to Chat
      </Link>
      </div>
      </div>
      <button
              variant="link"
              className="font-mono border-2 border-black rounded py-1 px-4 hover:border-white hover:bg-royal-500 hover:text-white hover:font-semibold"
              onClick={handleLogout}
            >
              Log out
            </button>
      </div>
    </>
  );
}