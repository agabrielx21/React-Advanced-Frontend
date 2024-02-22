import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { emailLogin, githubLogin, googleLogin } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(){
   try {
    await emailLogin(email, password);
    navigate('/');
    console.log('Logged In.');
   } catch(error) {
      console.log(error.message);
   }
  };

  async function handleGithubLogin(){
    console.log('Github Login');
    try {
     await githubLogin();
     navigate('/');
     console.log('Logged In.');
    } catch(error) {
       console.log(error.message);
    }
   };

   
  async function handleGoogleLogin(){
    console.log('Google Login');
    try {
     await googleLogin();
     navigate('/');
     console.log('Logged In.');
    } catch(error) {
       console.log(error.message);
    }
   };

  return (
    <div className="flex flex-col items-center justify-between py-12 h-screen gap-3">
      <div className="flex flex-col justify-center items-center h-full bg-royal-100 w-[80%] md:w-1/3 rounded-lg shadow-lg p-8 font-mono text-royal-700">
      <div className="flex flex-col w-full gap-4">
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

      <button onClick={handleGithubLogin}
      type="button" className="mt-8 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
<svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
</svg>
Sign in with Github
</button>
<button onClick={handleGoogleLogin} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
<svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
<path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
</svg>
Sign in with Google
</button>
<button className="text-blue-700 mt-8 flex justify-center items-center" onClick={handleLogin}>Log in</button>

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