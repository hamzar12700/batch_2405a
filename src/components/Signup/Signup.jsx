import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function loginData() {
    try {
      let data = await fetch("http://localhost:1000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });

      console.log(data);

      let response = await data.json();
      console.log(response);

      if (response.status) {
        localStorage.setItem("token", response.token);
        navigate("/profile");
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="logo">A</div>
          <h1>Welcome Back</h1>
          <p>Login to your account to continue</p>
        </div>

        <div className="form-group">

          <label>Username</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
          />
        </div>
        <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      <button className="auth-button" onClick={loginData}>
        Signup
      </button>

      <div className="divider">
        <span>OR</span>
      </div>

      <p className="signup-text">
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>

    </div>
        </div >
    );
}

export default Login;
