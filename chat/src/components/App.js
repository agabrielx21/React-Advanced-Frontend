import React from 'react';
import Signup from './Signup';
import Login from './Login';
import ChatRoom from './ChatRoom';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../tailwind.css';


function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
              <Route path="/chat" element={<PrivateRoute><ChatRoom/></PrivateRoute>}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
