import { useState } from "react";
import API from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    window.location.href = "/";
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Back to Home button */}
      <button
        type="button"
        className="back-home-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
