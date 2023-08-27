import React, { useEffect, useState } from "react";
import { auth } from "../Config/Firebase";
import Home from "./Home";
import Profile from "./Profile";
import SuperAdminHome from "./SuperAdminHome";
import { fetchUserRole } from "../functions/getRoles";
import NavBar from "../Components/NavBar";
import "./Substyle.css";
function SuperAdminPage() {
  const [buttonValue, setbuttonValue] = useState("");
  const [userRole, setUserRole] = useState("");
  const [Vis, setVis] = useState(false)
  const handleHomeClick = () => {
    setbuttonValue("home");
  };
  useEffect(() => {
    // Fetch the user role and update the state
    fetchUserRole((role) => {
      setUserRole(role);
    });
  }, []);
  return (
    <>
      <NavBar nope="no" />
      <div className="main-wrapper">
        <div className="Hambur">
          <button onClick={()=>{
            setVis(!Vis);
          }}><i className="material-icons">menu</i></button>
        </div>
        <div className={`SideNav ${Vis?"mobilenavvis":"mobilenavhidden"}`} >
          <button
            onClick={() => {
              handleHomeClick();
              setVis(!Vis);
            }}
          >
            <i className="material-icons">home</i>
            Home
          </button>
          <button
            onClick={() => {
              setbuttonValue("profile");
              setVis(!Vis);
            }}
          >
            <i className="material-icons">account_circle</i>
            Profile
          </button>
          <button
            onClick={() => {
              auth.signOut();
              setVis(!Vis);
            }}
          >
            <i className="material-icons">logout</i>
            LogOut
          </button>
        </div>
        <div className="SideNav des">
          <button
            onClick={() => {
              handleHomeClick();
            }}
          >
            <i className="material-icons">home</i>
            Home
          </button>
          <button
            onClick={() => {
              setbuttonValue("profile");
            }}
          >
            <i className="material-icons">account_circle</i>
            Profile
          </button>
          <button
            onClick={() => {
              auth.signOut();
            }}
          >
            <i className="material-icons">logout</i>
            LogOut
          </button>
        </div>
        <div>
          {buttonValue === "home" ? (
            <SuperAdminHome />
          ) : buttonValue === "profile" ? (
            <Profile role={userRole} />
          ) : (
            <SuperAdminHome />
          )}
        </div>
      </div>
    </>
  );
}

export default SuperAdminPage;
