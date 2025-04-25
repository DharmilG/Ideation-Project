import { useState } from "react";
import "./authentication.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const clientID = "830413595565-kkggd9netjt948fb4hsf11tbim7vcdn2.apps.googleusercontent.com";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const toggleAuth = () => setIsLogin(!isLogin);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPasswordError("");
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be 8-16 characters, contain at least 1 uppercase, 1 lowercase, 1 special character, and 1 digit."
      );
      return;
    }

    alert(`${isLogin ? "Logging in" : "Registering"} with ${email}`);
    navigate("/dashboard"); // Redirect to dashboard
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google login success:", response);
    alert("Google login successful!");
    navigate("/dashboard");
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    alert("Google login failed. Please try again.");
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className="auth-page-container">
        <div className="auth-page-form-container">
          <h1 className="auth-page-title">{isLogin ? "Login" : "Register"}</h1>
          <p className="auth-page-description">
            {isLogin
              ? "Welcome back! Please login to continue."
              : "Create an account to get started."}
          </p>

          <form className="auth-page-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-page-form-group">
                <label className="auth-page-label">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="auth-page-input"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div className="auth-page-form-group">
              <label className="auth-page-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-page-input"
                placeholder="your.email@example.com"
                required
              />
              {emailError && <p className="auth-page-error">{emailError}</p>}
            </div>
            <div className="auth-page-form-group">
              <label className="auth-page-label">Password</label>
              <div className="auth-page-password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-page-input auth-page-password-field"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-page-password-toggle"
                  onClick={togglePassword}
                >
                  👁️
                </button>
              </div>
              {passwordError && (
                <p className="auth-page-error">{passwordError}</p>
              )}
            </div>
            <button type="submit" className="auth-page-submit-button">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="auth-page-google-login">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
          </div>

          <p className="auth-page-toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleAuth} className="auth-page-toggle-link">
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
