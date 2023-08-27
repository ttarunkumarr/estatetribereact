import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";

export const fetchUserRole = async (callback) => {
  try {
    const docRef = doc(db, 'UserRoles', `${auth.currentUser.email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      callback(role); // Call the callback function with the fetched role
    } else {
      callback('No role found'); // Call the callback function with the default message
    }
  } catch (error) {
    console.log('Error fetching user role:', error);
    callback('Error fetching user role'); // Call the callback function with an error message
  }
};
