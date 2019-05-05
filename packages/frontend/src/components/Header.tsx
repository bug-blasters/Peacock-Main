import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

interface Props extends RouteComponentProps {
  openLoginSignupModal(): void;
}

const Header = ({ openLoginSignupModal }: Props) => {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link to="/" className="fw7 mr1 no-underline black">
          Hacker News
        </Link>
        <div
          onClick={openLoginSignupModal}
          className="ml1 no-underline black pointer"
        >
          new
        </div>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          submit
        </Link>
        <div className="ml1">|</div>
        <Link to="/profile" className="ml1 no-underline black">
          profile
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Header);
