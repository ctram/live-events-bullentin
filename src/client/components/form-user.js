import React from 'react';

class FormUser extends React.Component {
  constructor(props) {
    super(props);
    this.pathname = props.location.pathname.substring(1);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.btnSubmitDisabled = this.btnSubmitDisabled.bind(this);
    this.state = { email: '', password: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createUser, loginUser } = this.props;
    const { email, password } = this.state;
    // const { email, password } = this.refs;
    const data = { email, password };
    this.pathname === 'register' ? createUser(data) : loginUser(data);
  }

  btnSubmitDisabled() {
    const { password, email } = this.state;
    return !password || !email;
  }

  render() {
    const labelSubmitBtn = this.pathname === 'register' ? 'Register' : 'Submit';
    return (
      <form>
        {this.pathname}
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            ref="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={e => this.setState({ email: e.target.value })}
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
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit}
          disabled={this.btnSubmitDisabled()}
        >
          {labelSubmitBtn}
        </button>
      </form>
    );
  }
}

export default FormUser;
