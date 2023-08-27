// likeFunctions.js

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config/Firebase";

export const fetchLikesForProperty = async (propertyId = null) => {
  const likesCollectionRef = collection(db, "UserLikes");

  try {
    let q;

    if (propertyId) {
      q = query(likesCollectionRef, where("likes", "array-contains", { propertyId }));
    } else {
      q = likesCollectionRef; // Query without filtering by propertyId
    }

    const querySnapshot = await getDocs(q);

    const usersLikedProperty = [];

    querySnapshot.forEach((doc) => {
      usersLikedProperty.push({
        userId: doc.id,
        likedProperties: doc.data()?.likes,
      });
    });

    return usersLikedProperty;
  } catch (error) {
    console.error("Error fetching likes for property:", error);
    return [];
  }
};
