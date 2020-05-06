import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
  return (
      // <React.Fragment>
    <div className="header">
      <h1>Days Of Yore</h1>
      <Link to="/">Home</Link>
      <Link to="/memorycontrol">Memory Lane</Link>
      <Link to="/signin">Sign-in</Link>
      <Link to="/contact">Contact</Link>
      <hr />
    </div>
      // </React.Fragment>
  );
}

export default Header;