import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { useHistory } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import NavBar from "../Components/NavBar";
import { auth, db } from "../Config/Firebase";
import { doc, setDoc } from "firebase/firestore";
import Modal from "../Components/Modal";
import { fetchUserRole } from "../functions/getRoles";

function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState("admin@estatetribe.com");
  const [password, setPassword] = useState("estateadmin");
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (auth?.currentUser) {
      fetchUserRole((role) => {
        if (role != "No role found") {
          setLoading(true);
          window.location.reload();
        }
      });
    }
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setErrorMessage("");
    try {
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setErrorMessage("Logged In");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          setErrorMessage(
            errorCode === "auth/wrong-password" ? "Wrong Password" : errorCode
          );
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/popup-closed-by-user") {
        setLoading(false);
        setErrorMessage("User cancelled the login");
        console.log("User cancelled the login");
      } else {
    
        setErrorMessage(errorMessage);
        console.error(errorMessage);
      }
    } finally {
      setLoading(false);
      history.push("/");
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const setCredentials = (userRole) => {
    switch (userRole) {
      case "admin":
        setUsername("admin@estatetribe.com");
        setPassword("estateadmin");
        break;
      case "superadmin":
        setUsername("superadmin@estatetribe.com");
        setPassword("estateadmin");
        break;
      case "user":
        setUsername("user@estatetribe.com");
        setPassword("userestate");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <NavBar nope="no" />
      {errorMessage && (
        <Modal message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
      <div className="main-login-form">
        {loading && (
          <div className="loading-overlay">
            <div className="loader"></div>
          </div>
        )}
        <div className="wrapper-login">
          <div className="login-form-cointainer">
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading} // Disable input fields while loading
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading} // Disable input fields while loading
            />
          </div>
          <div className="pairbuttons">
            <button
              className="login-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              className="reset-button"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </div>
          <div className="googleLogin">
            <button
              type="button"
              className="login-with-google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Sign in with Google
            </button>
          </div>
          <div className="removable">
            <button
              className="role-button"
              onClick={() => setCredentials("admin")}
            >
              Add Admin Cred
            </button>
            <button
              className="role-button"
              onClick={() => setCredentials("superadmin")}
            >
              Add SuperAdmin Cred
            </button>
            <button
              className="role-button"
              onClick={() => setCredentials("user")}
            >
              Add User Cred
            </button>
          </div>
          <span> *Dev mode Tools</span>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
