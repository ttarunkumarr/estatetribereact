import { doc, setDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";

export const addProperty = async (propertyData, callback) => {
  try {
    // Add the property data to the "properties" document in the "properties" collection
    await setDoc(doc(db, "Customers", "CustomerData"), propertyData);

    callback("Property added successfully"); // Call the callback function with a success message
  } catch (error) {
    console.error("Error adding property:", error);
    callback("Error adding property"); // Call the callback function with an error message
  }
};
const handleAddProperty = async () => {
    const customerData = [
        {
          Name: "Customer 1",
          PhoneNumber: "111-111-1111",
          Email: "customer1@example.com",
          Edit: true,
          Delete: false,
          Role: "Superadmin",
        },
        {
          Name: "Customer 2",
          PhoneNumber: "222-222-2222",
          Email: "customer2@example.com",
          Edit: false,
          Delete: true,
          Role: "Admin",
        },
        {
          Name: "Customer 3",
          PhoneNumber: "333-333-3333",
          Email: "customer3@example.com",
          Edit: true,
          Delete: true,
          Role: "User",
        },
        {
          Name: "Customer 4",
          PhoneNumber: "444-444-4444",
          Email: "customer4@example.com",
          Edit: false,
          Delete: false,
          Role: "Admin",
        },
        {
          Name: "Customer 5",
          PhoneNumber: "555-555-5555",
          Email: "customer5@example.com",
          Edit: true,
          Delete: false,
          Role: "User",
        },
        {
          Name: "Customer 6",
          PhoneNumber: "666-666-6666",
          Email: "customer6@example.com",
          Edit: false,
          Delete: true,
          Role: "Superadmin",
        },
        {
          Name: "Customer 7",
          PhoneNumber: "777-777-7777",
          Email: "customer7@example.com",
          Edit: true,
          Delete: true,
          Role: "User",
        },
        {
          Name: "Customer 8",
          PhoneNumber: "888-888-8888",
          Email: "customer8@example.com",
          Edit: false,
          Delete: false,
          Role: "Admin",
        },
        {
          Name: "Customer 9",
          PhoneNumber: "999-999-9999",
          Email: "customer9@example.com",
          Edit: true,
          Delete: false,
          Role: "User",
        },
        {
          Name: "Customer 10",
          PhoneNumber: "101-101-1010",
          Email: "customer10@example.com",
          Edit: false,
          Delete: true,
          Role: "Admin",
        },
      
      ];
      
      
      
     
      
      const propertiesObject = {
        customers: customerData,
      };
      

    addProperty(propertiesObject, (message) => {
      console.log(message);
      // Handle any additional logic or UI updates after property is added
    });
  };
  <button onClick={handleAddProperty}>Add Property</button>
