import React from 'react';
import { Link } from 'react-router-dom';

export default function Templates() {
  return (
    <div>
      <h1>Templates</h1>
      <section>
        <Link to="/templates/new">
          <button className="btn btn-primary">Add Template</button>
        </Link>
      </section>
      <hr />
    </div>
  );
}
