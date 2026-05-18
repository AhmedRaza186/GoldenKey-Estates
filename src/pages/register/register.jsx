import axios from "axios";
import "./register.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { username, email, password } = data;

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiRequest("post", "auth/register", data);
      if (res.status === 201) {
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "Registration failed";
      setError(errMsg);
      toast.error(errMsg);
      setTimeout(() => setError(""), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          {error && <p className="error">{error}</p>}
          <button disabled={isLoading || !!error}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Register;
