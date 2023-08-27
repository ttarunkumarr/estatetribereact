import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Config/Firebase";


export const addProperty = async (propertyData, callback) => {
  try {
    propertyData.createdAt = serverTimestamp();
    const propertyName = propertyData.propertyId;
    const propertiesCollectionRef = collection(db, "Properties");
    const propertyDocRef = doc(propertiesCollectionRef, propertyName);
    await setDoc(propertyDocRef, propertyData);

    callback("Property added successfully");
  } catch (error) {
    console.error("Error adding property:", error);
    callback("Error adding property");
  }
};
