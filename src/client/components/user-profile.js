import React from 'react';
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {location } = this.props;
    const userId = location.pathname.split('/')[2];
    const { fetchUserRequest } = this.props;

    fetchUserRequest(userId).then(() => {
      ;
    });
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <span>Email:</span> {email}
      </div>
    );
  }
}

export default UserProfile;
