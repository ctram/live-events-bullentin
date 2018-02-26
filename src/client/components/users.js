import React from 'react';

function UserItem({ user: { email } }) {
  return <li>{email}</li>;
}

export default class Users extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { fetchUsersRequest } = this.props;
    fetchUsersRequest();
  }

  render() {
    let { users } = this.props;
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map((user, idx) => {
            return <UserItem user={user} key={idx} />;
          })}
        </ul>
      </div>
    );
  }
}
