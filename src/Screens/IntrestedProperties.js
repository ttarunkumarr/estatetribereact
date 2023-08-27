import React from 'react'

function IntrestedProperties({ likedProperties }) {
  return (
    <div>
      <h2>Interested Properties</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Property Name</th>
            <th>Property ID</th>
            <th>Agent Mail</th>
          </tr>
        </thead>
        <tbody>
          {likedProperties.map((userLikes, index) => (
            userLikes.likedProperties.map((property, propIndex) => (
              <tr key={index + '-' + propIndex}>
                <td>{property.name}</td>
                <td>{property.propertyName}</td>
                <td>{property.propertyId}</td>
                <td>{property.agentMail}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IntrestedProperties;
