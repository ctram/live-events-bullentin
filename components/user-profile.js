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
        <div className="row justify-content-center">
          <div className="col-3">
            <div><span>Username:</span> {currentUser.get('username')}</div>
            <div><span>Websites Added:</span> {currentUser.get('num_websites_owned')}</div>
          </div>
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
