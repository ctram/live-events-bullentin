import React from 'react';

class FormUser extends React.Component {
  constructor(props) {
    
    super(props);
    this.pathname = props.location.pathname.substring(1);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const { createUser, loginUser } = this.props;
    const { email, password } = this.refs;
    const data = { email: email.value, password: password.value };
    this.pathname === 'register' ? createUser(data) : loginUser(data);
  }

  render() {
    const labelSubmitBtn = this.pathname === 'register' ? 'Register' : 'Submit';

    return (
      <form>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            ref="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            ref="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
          {labelSubmitBtn}
        </button>
      </form>
    );
  }
}

export default FormUser;
