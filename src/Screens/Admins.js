import React, { useEffect, useState } from "react";
import { fetchCustomers } from "../functions/getCustomerdata";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";

function Admin() {
  const [Users, setUsers] = useState(null);
  const [EditMode, setEditMode] = useState({});
  useEffect(() => {
    fetchCustomers((customers) => {
      setUsers(customers);
    }, "Admin");
  }, []);
  const handleEdit = (index) => {
    setEditMode(Users[index]);
  };
  const handleSave = async () => {
    if (
      EditMode.Role === "Admin" ||
      EditMode.Role === "User" ||
      EditMode.Role === "Superadmin"
    ) {
      await setDoc(doc(db, "Customers", EditMode.uid), EditMode).then(async()=>{
        await setDoc(doc(db, "UserRoles", EditMode.Email), {
          role: EditMode.Role,
        }).then((e)=>{
          window.location.reload();
        });
      });
      
      setEditMode({});
    } else {
      return;
    }
  };
  return (
    <div>
      <h2>Admins:</h2>
      {Users && Users.length > 0 ? (
        EditMode.hasOwnProperty("uid") ? (
          <>
            <div className="Editform">
              <input type="text" value={EditMode.Name} readOnly />
              <input type="text" value={EditMode.Email} readOnly />
              <input
                type="text"
                placeholder="PhoneNumber"
                value={EditMode.PhoneNumber}
                readOnly
              />
              <select
                name="Role"
                value={EditMode.Role}
                onChange={(e) => {
                  setEditMode({ ...EditMode, Role: e.target.value });
                }}
              >
                <option value="Admin">Admin</option>
                <option value="Superadmin">Superadmin</option>
                <option value="User">User</option>
              </select>
              <button onClick={() => setEditMode({})} className="Delete">
                Cancel
              </button>

              <button onClick={handleSave} className="Edit">
                Save
              </button>
            </div>
            <pre>{JSON.stringify(EditMode, null, 2)}</pre>
          </>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.Name}</td>
                  <td>{customer.Email}</td>
                  <td>{customer.PhoneNumber}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} className="Edit">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={async() => {
                      await deleteDoc(doc(db, "Customers", customer.uid)).then(async()=>{
                        await deleteDoc(doc(db, "UserRoles", customer.Email)).then(()=>{
                          window.location.reload();
                        });
                      });
                    }} className="Delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <p>No User Customers Found</p>
      )}
    </div>
  );
}

export default Admin;
