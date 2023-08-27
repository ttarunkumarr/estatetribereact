import React, { useEffect, useState } from "react";
import { fetchCustomers } from "../functions/getCustomerdata";
import { fetchProperties } from "../functions/getProperties";
import Customer from "./Customer";
import Admins from "./Admins";
import SuperAdminDetails from "./SuperAdmindetails";
import Properties from "./Properties";
import { fetchPropertiesNew } from "../functions/getSuperProperties";
import { fetchLikesForProperty } from "../functions/getAllLikes";
import IntrestedProperties from "./IntrestedProperties";

function SuperAdminHome() {
  const [customerData, setCustomerData] = useState(null);
  const [propertiesData, setPropertiesData] = useState(null);
  const [likesData, setLikesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    const handleFetchData = (data) => {
      setCustomerData(data);
  
    };
    const handlePropertiesData = (data) => {
      setPropertiesData(data);
    };

    fetchCustomers(handleFetchData)
      .then(() => fetchPropertiesNew(handlePropertiesData))
      .finally(() => setIsLoading(false));

    fetchLikesForProperty().then((likes) => {
      setLikesData(likes); 
    });
  }, []);

  const calculateCounts = (data, role) => {
    if (!data) return 0;
    return data.reduce((count, customer) => {
      return customer.Role === role ? count + 1 : count;
    }, 0);
  };

  const userCustomersCount = calculateCounts(customerData, "User");
  const propertiesCount = propertiesData?.length || 0;
  const adminCustomersCount = calculateCounts(customerData, "Admin");
  const superAdminCustomersCount = calculateCounts(customerData, "Superadmin");
  const totalLikedPropertiesCount = likesData
    ? likesData.reduce((count, userLikes) => {
        return count + userLikes.likedProperties.length;
      }, 0)
    : 0;

  const renderPanelContent = () => {
    switch (activePanel) {
      case "Customer":
        return <Customer customerData={customerData} />;
      case "Admins":
        return <Admins customerData={customerData} />;
      case "SuperAdminDetails":
        return <SuperAdminDetails customerData={customerData} />;
      case "Properties":
        return <Properties propertiesData={propertiesData} />;
      case "InterestedProperties":
        return <IntrestedProperties likedProperties={likesData} />;
      default:
        return null;
    }
  };

  return (
    <div className="panel-wrapper">
      <div>
        {isLoading ? (
           <div className="loading-overlay">
           <div className="loader"></div>
         </div>
        ) : (
          <>
            <div className="panel-wrap">
              <div className="panel" onClick={() => setActivePanel("Customer")}>
                <i className="material-icons">people</i>
                <h3>Customers</h3>
                <p> {userCustomersCount}</p>
              </div>
              <div
                className="panel"
                onClick={() => setActivePanel("Properties")}
              >
                <i className="material-icons">home</i>
                <h3>Properties</h3>
                <p> {propertiesCount}</p>
              </div>
              <div className="panel" onClick={() => setActivePanel("Admins")}>
                <i className="material-icons">admin_panel_settings</i>
                <h3>Admins</h3>
                <p> {adminCustomersCount}</p>
              </div>
              <div
                className="panel"
                onClick={() => setActivePanel("SuperAdminDetails")}
              >
                <i className="material-icons">admin_panel_settings</i>
                <h3>SuperAdmins</h3>
                <p>{superAdminCustomersCount}</p>
              </div>
              <div
                className="panel"
                onClick={() => setActivePanel("InterestedProperties")}
              >
                <i className="material-icons">favorite</i>
                <h3>Interested Properties</h3>
                <p>{totalLikedPropertiesCount}</p>
              </div>
            </div>
            {renderPanelContent()}
          </>
        )}
      </div>
    </div>
  );
}

export default SuperAdminHome;
