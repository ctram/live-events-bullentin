import React from 'react';

/* eslint-disable */
import { Link } from 'react-router-dom';
import WebsitesList from '../websites-list';
/* eslint-enable */

import { connect } from 'react-redux';
import actionsWebsites from '../../actions/websites';
import actionsModal from '../../actions/modal-data';

class Websites extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchWebsitesRequest();
  }

  render() {
    const { websites = [], modalShow, modalClose, deleteWebsiteRequest } = this.props;
    let domWebsites = <div className="text-center">No websites saved yet.</div>;

    if (websites.length > 0) {
      domWebsites = (
        <div>
          <hr />
          <WebsitesList
            websites={websites}
            modalShow={modalShow}
            modalClose={modalClose}
            handleDelete={deleteWebsiteRequest}
          />
        </div>
      );
    }

    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-9 col-md-8 col-lg-5">
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
    deleteWebsiteRequest: website => {
      dispatch(actionsWebsites.deleteWebsiteRequest(website));
    },
    modalShow: data => {
      dispatch(actionsModal.modalShow(data));
    },
    modalClose: () => {
      dispatch(actionsModal.modalClose());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Websites);
