import React from 'react';

export default class FormTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <h1>Template</h1>
        <fieldset className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name" className="form-control" id="name"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="selector">Selector</label>
          <input name="selector" className="form-control" id="selector" />
        </fieldset>
        <button className="btn btn-primary">
          Add Template
        </button>
      </form>
    );
  }
}
