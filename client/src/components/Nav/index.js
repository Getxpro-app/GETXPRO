import React from "react";
import { faHome, faTasks, faUserTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";


function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row logged-in">
          <li>
            <Link to='/'>
              <FontAwesomeIcon className='nav-item' icon={faHome}/>
            </Link>
          </li>
          <li>
            <Link to="/checklist">
              <FontAwesomeIcon className='nav-item' icon={faTasks}/>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => Auth.logout()}>
              <FontAwesomeIcon className='nav-item' icon={faUserTimes}/>
            </Link>
          </li>
        </ul>
      );
    }
  }
  return (
    <div className="nav-container">
      <nav>
        {showNavigation()}
      </nav>
    </div>
  );
}

export default Nav;