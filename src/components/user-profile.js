import React from 'react';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <span>Email:</span> {currentUser.email}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(state.storeUsers);
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
