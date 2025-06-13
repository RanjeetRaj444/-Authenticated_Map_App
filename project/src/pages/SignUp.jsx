import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

const SignUp = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for verification link!");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Get Started</h2>
          <p>Create your account to start planning routes</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          {message && <div className="success-message">{message}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
              minLength="6"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button onClick={switchToLogin} className="link-button">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
