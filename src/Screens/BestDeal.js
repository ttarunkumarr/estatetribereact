import React, { useEffect, useState } from "react";

import "./bestDeal.css";
import { fetchPropertiesNew } from "../functions/getPropertiesNew";

function BestDeal() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertiesNew((propertiesData) => {
      setProperties(propertiesData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (properties.length === 0) {
    return <div>No properties available.</div>;
  }

  return (
    <div className="cards-best-deal">
      {properties.map((propertyData) => (
        <PropertyDetails
          key={propertyData.propertyId}
          propertyData={propertyData}
        />
      ))}
    </div>
  );
}

function PropertyDetails({ propertyData }) {
  const firstImage = propertyData.images[0];

  return (
    <div className="deal-card">
      <div className="img-deal-card">
        <img src={firstImage} alt="Property" />
      </div>
      <h3>
        {propertyData.howManyBhk}, {propertyData.cityName}
      </h3>
      <p>
        {propertyData.carpetArea} sqft, {propertyData.landmarkName}
      </p>
    </div>
  );
}

export default BestDeal;
