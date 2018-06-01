import React from 'react';

class FormUser extends React.Component {
  constructor(props) {
    super(props);
    this.pathname = props.location.pathname.substring(1);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.btnSubmitDisabled = this.btnSubmitDisabled.bind(this);
    this.toggleRole = this.toggleRole.bind(this);
    this.state = { username: '', password: '', role: 'standard' };
  }

  componentWillReceiveProps(nextProps) {
    this.pathname = nextProps.location.pathname.substring(1);
  }

  toggleRole(role) {
    this.setState({ role });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createUser, loginUser } = this.props;
    const { username, password, role } = this.state;
    this.pathname === 'register'
      ? createUser({ username, password, role })
      : loginUser({ username, password });
  }

  btnSubmitDisabled() {
    const { password, username } = this.state;
    return !password || !username;
  }

  render() {
    const labelSubmitBtn = this.pathname === 'register' ? 'Register' : 'Login';
    const btnRoleBaseClass = 'btn btn-secondary';
    const { role: activeRole } = this.state;
    const btnRoleStandardClass =
      activeRole === 'standard' ? btnRoleBaseClass + ' active' : btnRoleBaseClass;
    const btnRoleAdminClass =
      activeRole === 'admin' ? btnRoleBaseClass + ' active' : btnRoleBaseClass;

    return (
      <div className="row justify-content-center">
        <div className="col-2">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                className="form-control"
                id="username"
                ref="username"
                placeholder="Enter username"
                onChange={e => this.setState({ username: e.target.value })}
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

            {this.pathname === 'register' && (
              <div className="form-group">
                <label for="radio-role">User Role</label>
                <radiogroup id="radio-role" className="btn-group d-block">
                  <radio
                    className={`${btnRoleAdminClass}`}
                    selected={activeRole === 'admin'}
                    onClick={e => {
                      e.preventDefault();
                      this.toggleRole('admin');
                    }}
                    title="Admin user sees websites created by all users."
                    data-toggle="tooltip"
                  >
                    Admin
                  </radio>
                  <radio
                    className={`${btnRoleStandardClass}`}
                    selected={activeRole === 'standard'}
                    onClick={e => {
                      e.preventDefault();
                      this.toggleRole('standard');
                    }}
                    title="Standard user sees only websites created by themself."
                    data-toggle="tooltip"
                  >
                    Standard
                  </radio>
                </radiogroup>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
              disabled={this.btnSubmitDisabled()}
            >
              {labelSubmitBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormUser;
