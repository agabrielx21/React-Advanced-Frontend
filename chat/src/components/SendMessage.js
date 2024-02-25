import React, { useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();
 
  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = currentUser;
    await addDoc(collection(firestore, "messages"), {
      text: message,
      name: displayName,
      email: currentUser.email,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,  
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="relative fixed bottom-0 w-auto rounded-b bg-royal-100 flex items-center p-5"    >
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="h-10 px-4 rounded-l border-2 border-royal-700 flex-grow bg-white text-blue-900 text-base focus:outline-none placeholder:text-royal-500"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="w-auto h-10 px-4 rounded-r bg-royal-700 text-white font-semibold">Send</button>
    </form>
  );
};

export default SendMessage;