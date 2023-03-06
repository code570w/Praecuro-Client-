import React, { useEffect, useRef, useState } from "react";
import "./Main.sass";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./components/Messages";

const Chat = () => {
  const messagesEnd = useRef(null);
  const chat = useRef(null);

  const dispatch = useDispatch();

  const roomID = useSelector((state) => state.room._id);
  const firstMessageID = useSelector((state) => state.room.firstMessageID);
  const lastMessageID = useSelector((state) => state.room.lastMessageID);
  const messagesNumber = useSelector((state) => state.room.messages.length);

  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    window.socket.on("message-in", (data) => {
      console.log("message-in", data);
      // dispatch({ type: 'ADD_MESSAGE', message: data.message });
      window.socket.emit("join-room", { roomID: data.room._id });
      window.socket.on("join-room", (data) => {
        console.log("hi", data);
        dispatch({ type: "JOIN_ROOM_RESULT", data });
      });
      dispatch({ type: "SOUNDS_MESSAGE" });
      // window.socket.emit('list-rooms', {});
    });
    window.socket.on("message-out", (data) => {
      console.log("message-out", data);
      // window.socket.emit('list-rooms', {});
    });

    if (chat.current.scrollTop === 0)
      chat.current.scrollTop = chat.current.scrollHeight - scrollHeight;
  }, [messagesNumber]);

  useEffect(() => {
    messagesEnd.current.scrollIntoView();
  }, [lastMessageID]);

  const onScroll = () => {
    setScrollHeight(chat.current.scrollHeight);
    if (chat.current.scrollTop === 0)
      dispatch({ type: "MORE_MESSAGES", roomID, messageID: firstMessageID });
  };

  return (
    <div className="chat" ref={chat} onScroll={onScroll}>
      <Messages />
      <div style={{ float: "left", clear: "both" }} ref={messagesEnd} />
    </div>
  );
};

export default Chat;
