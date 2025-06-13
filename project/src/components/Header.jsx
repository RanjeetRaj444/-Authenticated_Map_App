import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">Route Planner</h1>
        </div>

        <div className="header-right">
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
