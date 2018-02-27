import { connect } from 'react-redux';
import React from 'react';
import actionsUsers from '../actions/users';

function UserItem({ user: { email } }) {
  return <li>{email}</li>;
}

export class Users extends React.Component {
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

const mapStateToProps = state => {
  return Object.assign(state.users);
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersRequest: () => {
      dispatch(actionsUsers.fetchUsersRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);