import { useState } from "react";
import { Link } from "react-router-dom";
import Chat from "../../components/chat/Chat.jsx";
import List from "../../components/list/List.jsx";
import "./profilePage.scss";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>
          </div>

          <div className="mobileTabs">
            <button
              className={activeTab === "details" ? "active" : ""}
              onClick={() => setActiveTab("details")}
            >
              My Lists
            </button>
            <button
              className={activeTab === "chat" ? "active" : ""}
              onClick={() => setActiveTab("chat")}
            >
              Messages
            </button>
          </div>

          <div className={activeTab === "details" ? "active" : "hiddenMobile"}>
            <div className="title">
              <h1>My List</h1>
              <Link to="/add">
                <button>Create New Post</button>
              </Link>
            </div>
            <List />
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List />
          </div>
        </div>
      </div>
      <div className={`chatContainer ${activeTab === "chat" ? "active" : "hiddenMobile"}`}>
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;