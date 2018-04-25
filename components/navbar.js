import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsUsers from '../actions/users';

// eslint-disable-next-line no-unused-vars
function LinkWrapper({ active, to, children, onClick }) {
  active = active ? 'active' : '';
  const className = `nav-item ${active}`;

  return (
    <li className={className}>
      <Link to={to} className="nav-link" onClick={onClick}>
        {children}
      </Link>
    </li>
  );
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
    const { loggedIn, currentUser, pathname } = this.props;

    return (
      <nav className="navbar navbar-dark bg-primary collapse navbar-collapse navbar-expand-sm row justify-content-center">
        {currentUser && <span className="navbar-brand">{currentUser.get('email')}</span>}
        <ul className="navbar-nav">
          <LinkWrapper to="/" active={pathname === '/'}>
            Home
          </LinkWrapper>

          {!loggedIn && (
            <LinkWrapper to="/register" active={pathname === '/register'}>
              Register
            </LinkWrapper>
          )}

          {!loggedIn && (
            <LinkWrapper to="/login" active={pathname === '/login'}>
              Login
            </LinkWrapper>
          )}

          {loggedIn &&
            currentUser.isAdmin && (
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
            <LinkWrapper to="/websites" active={pathname === '/websites'}>
              Websites
            </LinkWrapper>
          )}

          {loggedIn && (
            <LinkWrapper to="/" onClick={this.logout}>
              Log Out
            </LinkWrapper>
          )}
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
