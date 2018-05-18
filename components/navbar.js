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
    const { loggedIn, currentUser } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light row justify-content-center">
        {currentUser && (
          <div className="navbar-brand align-middle">
            <span className="email">{currentUser.get('email')}</span>
            {currentUser.isAdmin() && <span class="role badge badge-pull badge-dark ml-3">admin</span>}
          </div>
        )}
        <ul className="navbar-nav">
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
