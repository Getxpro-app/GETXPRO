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
            <a href="/">
              <FontAwesomeIcon icon={faHome}/>
            </a>
          </li>
          <li>
            <a href="/checklist">
              <FontAwesomeIcon icon={faTasks}/>
            </a>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>
              <FontAwesomeIcon icon={faUserTimes}/>
            </a>
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