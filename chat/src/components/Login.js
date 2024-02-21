import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(){
   try {
    await login(email, password);
    navigate('/');
    console.log('Logged In.');
   } catch(error) {
      console.log(error.message);
   }
  };

  return (
    <div class="flex flex-col items-center justify-between py-12 h-screen gap-3">
      <div class="flex flex-col justify-center items-center h-full bg-royal-100 w-1/3 rounded-lg shadow-lg p-8 font-mono text-royal-700">
      <div class="flex flex-col w-full gap-4">
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="rounded px-2 focus:outline-none placeholder:text-black"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="rounded px-2 focus:outline-none placeholder:text-black"
      />
      </div>
      <button class="text-blue-700 mt-8 flex justify-center items-center" onClick={handleLogin}>Log in</button>
      </div>
      <div className="w-100 text-center mt-2 font-mono">
          Don't have an account?{' '}
          <Link to="/signup">
            <button
              variant="link"
              className="font-mono border-2 border-black rounded py-1 px-4 hover:border-white hover:bg-royal-500 hover:text-white hover:font-semibold"
            >
              Sign up
            </button>
          </Link>
        </div>
    </div>
  );
}

export default Login;