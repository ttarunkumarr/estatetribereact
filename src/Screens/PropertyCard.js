import React from "react";
import sold from "../assets/sold-out.png";
import { Link } from "react-router-dom";
import { handleLike, handleRemoveLike } from "../functions/addLikes";

function PropertyCard({ property, userLikes, Likes, setErrorMessage }) {
  const isPropertyLiked = () => {
    return userLikes.some((like) => like.propertyId === property.propertyId);
  };

  const getLikesCountForProperty = () => {
    let likesCount = 0;

    Likes.forEach((user) => {
      const likedProperties = user.likedProperties;
      const likesForProperty = likedProperties.filter(
        (likedProperty) => likedProperty.propertyId === property.propertyId
      );
      likesCount += likesForProperty.length;
    });

    return likesCount;
  };

  return (
    <div className="propertyCard">
      <img src={property.images[0]} alt="" />
      <span className="soldOut">
        {property.soldOut === false ? (
          <button
            className={`like ${isPropertyLiked() ? "liked" : ""}`}
            onClick={async () => {
              if (isPropertyLiked()) {
                handleRemoveLike(property.propertyId);
                setErrorMessage("Unliked property");
              } else {
                const p = await handleLike(property);
                setErrorMessage(p);
              }
            }}
          >
            <i
              className={`fa fa-heart ${isPropertyLiked() ? "liked" : ""}`}
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
            {getLikesCountForProperty()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
