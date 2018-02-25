import React from 'react';
import appFetch from '../helpers/app-fetch';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // appFetch
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
