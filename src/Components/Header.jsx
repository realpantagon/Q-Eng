import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <ul>
      <li><Link to="/">Display Queue</Link></li>
      <li><Link to="/manage">Manage Queue</Link></li>
      <li><Link to="/request">Request Queue</Link></li>
    </ul>
  </nav>
);

export default Header;
