import axios from "axios";
import "./login.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const{updateUser} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const { email, password } = data;

    if (!email || !password) {
      setError("All fields are required");
      toast.error("All fields are required");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiRequest("post", "auth/login", data);

      console.log(res.data);

      if (res.status === 200) {
        toast.success("Welcome back! Logged in successfully.");
        updateUser(res.data.user);
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      }
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "Login failed";
      setError(errMsg);
      toast.error(errMsg);
      setTimeout(() => setError(""), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>

          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          {error && <p className="error">{error}</p>}

          <button disabled={isLoading || !!error}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <Link to="/register">Don’t you have an account?</Link>
        </form>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;