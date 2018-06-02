import React from 'react';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <h1>Profile</h1>
        <div className="row justify-content-center user-profile">
          <div className="user-profile__username">{currentUser.get('username')}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentUser: state.storeUsers.currentUser };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
