import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { email } = this.props;

    ;
    console.log('users', this.props.users);

    return (
      <div>
        <span>Email:</span> {email}
      </div>
    );
  }
}

export default UserProfile;
