import React from 'react';
import { Link } from 'react-router-dom';

function LinkWrapper({ active, to, children }) {
  active = active ? 'active' : '';
  const className = `nav-item ${active}`;

  return (
    <li className={className}>
      <Link to={to} className="nav-link">{children}</Link>
    </li>
  );
}

export default class Navbar extends React.Component {
  render() {
    const { location: {pathname}} = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-light">
        <ul className="navbar-nav">
          <LinkWrapper to="/" active={pathname === '/'}>
            Home
          </LinkWrapper>
          <LinkWrapper to="/login" active={pathname === '/login'}>
            Login
          </LinkWrapper>
          <LinkWrapper to="/register" active={pathname === '/register'}>
            Register
          </LinkWrapper>
        </ul>
      </nav>
    );
  }
}
