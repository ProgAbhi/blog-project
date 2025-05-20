import { useState } from "react";
import API from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <button
        type="button"
        className="back-home-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
