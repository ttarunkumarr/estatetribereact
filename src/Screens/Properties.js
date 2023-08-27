import React, { useState, useEffect } from "react";
import { db } from "../Config/Firebase";
import { deleteDoc, doc, updateDoc, collection, onSnapshot } from "firebase/firestore";


function Properties() {
  const [propertiesData, setPropertiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, "Properties"), (snapshot) => {
      const properties = [];
      snapshot.forEach((doc) => {
        properties.push({ propertyId: doc.id, ...doc.data() });
      });
      setPropertiesData(properties);
      setIsLoading(false)
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "Properties", id));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id, propertyType) => {
    try {
      setIsLoading(true);
      const propertyRef = doc(db, "Properties", id);
      await updateDoc(propertyRef, {
        [propertyType]: !propertiesData.find(
          (property) => property.propertyId === id
        )[propertyType],
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
         <div className="loading-overlay">
         <div className="loader"></div>
       </div>
      ) : (
        <div>
          <div className="tableHol">
          <table>
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Active</th>
                <th>Sold Out</th>
                <th>Updated By</th>
                <th>Phone Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {propertiesData.map((property, index) => (
                <tr key={index}>
                  <td>{property.propertyName}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={property.isActive}
                        onChange={() =>
                          handleToggleStatus(property.propertyId, "isActive")
                        }
                      />
                      <span className="slider"></span>
                    </label>
                   
                  </td>
                  <td> <label className="switch">
                      <input
                        type="checkbox"
                        checked={property.soldOut}
                        onChange={() =>
                          handleToggleStatus(property.propertyId, "soldOut")
                        }
                      />
                      <span className="slider"></span>
                    </label></td>
                  <td>{property.updatedBy}</td>
                  <td>{property.PhoneNumber}</td>
                  <td>
                    <button onClick={() => {}} className="Edit">Edit</button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(property.propertyId)}
                      disabled={isLoading}
                      className="Delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Properties;
