import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Propertiesdata.css";
import sold from "../assets/sold-out.png";
import NavBar from "../Components/NavBar";
import Footer from "./Footer";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";
import { fetchPropertiesNew } from "../functions/getPropertiesNew";
import Modal from "../Components/Modal";
import {
  handleLike,
  handleRemoveLike,
} from "../functions/addLikes";
function ExplorePropertiesDisplay() {
  const [PropertiesAll, setPropertiesAll] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [userLikes, setUserLikes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [Likes, setLikes] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetchPropertiesNew((role) => {
      setPropertiesAll(role);
      setLoading(false);
    });
  }, []);
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

  const isPropertyLiked = (property) => {
    return userLikes.some((like) => like.propertyId === property.propertyId);
  };
  const getLikesCountForProperty = (propertyId) => {
    let likesCount = 0;

    Likes.forEach((user) => {
      const likedProperties = user.likedProperties;
      const likesForProperty = likedProperties.filter(
        (likedProperty) => likedProperty.propertyId === propertyId
      );
      likesCount += likesForProperty.length;
    });

    return likesCount;
  };
  return (
    <>
      <NavBar />
      {errorMessage && (
        <Modal message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
      {Loading ? (
          <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="main-holder">
          <div className="property-heading">
            <h1>Explore Properties</h1>
            <div className="line-under"></div>
          </div>
          <div className="propertyHolder">
            {PropertiesAll.map((property, index) => (
              <div className="propertyCard" key={property.propertyId}>
            
                <img src={property.images[0]} />
                <span className="soldOut">
                  {property.soldOut === false ? (
                    <button
                      className={`like ${
                        isPropertyLiked(property) ? "liked" : ""
                      }`}
                      onClick={async () => {
                        if (isPropertyLiked(property)) {
                          handleRemoveLike(property.propertyId);
                        } else {
                          const p = await handleLike(property);
                          setErrorMessage(p);
                        }
                      }}
                    >
                      <i
                        className={`fa fa-heart ${
                          isPropertyLiked(property) ? "liked" : ""
                        }`}
                      ></i>
                    </button>
                  ) : (
                    <img src={sold} alt="" />
                  )}
                </span>

                <div className="card-content">
                  <h3>{property.propertyName}</h3>
                  <p>{property.addressName}</p>
                  <p className="rup">₹{property.propertyPrice}</p>
                  <div className="keypoints">
                    <p>{property?.carpetArea} Sqft</p>
                    <p>{property.cityName}</p>
                  </div>
                  <div className="divider"></div>
                  <div className="buttons-con">
                    <button className="mat-style">
                      {property.soldOut === false ? (
                        <Link to={`/property?property=${property.propertyId}`}>
                          View Property
                        </Link>
                      ) : (
                        "ViewProperty"
                      )}
                    </button>
                    <button className="mat-style">
                      <i className="material-icons">thumb_up</i>
                      {getLikesCountForProperty(property.propertyId)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div></div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default ExplorePropertiesDisplay;
