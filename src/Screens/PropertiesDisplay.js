import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Propertiesdata.css";
import sold from "../assets/sold-out.png";
import NavBar from "../Components/NavBar";
import Footer from "./Footer";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../Config/Firebase";
import { handleLike, handleRemoveLike } from "../functions/addLikes";
import Modal from "../Components/Modal";
import PropertyCard from "./PropertyCard";
function PropertiesDisplay() {
  const location = useLocation();
  const history = useHistory();
  const [userLikes, setUserLikes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [Likes, setLikes] = useState([]);
  useEffect(() => {
    const fetchAllLikes = () => {
      const userLikesRef = collection(db, "UserLikes");
      const unsubscribe = onSnapshot(userLikesRef, (snapshot) => {
        const usersLikedProperty = [];

        snapshot.forEach((doc) => {
          usersLikedProperty.push({
            userId: doc.id,
            likedProperties: doc.data()?.likes,
          });
        });
        setLikes(usersLikedProperty);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchAllLikes();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  useEffect(() => {
    const fetchUserLikes = () => {
      if (auth.currentUser) {
        const userLikesRef = doc(db, "UserLikes", auth.currentUser.uid);
        const unsubscribe = onSnapshot(userLikesRef, (snapshot) => {
          const userLikesData = snapshot.data()?.likes || [];
          setUserLikes(userLikesData);
        });

        return unsubscribe;
      }
    };
    const unsubscribe = fetchUserLikes();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (location.state) {
    const { filteredProperties } = location.state;

    return (
      <>
        {errorMessage && (
          <Modal message={errorMessage} onClose={() => setErrorMessage(null)} />
        )}
        <NavBar />
        <div className="main-holder">
          <div className="property-heading">
            <h1>{filteredProperties[0].propertyType}</h1>
            <div className="line-under"></div>
          </div>
          <div className="propertyHolder">
            {filteredProperties.map((property, index) => (
               <PropertyCard
               key={property.propertyId}
               property={property}
               userLikes={userLikes}
               Likes={Likes}
               setErrorMessage={setErrorMessage}
             />
            ))}
          </div>

          <div></div>
        </div>
        <Footer />
      </>
    );
  } else {
    history.push("/");
  }
}

export default PropertiesDisplay;
