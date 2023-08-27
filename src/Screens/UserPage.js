import React, { useEffect, useState } from "react";
import { auth } from "../Config/Firebase";
import Profile from "./Profile";
import UserHome from "./UserHome";
import SavedProperties from "./SavedProperties";
import { Link, useHistory } from "react-router-dom";
import { fetchUserRole } from "../functions/getRoles";
import NavBar from "../Components/NavBar";
function UserPage() {
  const [buttonValue, setButtonValue] = useState("");
  const [userRole, setUserRole] = useState("");
  const [Vis, setVis] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // Fetch the user role and update the state
    fetchUserRole((role) => {
      setUserRole(role);
    });
  }, []);
  const handleButtonClick = (buttonName) => {
    if (buttonName === "") {
      history.push("/");
    }
    setButtonValue(buttonName);
  };
  return (
    <div>
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
          <button
            onClick={() => {
              handleButtonClick("");
              setVis(!Vis);
            }}
          >
            <i className="material-icons">home</i>Home
          </button>
          <button
            onClick={() => {
              handleButtonClick("profile");
              setVis(!Vis);
            }}
          >
            <i className="material-icons">account_circle</i>Profile
          </button>
          <button onClick={() => {handleButtonClick("intrestedProperties") 
          setVis(!Vis);}}>
            <i className="material-icons">add_shopping_cart</i>Saved Properties
          </button>
          <button onClick={() => auth.signOut()}>
            <i className="material-icons">logout</i>Signout
          </button>
        </div>
        <div className="SideNav des">
          <button onClick={() => handleButtonClick("")}>
            <i className="material-icons">home</i>Home
          </button>
          <button onClick={() => handleButtonClick("profile")}>
            <i className="material-icons">account_circle</i>Profile
          </button>
          <button onClick={() => handleButtonClick("intrestedProperties")}>
            <i className="material-icons">add_shopping_cart</i>Saved Properties
          </button>
          <button onClick={() => auth.signOut()}>
            <i className="material-icons">logout</i>Signout
          </button>
        </div>
        {buttonValue === "" ? (
          <Profile role={userRole} />
        ) : buttonValue === "profile" ? (
          <Profile role={userRole} />
        ) : buttonValue === "intrestedProperties" ? (
          <SavedProperties />
        ) : (
          <UserHome />
        )}
      </div>
    </div>
  );
}

export default UserPage;
