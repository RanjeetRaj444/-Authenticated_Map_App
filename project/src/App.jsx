import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Loading from "./components/Loading";
import MapView from "./pages/MapView";
import "./App.css";

const AuthenticatedApp = () => {
  return (
    <div className="app">
      <Header />
      <MapView />
    </div>
  );
};

const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Login switchToSignUp={() => setIsLogin(false)} />
      ) : (
        <SignUp switchToLogin={() => setIsLogin(true)} />
      )}
    </>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
