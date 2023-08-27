import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config/Firebase";

export const fetchCustomers = async (callback, role = null) => {
  try {
    if (role != null) {
      const Users = [];
      const q = query(collection(db, "Customers"), where("Role", "==", role));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        Users.push(doc.data());
      });
      callback(Users);
    } else {
      const Users = [];
      const querySnapshot = await getDocs(collection(db, "Customers"));
      querySnapshot.forEach((doc) => {
        Users.push(doc.data());
      });
  
      callback(Users);
    }
  } catch (error) {
    console.log("Error fetching customer data:", error);
    callback("Error fetching customer data"); // Call the callback function with an error message
  }
};
