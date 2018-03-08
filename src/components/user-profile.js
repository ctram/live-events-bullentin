import React from 'react';
import { connect } from 'react-redux';
import User from '../models/user';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <span>Email:</span> {currentUser.get('email')}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let currentUser = new User(state.storeUsers.currentUser);
  return { currentUser };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
