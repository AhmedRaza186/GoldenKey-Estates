import { useContext, useState } from "react";
import "./updateProfile.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import toast from "react-hot-toast";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.put("/user", {
        username,
        email,
        ...(password && { password }),
        avatar: avatar[0] || currentUser?.avatar,
      });
      
      // Update local storage context
      updateUser(res.data.data);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "Failed to update profile!";
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input 
              id="username" 
              name="username" 
              type="text" 
              defaultValue={currentUser?.username} 
              required
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              defaultValue={currentUser?.email} 
              required
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Leave blank to keep current" 
            />
          </div>
          <button className="updateBtn">Update Profile</button>
          {error && <span className="error" style={{ color: "red", marginTop: "10px" }}>{error}</span>}
        </form>
      </div>
      
      <div className="sideContainer">
        <div className="avatarWrapper">
          <img src={avatar[0] || currentUser?.avatar || "/noavatar.jpg"} alt="User Avatar" className="avatar" />
          <UploadWidget
            uwConfig={{
              cloudName: "dddcijrz6",
              uploadPreset: "GoldenKey",
              multiple: false,
              maxImageFileSize: 2000000,
              folder: "avatars",
            }}
            setState={setAvatar}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;