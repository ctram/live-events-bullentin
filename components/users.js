import { connect } from 'react-redux';
import React from 'react';
import actionsUsers from '../actions/users';
import actionsModalData from '../actions/modal-data';
// eslint-disable-next-line no-unused-vars
import UserItem from './user-item';
class Users extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { fetchUsersRequest } = this.props;
    fetchUsersRequest();
  }

  render() {
    let { users, deleteUserRequest, currentUser, modalClose, modalDeleteConfirmation } = this.props;
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-6">
            <h1>Users</h1>
            <ul>
              {users.map((user, idx) => {
                const isCurrentUser = user.id === currentUser.id;
                return (
                  <UserItem
                    user={user}
                    deletable={isCurrentUser || !user.isAdmin()}
                    key={idx}
                    deleteUserRequest={deleteUserRequest}
                    modalClose={modalClose}
                    modalDeleteConfirmation={modalDeleteConfirmation}
                  />
                );
              })}
            </ul>
          </div>
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
    deleteUserRequest: user => {
      dispatch(actionsUsers.deleteUserRequest(user));
    },
    modalClose: () => {
      dispatch(actionsModalData.modalClose());
    },
    modalDeleteConfirmation: data => {
      dispatch(actionsModalData.modalShow(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
