import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { SocketContext } from "./SocketContext";
import apiRequest from "../lib/apiRequest";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchNotificationCount = async () => {
    try {
      const res = await apiRequest("/user/notification");
      setNotificationCount(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchNotificationCount();
    } else {
      setNotificationCount(0);
    }
  }, [currentUser]);

  const decreaseCount = () => {
    setNotificationCount((prev) => Math.max(0, prev - 1));
  };

  const increaseCount = () => {
    setNotificationCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!socket) return;

    const handleGetMessage = () => {
      // Whenever a socket message is received, increase count in real-time
      increaseCount();
    };

    socket.on("getMessage", handleGetMessage);

    return () => {
      socket.off("getMessage", handleGetMessage);
    };
  }, [socket]);

  return (
    <NotificationContext.Provider
      value={{
        notificationCount,
        setNotificationCount,
        decreaseCount,
        increaseCount,
        fetchNotificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
