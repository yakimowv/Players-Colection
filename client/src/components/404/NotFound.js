import React from 'react'
import {Link} from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="full-screen">
    <div className='con-not-found'>
        <span className="error-num">4</span>
        <div className='eye'>
        </div>
        <span className="error-num">4</span>

        <p className="sub-text">Something went wrong. We're <span className="italic">looking</span> to see what happened.</p>
        <p>Go Back to <Link to="/">Home</Link></p>
    </div>
</div>
  )
}

export default NotFound