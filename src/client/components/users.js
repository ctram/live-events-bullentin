import React from 'react';

function UserItem({ user: email }) {
  
  return <li>{email}</li>;
}

export default class Users extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { fetchUsersRequest, fetchUsersSuccess } = this.props;
    fetchUsersRequest();
  }

  render() {
    let { users } = this.props;
    users = users || [];

    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map(user => {
            return <UserItem user={user} />;
          })}
        </ul>
      </div>
    );
  }
}
