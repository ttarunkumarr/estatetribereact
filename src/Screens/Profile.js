import React, { useEffect, useState } from "react";
import { auth, db } from "../Config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile({ role }) {
  const [userData, setUserData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      const docRef = doc(db, "Customers", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    getDetails();
  }, []);

  const handleEdit = () => {
    setEditable(true);
    setEditedUserData({ ...userData });
  };

  const handleSave = async () => {
    setEditable(false);
    const docRef = doc(db, "Customers", auth.currentUser.uid);
    await updateDoc(docRef, editedUserData);
    setUserData(editedUserData);
  };

  const handleCancel = () => {
    setEditable(false);
    setEditedUserData({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
 <div className="profw">
     <div className="panel-wrapper">
      <h2>User Profile</h2>
      <br />
      <div className="divider"></div>
      <br />
      {userData && (
        <div className="profilep">
          <p>
            <strong>User Name:</strong>{" "}
            {editable ? (
              <input
                type="text"
                name="Name"
                value={editedUserData.Name || ""}
                onChange={handleInputChange}
              />
            ) : (
              userData.Name
            )}
          </p>
          <p>
            <strong>Role: </strong>
            {editable ? (
              <input
                type="text"
                name="Role"
                value={editedUserData.Role || ""}
                onChange={handleInputChange}
              />
            ) : (
              role
            )}
          </p>
          <p>
            <strong>Email:</strong> {userData.Email}
          </p>
        </div>
      )}
      {userData && (
        <div className="Phonep">
          <label htmlFor="phone">Phone</label>
          {editable ? (
            <input
              type="number"
              id="phone"
              name="PhoneNumber"
              value={editedUserData.PhoneNumber || ""}
              onChange={handleInputChange}
            />
          ) : (
            userData.PhoneNumber
          )}
        </div>
      )}
      {editable ? (
        <div>
          <button onClick={handleSave} className="Edit">Save</button>
          <button onClick={handleCancel} className="Delete">Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={handleEdit} className="Edit">Edit</button>
        </div>
      )}
    </div>
 </div>
  );
}

export default Profile;
