import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
import { SocketContext } from "../../context/SocketContext.jsx";
import { NotificationContext } from "../../context/NotificationContext.jsx";

function Chat({ chats: chatsProp = [] }) {
  const [chats, setChats] = useState(chatsProp);
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { decreaseCount } = useContext(NotificationContext);
  const messageEndRef = useRef();

  useEffect(() => {
    setChats(chatsProp);
  }, [chatsProp]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("get", "chats/" + id);
      const isUnread = !chats.find(c => c.id === id)?.seenBy.includes(currentUser.id);
      
      // If we are reading an unread chat, decrease notification count
      if (isUnread) {
        decreaseCount();
      }

      setChats((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, seenBy: [...c.seenBy, currentUser.id] } : c
        )
      );
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    try {
      const res = await apiRequest("post", "messages/" + chat.id, { text });
      
      // Update our own chat screen
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));
      e.target.reset();

      // Update our own sidebar
      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id
            ? { ...c, lastMessage: text, seenBy: [...c.seenBy, currentUser.id] }
            : c
        )
      );

      // Emit socket event to the receiver in real-time
      socket?.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });

    } catch (err) {
      console.log(err);
    }
  };

  // Listen to incoming real-time socket messages
  useEffect(() => {
    if (!socket) return;

    const handleGetMessage = (data) => {
      const isCurrentChat = chat && chat.id === data.chatId;

      if (isCurrentChat) {
        // Append message to active chat bubble screen
        setChat((prev) => ({
          ...prev,
          messages: [...prev.messages, data],
        }));

        // Instantly mark as read
        decreaseCount();
        apiRequest.put("/chats/read/" + chat.id);
      }

      // Update thread in the sidebar
      setChats((prev) =>
        prev.map((c) =>
          c.id === data.chatId
            ? {
                ...c,
                lastMessage: data.text,
                seenBy: isCurrentChat ? [...c.seenBy, currentUser.id] : c.seenBy.filter(id => id !== currentUser.id),
              }
            : c
        )
      );
    };

    socket.on("getMessage", handleGetMessage);

    return () => {
      socket.off("getMessage", handleGetMessage);
    };
  }, [socket, chat, currentUser.id, decreaseCount]);

  function formatRelativeTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((c) => {
          const receiver = c.receiver;
          const isUnread = !c.seenBy.includes(currentUser.id);
          return (
            <div
              className="message"
              key={c.id}
              style={{
                backgroundColor: isUnread ? "#f7c14b18" : "white",
              }}
              onClick={() => handleOpenChat(c.id, receiver)}
            >
              <img
                src={receiver?.avatar || "/noavatar.jpg"}
                alt=""
              />
              <span>{receiver?.username}</span>
              <p style={{ fontWeight: isUnread ? "bold" : "normal" }}>
                {c.lastMessage}
              </p>
            </div>
          );
        })}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.avatar || "/noavatar.jpg"}
                alt=""
              />
              {chat.receiver?.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>X</span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className={`chatMessage ${message.userId === currentUser.id ? "own" : ""}`}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{formatRelativeTime(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;