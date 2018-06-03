import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsUsers from '../actions/users';

// eslint-disable-next-line no-unused-vars
function LinkWrapper({ to, children, onClick, type = 'navlink' }) {
  // eslint-disable-next-line no-unused-vars
  const DomLink = type === 'navlink' ? NavLink : Link;

  return (
    <li>
      <DomLink to={to} className="nav-link nav-item" onClick={onClick}>
        {children}
      </DomLink>
    </li>
  );
}

class Navbar extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logoutUserRequest();
  }

  render() {
    const { loggedIn, currentUser } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-lg-center">
        <div className="navbar-brand ml-5">Live Events Bulletin</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse ml-lg-1" id="navbarSupportedContent">
          {currentUser && (
            <div className="mr-lg-3 text-right">
              <span className="username">{currentUser.get('username')}</span>
              {currentUser.isAdmin() && (
                <span className="role badge badge-pull badge-dark ml-1">admin</span>
              )}
            </div>
          )}
          <ul className="navbar-nav text-right">
            {!loggedIn && <LinkWrapper to="/register">Register</LinkWrapper>}

            {!loggedIn && <LinkWrapper to="/login">Login</LinkWrapper>}

            {loggedIn && currentUser.isAdmin() && <LinkWrapper to="/users">Users</LinkWrapper>}

            {loggedIn && <LinkWrapper to="/profile">Profile</LinkWrapper>}

            {loggedIn && <LinkWrapper to="/websites">Websites</LinkWrapper>}

            {loggedIn && (
              <LinkWrapper to="/" onClick={this.logout} type="link">
                Log Out
              </LinkWrapper>
            )}
          </ul>
        </div>
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
