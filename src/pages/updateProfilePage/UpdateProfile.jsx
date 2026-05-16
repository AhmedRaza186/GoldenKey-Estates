import { useState } from "react";
import "./updateProfile.scss";

function ProfileUpdatePage() {
  // Mock initial state - usually fetched from context or API
  const [avatar, setAvatar] = useState("/noavatar.jpg");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" placeholder="johndoe" />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="john@gmail.com" />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Leave blank to keep current" />
          </div>
          <button className="updateBtn">Update Profile</button>
        </form>
      </div>
      
      <div className="sideContainer">
        <div className="avatarWrapper">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <label htmlFor="file" className="uploadLabel">
            Change Photo
          </label>
          <input 
            type="file" 
            id="file" 
            hidden 
            onChange={handleAvatarChange} 
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;