import React from 'react'
import {Link} from 'react-router-dom'


function SearchCard({value}) {
  return (
    <div className="card-box">
    <img src={value.image} alt='NO IMG'/>
    <div>
        <div className="text-center">
            <p className="name">Name: {value.name}</p>
            <p className="position">Position: {value.position}</p>
        </div>
        <div className="btn-group">
            <Link to={`/details/${value._id}`} id="details">Details</Link>
        </div>
    </div>
</div>
  )
}

export default SearchCard