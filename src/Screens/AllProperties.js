import React, { useState, useEffect } from "react";
import { handleDelete } from "../functions/deleteProperty";
import UpdateProperty from "./UpdateProperty";
import { db } from "../Config/Firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

function AllProperties({ propertiesData }) {
  const [isLoading, setisLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [updatedPropertiesData, setUpdatedPropertiesData] = useState([]);

  useEffect(() => {
    const fetchBestDealData = async () => {
      const updatedData = await Promise.all(
        propertiesData.map(async (property) => {
          const bestDealsDocRef = doc(db, "bestdeals", property.propertyId);
          const bestDealsDocSnapshot = await getDoc(bestDealsDocRef);

          if (bestDealsDocSnapshot.exists()) {
            return { ...property, isBestDeal: true };
          } else {
            return { ...property, isBestDeal: false };
          }
        })
      );

      setUpdatedPropertiesData(updatedData);
    };

    fetchBestDealData();
  }, [propertiesData]);

  const propertyDelete = (propertyId) => {
    setisLoading(true);
    handleDelete((result) => {
      if (result) {
        setisLoading(false);
        window.location.reload();
      }
    }, propertyId);
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleToggleBestDeal = async (id) => {
    const bestDealsCollection = doc(db, "bestdeals", id);

    const property = updatedPropertiesData.find(
      (property) => property.propertyId === id
    );
    const isActive = property.isActive;

    if (property) {
      if (isActive) {
        if (property.isBestDeal) {
          try {
            await deleteDoc(bestDealsCollection);
            property.isBestDeal = false;
          } catch (error) {
            console.error("Error removing best deal status:", error);
          }
        } else {
          try {
            await setDoc(bestDealsCollection, { propertyId: id });
            property.isBestDeal = true;
          } catch (error) {
            console.error("Error updating best deal status:", error);
          }
        }

        setUpdatedPropertiesData([...updatedPropertiesData]);
      } else {
        console.log("Property is not active, cannot set as best deal.");
      }
    }
  };

  return (
    <>
      {showModal ? (
        <UpdateProperty
          property={selectedProperty}
          onClose={() => setShowModal(false)}
        />
      ) : (
        <div className="panel-wrapper">
          <table>
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Active</th>
                <th>Sold Out</th>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Best Deals</th>
              </tr>
            </thead>
            <tbody>
              {updatedPropertiesData.map((property, index) => (
                <tr key={index}>
                  <td>{property.propertyName}</td>
                  <td>{property.isActive ? "Yes" : "No"}</td>
                  <td>{property.SoldOut ? "Yes" : "No"}</td>
                  <td>{property.role}</td>
                  <td>{property.PhoneNumber}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(property)}
                      className="Edit"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setisLoading(true);
                        propertyDelete(property.propertyId);
                      }}
                      className="Delete"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {property.isActive ? (
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={property.isBestDeal}
                          onChange={() => handleToggleBestDeal(property.propertyId)}
                        />
                        <span className="slider"></span>
                      </label>
                    ) : (
                      "Pending Approval From Super Admin"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AllProperties;
