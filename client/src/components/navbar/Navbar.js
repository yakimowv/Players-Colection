import "./Navbar.css";

import React from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";


function Header() {

  const { user } = useAuthContext()

  return (
    <div className="navbar">
     
      <Link to="/">
        <div>
          <img src='/images/Logo.png' alt="Logo" className="Logo" />
        </div>
      </Link>

      <div className="trophy">
                    <div className="trophy-container">
                        <img src="images/asd.png" alt='No img' />
                        <h1>3</h1></div>
                        
                    <div className="trophy-container">
                        <img src='images/coppa-italia.png' alt='No img' />
                        <h1>8</h1></div>

                    <div className="trophy-container">
                        <img src="images/seria-a.png" alt='No img' />
                        <h1>19</h1></div>
                </div>

      <nav className="item">
        <ul className="ul">
          <li>
            <Link to="/best-players" className="nav-btn">Best Players</Link>
          </li>
          <li>
            <Link to="/search" className="nav-btn">Search</Link>
          </li>
          {!user.email
            ? <>
              <li>
                <Link to="/login" className="nav-btn">Login</Link>
              </li>
              <li>
                <Link to="/register" className="sign-in">Register</Link>
              </li>
            </>

            : <>
              <li>
                <Link to="/add" className="nav-btn">Add Player</Link>
              </li>
              <li>
                <Link to="/my-profile" className="nav-btn">My Profile</Link>
              </li>
              <li>
                <Link to="/logout" className="nav-btn">Logout</Link>
              </li>
            </>
          }
        </ul>
      </nav>
    </div>
  );
}

export default Header;
