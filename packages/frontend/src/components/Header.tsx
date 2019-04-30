import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link to="/" className="fw7 mr1 no-underline black">
          Hacker News
        </Link>
        <Link to="/login" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          submit
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Header);