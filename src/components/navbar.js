import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsUsers from '../actions/users';

// eslint-disable-next-line no-unused-vars
function LinkWrapper({ active, to, children, show = true, onClick }) {
  active = active ? 'active' : '';
  const className = `nav-item ${active}`;

  if (show) {
    return (
      <li className={className}>
        <Link to={to} className="nav-link" onClick={onClick}>
          {children}
        </Link>
      </li>
    );
  }
  return null;
}

export class Navbar extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logoutUserRequest();
  }

  render() {
    const { loggedIn } = this.props;
    const { pathname } = window.reactRouterHistory.location;

    return (
      <nav className="navbar navbar-expand-sm navbar-light row justify-content-center">
        <ul className="navbar-nav">
          <LinkWrapper to="/" active={pathname === '/'}>
            Home
          </LinkWrapper>
          <LinkWrapper to="/register" active={pathname === '/register'} show={!loggedIn}>
            Register
          </LinkWrapper>
          <LinkWrapper to="/login" active={pathname === '/login'} show={!loggedIn}>
            Login
          </LinkWrapper>
          <LinkWrapper to="/users" active={pathname === '/users'} show={loggedIn}>
            Users
          </LinkWrapper>
          <LinkWrapper to="/profile" active={pathname === '/profile'} show={loggedIn}>
            Profile
          </LinkWrapper>
          <LinkWrapper to="/templates" active={pathname === '/templates'} show={loggedIn}>
            Templates
          </LinkWrapper>
          <LinkWrapper to="/" show={loggedIn} onClick={this.logout}>
            Log Out
          </LinkWrapper>
        </ul>
      </nav>
    );
  }
}

function mapToProps(state) {
  return Object.assign({}, state.storeUsers);
}

function dispatchToProps(dispatch) {
  return {
    logoutUserRequest: () => {
      dispatch(actionsUsers.logoutUserRequest());
    }
  };
}

export default connect(mapToProps, dispatchToProps)(Navbar);
