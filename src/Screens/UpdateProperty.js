import React, { useState } from "react";
import { addProperty } from "../functions/addProperty";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../Config/Firebase";
import emailjs from "emailjs-com";
function UpdateProperty({ property, onClose }) {
  const [propertyData, setPropertyData] = useState(property);
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    onClose();
  };
  const handleSave = () => {
    alert(1);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };
  const handleAmenitiesChange = (event) => {
    const { name, checked } = event.target;
    const updatedAmenities = checked
      ? [...propertyData.amenities, name]
      : propertyData.amenities.filter((amenity) => amenity !== name);

    setPropertyData({
      ...propertyData,
      amenities: updatedAmenities,
    });
  };
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files);
    const newImagesBlob = [];
    for (let i = 0; i < files.length; i++) {
      newImagesBlob.push(URL.createObjectURL(files[i]));
    }
    setPropertyData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newImages],
    }));
    event.target.value = "";
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    propertyData.isActive = false;
    event.preventDefault();
    try {
      const imageUrls = await Promise.all(
        propertyData.images.map(async (image) => {
          if (image instanceof File) {
            const imageName = `${propertyData.propertyName}/${Date.now()}_.jpg`;
            const imageRef = ref(storage, imageName);
            await uploadBytes(imageRef, image);
            return await getDownloadURL(imageRef);
          } else {
            return image;
          }
        })
      );

      console.log("Image URLs:", imageUrls);
      const updatedPropertyData = {
        ...propertyData,
        images: imageUrls,
      };
      await addProperty(updatedPropertyData, (res) => {
       
      });
      const templateParams = {
        message: auth.currentUser.email + " Has updated the Property with Id "+propertyData.propertyId+" Property Name "+propertyData.propertyName,
        reply_to: "",
        Subject_Line: "Updated Property With Id "+propertyData.propertyId,
        property_id: propertyData.propertyId,
        User_Details: "Email "+auth.currentUser.email,
      
      };
   

      const emailResult = await emailjs.send(
        "service_9se04o4",
        "template_93q2vw6",
        templateParams,
        "DjRH3jF4kEBM1yaoe"
      ).then(()=>{
        setLoading(false);
        window.location.reload();
      });

      console.log("Email sent:", emailResult);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = propertyData.images.filter((_, i) => i !== index);
    setPropertyData({
      ...propertyData,
      images: updatedImages,
    });
  };
  return (
    <>
      <div className="main-but">
        <button
          className="Delete"
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </button>
        <button
          className="Edit"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Property Name</label>
          <input
            type="text"
            name="propertyName"
            value={propertyData.propertyName}
            placeholder={"Enter Property Name"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Property Location URL</label>
          <input
            type="text"
            name="propertyImageURL"
            value={propertyData.propertyImageURL}
            placeholder={"Enter Location URL"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address Name</label>
          <input
            type="text"
            name="addressName"
            value={propertyData.addressName}
            placeholder={"Enter Address Name"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Landmark Name</label>
          <input
            type="text"
            name="landmarkName"
            value={propertyData.landmarkName}
            placeholder={"Enter Landmark Name"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City Name</label>
          <select
            name="cityName"
            value={propertyData.cityName}
            onChange={handleInputChange}
            id="cityName"
          >
            <option value="">Select City Name</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bhimavaram">Bhimavaram</option>
            <option value="Benguluru">Benguluru</option>
            <option value="Vizag">Vizag</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>State Name</label>
          <input
            type="text"
            name="stateName"
            value={propertyData.stateName}
            placeholder={"Enter State Name"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={propertyData.pincode}
            placeholder={"Enter Pincode"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Property Price</label>
          <input
            type="text"
            name="propertyPrice"
            value={propertyData.propertyPrice}
            placeholder={"Enter Property Price"}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid-input">
          <div>
            <select
              name="offerType"
              value={propertyData.offerType}
              onChange={handleInputChange}
            >
              <option value="">Select Offer Type</option>
              <option value="Sale">Sale</option>
              <option value="Resale">Resale</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <div>
            <select
              name="propertyType"
              value={propertyData.propertyType}
              onChange={handleInputChange}
            >
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Open Plots">Open Plots</option>
              <option value="Estates">Estates</option>
              <option value="Hotels">Hotels</option>
            </select>
          </div>
          <div>
            <select
              name="propertyStatus"
              value={propertyData.propertyStatus}
              onChange={handleInputChange}
            >
              <option value="">Select Property Status</option>
              <option value="Ready to move">Ready to move</option>
              <option value="Under construction">Under construction</option>
            </select>
          </div>
          <div>
            <select
              name="furnishedStatus"
              value={propertyData.furnishedStatus}
              onChange={handleInputChange}
            >
              <option value="">Select Furnished Status</option>
              <option value="Fully furnished">Fully furnished</option>
              <option value="Semi furnished">Semi furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          <div>
            <select
              name="facing"
              value={propertyData.facing}
              onChange={handleInputChange}
            >
              <option value="">Select Facing</option>
              <option value="North">North</option>
              <option value="East">East</option>
              <option value="South">South</option>
              <option value="West">West</option>
              <option value="NE">NE</option>
              <option value="NW">NW</option>
              <option value="SW">SW</option>
              <option value="SE">SE</option>
            </select>
          </div>
          <br />
          <div>
            <input
              type="text"
              name="roomFloor"
              id="w-250"
              value={propertyData.roomFloor}
              placeholder={"Enter Room Floor"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="ageOfConstruction"
              id="w-250"
              value={propertyData.ageOfConstruction}
              placeholder={"Age of construction"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="howManyBhk"
              id="w-250"
              value={propertyData.howManyBhk}
              placeholder={"How many BHK"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="howManyBedrooms"
              id="w-250"
              value={propertyData.howManyBedrooms}
              placeholder={"How many Bedrooms"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="howManyBathrooms"
              id="w-250"
              value={propertyData.howManyBathrooms}
              placeholder={"How many Bathrooms"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="howManyBalconies"
              id="w-250"
              value={propertyData.howManyBalconies}
              placeholder={"How Many Balconies"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="totalFloor"
              id="w-250"
              value={propertyData.totalFloor}
              placeholder={"Total Floor"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="floorRoom"
              id="w-250"
              value={propertyData.floorRoom}
              placeholder={"Floor Room"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="w-250"
              name="carpetArea"
              value={propertyData.carpetArea}
              placeholder={"Enter Carpet Area"}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <textarea
              id="w-250"
              name="description"
              value={propertyData.description}
              placeholder={"Enter Description"}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <h1>Amenities</h1>
        <div className="ame">
          <br />
          <div>
            <input
              type="checkbox"
              name="Lift"
              checked={propertyData.amenities.includes("Lift")}
              onChange={handleAmenitiesChange}
            />
            <label>Lift</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Security Guard"
              checked={propertyData.amenities.includes("Security Guard")}
              onChange={handleAmenitiesChange}
            />
            <label>Security Guard</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Play Ground"
              checked={propertyData.amenities.includes("Play Ground")}
              onChange={handleAmenitiesChange}
            />
            <label>Play Ground</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Garden"
              checked={propertyData.amenities.includes("Garden")}
              onChange={handleAmenitiesChange}
            />
            <label>Garden</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Water Supply"
              checked={propertyData.amenities.includes("Water Supply")}
              onChange={handleAmenitiesChange}
            />
            <label>Water Supply</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Power Backup"
              checked={propertyData.amenities.includes("Power Backup")}
              onChange={handleAmenitiesChange}
            />
            <label>Power Backup</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Parking Area"
              checked={propertyData.amenities.includes("Parking Area")}
              onChange={handleAmenitiesChange}
            />
            <label>Parking Area</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Gym"
              checked={propertyData.amenities.includes("Gym")}
              onChange={handleAmenitiesChange}
            />
            <label>Gym</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Shopping Mall"
              checked={propertyData.amenities.includes("Shopping Mall")}
              onChange={handleAmenitiesChange}
            />
            <label>Shopping Mall</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Hospital"
              checked={propertyData.amenities.includes("Hospital")}
              onChange={handleAmenitiesChange}
            />
            <label>Hospital</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="School"
              checked={propertyData.amenities.includes("School")}
              onChange={handleAmenitiesChange}
            />
            <label>School</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Market Area"
              checked={propertyData.amenities.includes("Market Area")}
              onChange={handleAmenitiesChange}
            />
            <label>Market Area</label>
          </div>
        </div>
        <div className="upload">
          <label>Images Upload</label>
          <input
            type="file"
            name="imageUpload"
            onChange={handleImageUpload}
            multiple
          />
        </div>
        <div className="preview">
          {propertyData.images.map((imageURL, index) => (
            <div key={index} className="image-container">
              <img
                src={imageURL}
                alt={`Property Image ${index + 1}`}
                width="100"
              />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
     
        {loading ? (
           <div className="loading-overlay">
           <div className="loader"></div>
         </div>
        ) : (
          <button type="submit" disabled={loading} className="Edit">
            Submit
          </button>
        )}
      </form>
    </>
  );
}

export default UpdateProperty;
