import React from 'react';

export default class Users extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { fetchUsersRequest, fetchUsersSuccess } = this.props;

    fetchUsersRequest.then(data => {
      fetchUsersSuccess(data.users);
    });
  }
}
