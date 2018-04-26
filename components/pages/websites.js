import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsWebsites from '../../actions/websites';

export class WebsitesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { websites } = this.props;

    return (
      <section>
        <h1>Websites</h1>
        <ul>
          {websites.map((website, idx) => {
            return (
              <li key={idx} className="row">
                <Link to={`/websites/${website.id}`} className="col-6">
                  {website.get('name')}
                </Link>
                <div className="col-1 offset-3">
                  <span
                    onClick={e => {
                      e.preventDefault();
                      this.props.onClickRemove(website.id);
                    }}
                  >
                    <i className="fas fa-trash" />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export class Websites extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchWebsitesRequest();
  }

  render() {
    const { websites = [] } = this.props;

    let domWebsites = <div className="text-center">No websites saved yet.</div>;

    if (websites.length > 0) {
      domWebsites = (
        <div>
          <hr />
          <WebsitesList websites={websites} onClickRemove={this.props.deleteWebsiteRequest} />
        </div>
      );
    }

    return (
      <div className="row justify-content-center">
        <div className="col-4">
          <Link to="/websites/new">
            <div className="row justify-content-center">
              <button className="btn btn-primary">Add Website</button>
            </div>
          </Link>
          <div className="websites">{domWebsites}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign({}, state.storeWebsites, state.storeUsers);
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWebsitesRequest: () => {
      dispatch(actionsWebsites.fetchWebsitesRequest());
    },
    deleteWebsiteRequest: id => {
      dispatch(actionsWebsites.deleteWebsiteRequest(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Websites);
