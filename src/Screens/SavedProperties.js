import React, { useEffect, useState } from 'react';
import { auth, db } from '../Config/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { handleRemoveLike } from '../functions/addLikes';

function SavedProperties() {
  const [likesData, setLikesData] = useState([]);

  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        const docRef = doc(db, 'UserLikes', `${auth.currentUser.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLikesData(docSnap.data().likes || []);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchLikesData();
  }, []);

  return (
    <div className='panel-wrapper '>
      <h1>Saved Properties</h1>
    <div className='tableHol'>
    <table>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Name</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {likesData.map((like, index) => (
            <tr key={index}>
              <td>{like.propertyName}</td>
              <td>{like.name}</td>
              <td>{like.user}</td>
              <td><button className='Delete' onClick={async()=>{
                const p=await handleRemoveLike(like.propertyId).then((e)=>{
                  window.location.reload();
                });
             
              }}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default SavedProperties;
