import React from 'react';
import { Link } from 'react-router-dom';

function LinkWrapper({ active, to, children }) {
  active = active ? 'active' : '';
  const className = `nav-item ${active}`;

  return (
    <li className={className}>
      <Link to={to} className="nav-link">
        {children}
      </Link>
    </li>
  );
}

export default class Navbar extends React.Component {
  render() {
    const { location: { pathname }, loggedIn } = this.props;

    return (
      <nav className="navbar navbar-expand-sm navbar-light">
        <ul className="navbar-nav">
          <LinkWrapper to="/" active={pathname === '/'}>
            Home
          </LinkWrapper>
          {!loggedIn && (
            <LinkWrapper to="/login" active={pathname === '/login'}>
              Login
            </LinkWrapper>
          )}
          {!loggedIn && (
            <LinkWrapper to="/register" active={pathname === '/register'}>
              Register
            </LinkWrapper>
          )}
          {loggedIn && (
            <LinkWrapper to="/users" active={pathname === '/users'}>
              Users
            </LinkWrapper>
          )}
          {loggedIn && (
            <LinkWrapper to="/profile" active={pathname === '/profile'}>
              Profile
            </LinkWrapper>
          )}
          {loggedIn && (
            <LinkWrapper to="/templates" active={pathname === '/templates'}>
              Templates
            </LinkWrapper>
          )}
          {loggedIn && (
            <li className="nav-item">
              <a href="/logout" className="nav-link">
                Log Out
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
