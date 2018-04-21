import { connect } from 'react-redux';
import React from 'react';
import actionsUsers from '../actions/users';

// eslint-disable-next-line no-unused-vars
function UserItem({ user: { email, id }, deleteUserRequest }) {
  const onClick = () => {
    deleteUserRequest(id);
  };

  return (
    <li className="row justify-content-center">
      <span className="col-6">{email}</span>
      <span className="col-1" onClick={onClick}>
        <i className="fas fa-trash" />
      </span>
    </li>
  );
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
    let { users, deleteUserRequest } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <h1>Users</h1>
          <ul>
            {users.map((user, idx) => {
              return <UserItem user={user} key={idx} deleteUserRequest={deleteUserRequest} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(state.storeUsers);
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersRequest: () => {
      dispatch(actionsUsers.fetchUsersRequest());
    },
    deleteUserRequest: id => {
      dispatch(actionsUsers.deleteUserRequest(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
