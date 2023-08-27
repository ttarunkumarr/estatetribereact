import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fetchSingleProperty } from "../functions/getSingleProperty";
import "./PropertyDetails.css";
import car from "../assets/icons/plan.png";
import typep from "../assets/icons/house.png";
import NavBar from "../Components/NavBar";
import Footer from "./Footer";
import FlickityCarousel from "../Components/FlickityCarousel";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";
import { handleLike, handleRemoveLike } from "../functions/addLikes";
import Modal from "../Components/Modal";
function PeopertyDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();
  const propertyId = queryParams.get("property");
  const [Property, setProperty] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [userLikes, setUserLikes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setLoading(true);
    fetchSingleProperty((role) => {
      if (role === "Error") {
        history.push("/");
      } else {
        setProperty(role);
        setLoading(false);
      }
    }, propertyId);
  }, [propertyId, history]);
  function extractSrcFromIframe(iframeHtml) {
    const match = iframeHtml.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  const handleDate = () => {
    const days =
      (new Date() -
        new Date(
          Property.createdAt.seconds * 1000 +
            Property.createdAt.nanoseconds / 1000000
        )) /
      (24 * 60 * 60 * 1000);

    if (days < 1) {
      const hours = Math.floor(days * 24);
      if (hours < 1) {
        const minutes = Math.floor(hours * 60);
        return minutes < 1 ? "Updated Just Now" : `Updated ${minutes}m ago`;
      }
      return `Updated ${hours}h ago`;
    }

    return days < 0 ? "Updated Just Now" : `Updated ${Math.floor(days)}d ago`;
  };
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
  return (
    <>
      <NavBar />
      {errorMessage && (
        <Modal message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
      <div>
        {Loading ? (
          <div className="loading-overlay">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="property">
            <div className="carousel-rel">
              <FlickityCarousel>
                {Property.images &&
                  Property.images.map((image, index) => (
                    <div className="carousel-cell" key={index}>
                      <img src={image} alt={`Image ${index}`} />
                    </div>
                  ))}
              </FlickityCarousel>
              <div className="price-card">
                <div className="card-top">
                  <div className="card-left">
                    <p>Total Price</p>
                    <h4 className={auth?.currentUser ? "" : "bbb"}>
                      {auth?.currentUser
                        ? "₹ " + Property?.propertyPrice
                        : "₹ 00000"}
                    </h4>
                  </div>
                  <div className="card-right">
                    <button
                      onClick={async () => {
                        const p = await handleLike(Property, "Request Sent");
                        setErrorMessage(p);
                      }}
                    >
                      Send Request
                    </button>
                  </div>
                </div>
                <div className="divider"></div>

                <div className="card-bottom">
                  <div className="card-left">
                    <p>{handleDate()} </p>
                  </div>
                  <div className="card-right">
                    <button
                      className={`like ${
                        isPropertyLiked(Property) ? "liked" : ""
                      }`}
                      onClick={async () => {
                        if (isPropertyLiked(Property)) {
                          handleRemoveLike(Property.propertyId);
                        } else {
                          const p = await handleLike(Property);
                          setErrorMessage(p);
                        }
                      }}
                    >
                      <i
                        className={`fa fa-heart ${
                          isPropertyLiked(Property) ? "liked" : ""
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="second-div">
              <div className="property-details">
                <div className="property-address">
                  <p>{Property.addressName + " " + Property.cityName}</p>
                </div>
                <div className="property-icons">
                  <img src={typep} alt="" />
                  <p>
                    {Property.propertyType}
                    Type
                  </p>
                  <img src={car} alt="" />
                  <p>
                    {Property.carpetArea}
                    Sq.ft
                  </p>
                  {/*   <p>
              <img src="../assets/icons/double-bed.png" alt="" />
              {{ property?.pBedroom }}
              Bedrooms
            </p>
            <p>
              <img src="../assets/icons/bath.png" alt="" />
              {{ property?.pBathroom }}
              Bathroom
            </p> */}
                </div>
                <div className="property-description">
                  <p>{Property.description}</p>
                </div>
              </div>
            </div>
            <>
              {auth?.currentUser ? (
                <>
                  <div className="property_features_main_container">
                    <div className="property_features">
                      <div className="property_features_title">
                        <h2>Features</h2>
                      </div>
                      <div className="line_features"></div>

                      <div className="property_features_inner_container">
                        <div className="left_property_features">
                          <div className="space_props">
                            <h5>Property Type:</h5>
                            <h5>{Property.propertyType}</h5>
                          </div>
                          <div className="space_props">
                            <h5>Facing:</h5>
                            <h5>{Property.facing}</h5>
                          </div>
                          <div className="space_props">
                            <h5>Age of Construction:</h5>
                            <h5>{Property.ageOfConstruction}</h5>
                          </div>
                          <div className="space_props">
                            <h5>Room Floor:</h5>
                            <h5>{Property.roomFloor}</h5>
                          </div>
                          <div className="space_props">
                            <h5>Total Floor:</h5>
                            <h5>{Property.totalFloor}</h5>
                          </div>
                        </div>
                        <div className="right_property_features">
                          <div className="space_props">
                            <h5>Construction Status:</h5>
                            <h5>{Property.propertyStatus}</h5>
                          </div>
                          <div className="space_props">
                            <h5>Furnished Status:</h5>
                            <h5>{Property.furnishedStatus}</h5>
                          </div>
                          <div className="space_props">
                            <h5>Rooms:</h5>
                            <h5>{Property.floorRoom}</h5>
                          </div>
                          <div className="space_props">
                            <h5>Offer Type:</h5>
                            <h5>{Property.offerType}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="property_features_main_container">
                    <div className="property_features">
                      <div className="property_features_title">
                        <h2>Amenities</h2>
                      </div>
                      <div className="line_features"></div>
                      <div className="property_features_inner_container">
                        {Property && (
                          <>
                            <div className="left_property_features a-i">
                              {Property.amenities &&
                                Property.amenities
                                  .slice(
                                    0,
                                    Math.ceil(Property.amenities.length / 3)
                                  )
                                  .map((amenity, index) => (
                                    <div className="space_props" key={index}>
                                      <h5>{amenity}</h5>
                                      <mat-icon>
                                        {Property.amenities.includes(amenity)
                                          ? "✓"
                                          : "✗"}
                                      </mat-icon>
                                    </div>
                                  ))}
                            </div>
                            <div className="middle_property_features a-i">
                              {Property.amenities &&
                                Property.amenities
                                  .slice(
                                    Math.ceil(Property.amenities.length / 3),
                                    Math.ceil(
                                      (Property.amenities.length * 2) / 3
                                    )
                                  )
                                  .map((amenity, index) => (
                                    <div className="space_props" key={index}>
                                      <h5>{amenity}</h5>
                                      <mat-icon>
                                        {Property.amenities.includes(amenity)
                                          ? "✓"
                                          : "✗"}
                                      </mat-icon>
                                    </div>
                                  ))}
                            </div>
                            <div className="right_property_features a-i">
                              {Property.amenities &&
                                Property.amenities
                                  .slice(
                                    Math.ceil(
                                      (Property.amenities.length * 2) / 3
                                    )
                                  )
                                  .map((amenity, index) => (
                                    <div className="space_props" key={index}>
                                      <h5>{amenity}</h5>
                                      <mat-icon>
                                        {Property.amenities.includes(amenity)
                                          ? "✓"
                                          : "✗"}
                                      </mat-icon>
                                    </div>
                                  ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="Map-iframeHolder">
                    <iframe
                      src={extractSrcFromIframe(Property.propertyImageURL)}
                      width="100%"
                      height="450"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </>
              ) : (
                <>
                  <div className="property_features ">
                    <div className="property_features_title">
                      <h2>Features</h2>
                    </div>
                    <div className="line_features"></div>

                    <div className="property_features_inner_container bb">
                      <div className="left_property_features">
                        <div className="space_props">
                          <h5>Property Type:</h5>
                          <h5>{Property.propertyType}</h5>
                        </div>
                        <div className="space_props bbgunn">
                          <h5>Facing:</h5>
                          <h5>{Property.facing}</h5>
                        </div>
                      </div>
                      <div className="right_property_features">
                        <div className="space_props">
                          <h5>Construction Status:</h5>
                          <h5>{Property.propertyStatus}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="login-overlay-content">
                    <div className="cardbb">
                      {" "}
                      <p>Please log in to view property details.</p>
                      <button
                        onClick={() => history.push("/login")}
                        className="Edit lob"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default PeopertyDetails;
