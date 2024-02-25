import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLoginTime } from './action'; 
import { useAuth } from "../contexts/AuthContext";

export function useTimer() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    let timerId = null;

    const startTimer = () => {
      clearInterval(timerId);
      timerId = setInterval(() => {
        dispatch(updateLoginTime());  
      }, 60000); 
    };

    const stopTimer = () => {
      clearInterval(timerId);
    };

    if (currentUser) {
      startTimer(); 
    } else {
      stopTimer(); 
    }

    return () => {
      stopTimer(); 
    };
  }, [currentUser, dispatch]); 

}