import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";

export const fetchProperties = async (callback) => {
  try {

    const docRef = doc(db, 'properties', 'properties');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const propertyData = docSnap.data();
      callback(propertyData); 
    } else {
      callback('No Properties data found'); 
    }
  } catch (error) {
    console.log('Error fetching Properties data:', error);
    callback('Error fetching Properties data'); 
  }
};
