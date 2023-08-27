import React, { useEffect, useState } from "react";
import { fetchProperties } from "../functions/getProperties";
import Properties from "./Properties";
import AllProperties from "./AllProperties";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";

function AdminHome({ propertiesData }) {
  const [activePanel, setActivePanel] = useState(null);

  const propertiesCount = propertiesData.length || 0;

  return (
    <>
 
      <div className="panel-wrapper">
        <div>
          {activePanel === "Properties" ? (
            <AllProperties propertiesData={propertiesData} />
          ) : (
            <div className="panel-wrap">
              <div
                className="panel"
                onClick={() => setActivePanel("Properties")}
              >
                <i className="material-icons">home</i>
                <h3>Properties</h3>
                <p> {propertiesCount}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminHome;
