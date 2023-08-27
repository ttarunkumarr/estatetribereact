// likeFunctions.js

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";
import emailjs from "emailjs-com";
export const handleLike = async (property,message=null) => {
  if (auth.currentUser) {
    const userLikesRef = doc(db, "UserLikes", auth.currentUser.uid);
    // Fetch the user's existing likes
    const userLikesSnapshot = await getDoc(userLikesRef);
    const existingLikes = userLikesSnapshot.data()?.likes || [];

    // Check if the property is already liked by the user
    if (existingLikes.some((like) => like.propertyId === property.propertyId)) {
    
      return message?"Request already sent sucessfully":"Property already liked";
    }

    // Update the likes array with the new like
    const updatedLikes = [
      ...existingLikes,
      {
        propertyId: property.propertyId,
        user: auth.currentUser.email,
        name: auth.currentUser.displayName,
        agentMail:property.updatedBy,
        propertyName: property.propertyName,
      },
    ];

    // Set the updated likes array in the Firestore document
    await setDoc(userLikesRef, { likes: updatedLikes });
    const templateParams = {
      message: auth.currentUser.email + " Has Liked the Property with Id "+property.propertyId+" Property Name "+property.propertyName,
      reply_to: "",
      Subject_Line: "Liked Property With Id "+property.propertyId,
      property_id: property.propertyId,
      User_Details: "Email "+auth.currentUser.email,
    };
 

    const emailResult = await emailjs.send(
      "service_9se04o4",
      "template_93q2vw6",
      templateParams,
      "DjRH3jF4kEBM1yaoe"
    ).then(()=>{
    });
    return message?message:"Liked the Property"
  } else {
    return "You must be logged in";
  }
};
export const handleRemoveLike = async (propertyId) => {
  if (auth.currentUser) {
    const userLikesRef = doc(db, "UserLikes", auth.currentUser.uid);

    // Fetch the user's existing likes
    const userLikesSnapshot = await getDoc(userLikesRef);
    const existingLikes = userLikesSnapshot.data()?.likes || [];

    // Find the index of the liked property
    const propertyIndex = existingLikes.findIndex(
      (like) => like.propertyId === propertyId
    );

    // If property was found, remove it from the array
    if (propertyIndex !== -1) {
      existingLikes.splice(propertyIndex, 1);

      // Update the likes array in the Firestore document
      await setDoc(userLikesRef, { likes: existingLikes });
    } else {
      console.log("Property not found in user's liked properties.");
    }
  } else {
   
    
  }

};
export const fetchUserLikedProperties = async () => {
  if (auth.currentUser) {
    const userLikesRef = doc(db, "UserLikes", auth.currentUser.uid);

    // Fetch the user's existing likes
    const userLikesSnapshot = await getDoc(userLikesRef);
    const userLikedProperties = userLikesSnapshot.data()?.likes || [];

    return userLikedProperties;
  } else {
    console.log("User not found");

    return [];
  }
};
