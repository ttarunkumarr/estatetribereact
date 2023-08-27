import React, { useEffect, useState } from "react";
import "./NavBar.css";
import logo from "../assets/logofinal.png";
import { Link } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { useHistory } from "react-router-dom";

function NavBar({ nope }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const history = useHistory();
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };
  const toggleLink = () => {
    history.push("./login");
  };
  const handleLogo=()=>{
    history.push("/");
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className="m-nav"
      onClick={() => {
        if (isSideNavOpen) {
          setIsSideNavOpen(false);
        }
      }}
    >
      <div className={`nav ${isScrolled ? "nav-bg" : ""}`}>
        <div className="logo">
          <img src={logo} onClick={ ()=>{
            handleLogo();
          }}alt="logo" />
        </div>
        <div className={`hambutton ${nope}`}>
          <div className="icons">
            <button onClick={toggleSideNav}>
              <i className="fa fa-bars"></i>
            </button>
            <button onClick={toggleLink}>
              <i className="fa fa-user-circle-o"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`side-wrap ${isSideNavOpen ? "side-nav-open" : ""}`}
      ></div>
      <div
        className={`side-nav-bar ${isSideNavOpen ? "side-nav-bar-open" : ""}`}
      >
        <div className={`${isSideNavOpen ? "vis" : "notvis"}`}>Menu</div>
        <div className={`${isSideNavOpen ? "vis" : "notvis"}`}>
          <Link to="/">
            <i className="material-icons">home</i>Home
          </Link>
        </div>
        <div className={`${isSideNavOpen ? "vis" : "notvis"}`}>
          {auth?.currentUser ? (
            <a href="#" className="logout-link" onClick={() => auth.signOut()}>
              <i className="material-icons">logout</i>
              Logout
            </a>
          ) : (
            <Link to="/login">
              <i className="material-icons">login</i>Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
