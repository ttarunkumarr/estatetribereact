import React, { useEffect, useState } from "react";
import { auth } from "../Config/Firebase";
import Home from "./Home";
import Profile from "./Profile";
import AllProperties from "./AllProperties";
import PostProperty from "./PostProperty";
import AdminHome from "./AdminHome";
import { fetchUserRole } from "../functions/getRoles";
import { fetchProperties } from "../functions/getProperties";
import NavBar from "../Components/NavBar";
import "./Substyle.css";
import { fetchPropertiesNew } from "../functions/getSuperProperties";
function AdminPage() {
  const [buttonValue, setButtonValue] = useState("home");
  const [userRole, setUserRole] = useState("");
  const [properties, setProperties] = useState([]);
  const [Vis, setVis] = useState(false);
  useEffect(() => {
    // Fetch the user role and update the state
    fetchUserRole((role) => {
      setUserRole(role);
    });
  }, []);
  const handleButtonClick = (buttonName) => {
    setButtonValue(buttonName);
  };
  useEffect(() => {
    fetchPropertiesNew((role) => {
      if (
        role === "No Properties data found" ||
        role === "Error fetching Properties data"
      ) {
     
        console.log(
          "Error: No Properties data found or Error fetching Properties data"
        );
      } else if (Array.isArray(role)) {
        const roles = role.filter((item) => {
          return item.updatedBy === auth.currentUser.email;
        });
        setProperties(roles);
      }
    });
  }, []);

  return (
    <>
      <NavBar nope="no" />
      <div className="main-wrapper">
        <div className="Hambur">
          <button
            onClick={() => {
              setVis(!Vis);
            }}
          >
            <i className="material-icons">menu</i>
          </button>
        </div>
        <div className={`SideNav ${Vis ? "mobilenavvis" : "mobilenavhidden"}`}>
          <div className="button-container">
            <button
              onClick={() => {
                handleButtonClick("home");

                setVis(!Vis);
              }}
            >
              <i className="material-icons">home</i>Home
            </button>
          </div>
          <div className="button-container">
            <button
              onClick={() => {
                handleButtonClick("profile");
                setVis(!Vis);
              }}
            >
              <i className="material-icons">account_circle</i>
              Profile
            </button>
          </div>
          <div className="button-container">
            <button
              onClick={() => {
                handleButtonClick("allProperties");
                setVis(!Vis);
              }}
            >
              <i className="material-icons">house</i>
              All Properties
            </button>
          </div>
          <div className="button-container">
            <button
              onClick={() => {
                handleButtonClick("postProperty");
                setVis(!Vis);
              }}
            >
              <i className="material-icons">add_circle</i>
              Post Property
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => auth.signOut()}>
              <i className="material-icons">logout</i>Signout
            </button>
          </div>
        </div>
        <div className="SideNav des">
          <div className="button-container">
            <button onClick={() => handleButtonClick("home")}>
              <i className="material-icons">home</i>Home
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => handleButtonClick("profile")}>
              <i className="material-icons">account_circle</i>
              Profile
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => handleButtonClick("allProperties")}>
              <i className="material-icons">house</i>
              All Properties
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => handleButtonClick("postProperty")}>
              <i className="material-icons">add_circle</i>
              Post Property
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => auth.signOut()}>
              <i className="material-icons">logout</i>Signout
            </button>
          </div>
        </div>
        <div className="w-707">
          {buttonValue === "home" ? (
            <AdminHome propertiesData={properties} />
          ) : buttonValue === "profile" ? (
            <Profile role={userRole} />
          ) : buttonValue === "allProperties" ? (
            <AllProperties propertiesData={properties} />
          ) : buttonValue === "postProperty" ? (
            <PostProperty />
          ) : (
            <Home />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
