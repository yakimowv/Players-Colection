import React from 'react'
import { Link } from 'react-router-dom'


function MyProfileCard({player}) {
  return (
    <div className="dynamic-vertical">
    <div className="front-part-card">
        <img src={player.image} alt="image_nature_1"/>
    </div>
    <div className="back-part-card">
          <h2>Name</h2>
        <p className='player-name'>{player.name}</p>
        <Link to={`/details/${player._id}`} className="details">Details</Link>
    </div>
</div>
  )
}

export default MyProfileCard