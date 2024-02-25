import React from "react";
import { useAuth } from "../contexts/AuthContext";
import moment from 'moment';
import defaultAvatar from "../assets/default-avatar.png"

function formatTimestamp(timestamp){
  return moment.unix(timestamp).format('DD MMM HH:mm');
}

const Message = ({ message }) => {
  const { currentUser} = useAuth();
  return (
    <div className={`bg-royal-700 border border-white message-container ${message.uid === currentUser.uid ? "right" : ""}`}>
      {message.avatar ? 
        <img
          className="h-9 w-9 rounded-full mr-2"
          src={message.avatar}
          alt="user avatar"
        /> 
        : 
        <img
          className="h-9 w-9 rounded-full mr-2"
          src={defaultAvatar}
          alt="User aAvatar"
        />
        }
      <div className="message-container__right">
      {message.uid === currentUser.uid ? 
      ( <p className="text-sm font-bold">You</p>) 
      : 
      (message.name ? ( <p className="text-sm font-bold text-white">{message.name}</p>) 
      : 
      (<p className="text-sm font-bold text-white">{message.email}</p>)
      )}
        <p className={message.uid === currentUser.uid ? "timestamp text-[10px]" : "text-white timestamp text-[10px]"}>{formatTimestamp(message.createdAt)}</p>
        <p className={message.uid === currentUser.uid ? "break-all" : "break-all text-white"}>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;