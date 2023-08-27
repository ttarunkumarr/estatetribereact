import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";

export const fetchSingleProperty = async (callback,id) => {
  try {

    const docRef = doc(db, 'Properties', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const propertyData = docSnap.data();
      callback(propertyData); 
    } else {
      callback('Error'); 
    }
  } catch (error) {
    console.log('Error fetching Properties data:', error);
    callback('Error'); 
  }
};
