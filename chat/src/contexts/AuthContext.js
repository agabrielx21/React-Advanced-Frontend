import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import firebase from "firebase/compat/app";
import { useTimer } from '../redux/updateLoginState';

export const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  // useTimer();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function emailLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return auth.signInWithPopup(provider)
  }

  function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    emailLogin,
    githubLogin,
    googleLogin,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}