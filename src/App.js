import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Screens/Home";
import LoginPage from "./Screens/LoginPage";
import AdminPage from "./Screens/AdminPage";
import UserPage from "./Screens/UserPage";
import SuperAdminPage from "./Screens/SuperAdminPage"; 
import { auth, db } from "./Config/Firebase";
import { fetchUserRole } from "./functions/getRoles";
import PropertiesDisplay from "./Screens/PropertiesDisplay";
import PeopertyDetails from "./Screens/PeopertyDetails";
import ExplorePropertiesDisplay from "./Screens/ExplorePropertiesDisplay";
import { doc, setDoc } from "firebase/firestore";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setRole(null);
      setUser(currentUser);
      if (currentUser) {
        await fetchUserRole(async(role) => {
          setRole(role);
          if(role==="No role found")
          {
            const customerData = {
              Delete: false,
              Edit: true,
              Email: currentUser.email,
              Name: currentUser.displayName,
              PhoneNumber: "",
              Role:"User",
              uid:auth.currentUser.uid
            };
            await setDoc(doc(db, "Customers", currentUser.uid), customerData);
            await setDoc(doc(db, "UserRoles", currentUser.email), { role: "User" })
          }
        });
      
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  if (isLoading) {
    return   <div className="loading-overlay">
    <div className="loader"></div>
  </div>;
  }

  return (
    <>
      <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/properties" component={PropertiesDisplay} />
          <Route exact path="/property" component={PeopertyDetails} />
          <Route exact path="/explore" component={ExplorePropertiesDisplay} />

          <Route exact path="/login">
            {user && role === "Admin" ? (
              <Redirect to="/admin" />
            ) : user && role === "Superadmin" ? (
              <Redirect to="/superadmin" />
            ) : user && role === "User" ? (
              <Redirect to="/user" />
            ) : (
              <Home />
            )}
          </Route>
          <Route exact path="/admin">
            {user && role === "Admin" ? (
              <AdminPage />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/user">
            {user && role === "User" ? <UserPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/superadmin">
            {user && role === "Superadmin" ? (
              <SuperAdminPage />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="*">
    <Redirect to="/" />
  </Route>
        </Switch>
        </ScrollToTop>
      </Router>
      <a href=" https://wa.me/917075459096" target="_blank">
  <div className="button-float">
    <i className="fa fa-whatsapp"></i>
  </div>
</a>

    </>
  );
}

export default App;
