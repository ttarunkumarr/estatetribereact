import { collection, getDocs } from "firebase/firestore";
import {  db } from "../Config/Firebase";

export const fetchPropertiesNew = async (callback) => {
  try {
    const collectionRef = collection(db, "Properties");
    const querySnapshot = await getDocs(collectionRef);

    const activeProperties = [];
    querySnapshot.forEach((doc) => {
      const propertyData = doc.data();

      activeProperties.push(propertyData);
    });

    callback(activeProperties);
  } catch (error) {
    console.log("Error fetching active properties data:", error);
    callback([]);
  }
};
