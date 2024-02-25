import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { firestore } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import Card from "./Card";
import { HiMiniArrowLongUp } from "react-icons/hi2";
import { HiMiniArrowLongDown } from "react-icons/hi2";
import { IoReturnDownBack } from "react-icons/io5";
import { Link } from "react-router-dom"

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const scrollToTop = () => {
    if (messagesRef.current) {
      const scrollHeight = messagesRef.current.scrollHeight;
      const scrollStep = -scrollHeight / 100;
      let scrollInterval = setInterval(() => {
        if (messagesRef.current.scrollTop === 0) {
          clearInterval(scrollInterval);
        } else {
          messagesRef.current.scrollTop += scrollStep;
        }
      }, 10);
    }
  };

  const scrollBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const q = query(
      collection(firestore, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    
    return () => unsubscribe;
  }, []);

  const [scrollToBottom, setScrollToBottom] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (scrollToBottom && messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      setScrollToBottom(false);
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    setScrollToBottom(true);
  }, [messages]);

  return (
    
    <main>
      <div className="mx-auto mt-8 w-[80%] rounded-lg shadow-lg p-8 font-mono">
      <div className="overflow-auto max-h-[400px] mb-6 no-scrollbar" ref={messagesRef}>
      <div className="flex justify-center items-center">
        <button className="flex items-center justify-center" onClick={scrollBottom}>
        <HiMiniArrowLongDown className="mr-2"/>
          See Latest Messages</button>
        </div>
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div className="flex justify-center items-center">
        <button className="flex items-center justify-center" onClick={scrollToTop}>
          <HiMiniArrowLongUp className="mr-2"/>
          Scroll to Top</button>
        </div>
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
      </div>
      <Link to="/">
      <div className="flex justify-center items-center mt-5 font-mono">
        <IoReturnDownBack className="mr-2"/>
        Back to Dashboard</div>
      </Link>
      
    </main>
    
  );
};

export default ChatRoom;