import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
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
      </div>
    </div>
  );
};

export default withRouter(Header);
