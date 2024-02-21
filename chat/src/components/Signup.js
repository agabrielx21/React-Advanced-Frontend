import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-between py-12 h-screen gap-3">
      <div className="flex flex-col justify-center items-center h-full bg-royal-100 w-1/3 rounded-lg shadow-lg p-8 font-mono text-royal-700">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <input
            type="email"
            ref={emailRef}
            required
            placeholder="Email"
            className="rounded px-2 focus:outline-none placeholder:text-black"
          />
          <input
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
            className="rounded px-2 focus:outline-none placeholder:text-black"
          />
          <input
            type="password"
            ref={passwordConfirmRef}
            required
            placeholder="Confirm Password"
            className="rounded px-2 focus:outline-none placeholder:text-black"
          />
          <button
            disabled={loading}
            className="text-blue-700 mt-8 flex justify-center items-center"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="w-100 text-center mt-2 font-mono">
          Already have an account?{' '}
          <Link to="/login">
            <button
              variant="link"
              className="font-mono border-2 border-black rounded py-1 px-4 hover:border-white hover:bg-royal-500 hover:text-white hover:font-semibold"
            >
              Log In
            </button>
          </Link>
        </div>
    </div>
  );
}
