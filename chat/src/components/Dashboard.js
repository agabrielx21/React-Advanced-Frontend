// Dashboard.js
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import '../tailwind.css';

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      localStorage.clear();
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
    <div class="flex flex-col items-center justify-between py-12 h-screen gap-3">
    <div class="text-xl text-royal-300 font-mono underline">
      Hello ! Welcome back.
    </div>
      <div class="h-full bg-royal-100 w-1/3 rounded-lg shadow-lg p-8 font-mono text-royal-700">
        Email: {currentUser.email}
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