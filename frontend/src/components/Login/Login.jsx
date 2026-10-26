import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

   
async function loginData() {
  try {
    const data = await fetch(
      "http://localhost:1000/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const response = await data.json();

    console.log("Login status:", data.status);
    console.log("Login response:", response);

    if (data.ok && response.status) {
      navigate("/profile");
    } else {
      alert(response.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error.message);
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
                    Login
                </button>

                <div className="divider">
                    <span>OR</span>
                </div>

                <p className="signup-text">
                    Don't have an account?
                    <Link to="/signup"> Create an account</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;
