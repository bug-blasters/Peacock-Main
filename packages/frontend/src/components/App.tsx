import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ActivityFeed from './ActivityFeed';
import CreateProject from './CreateProject';
import Header from './Header';
import LoginSignupForm from './LoginSignupForm';
import ProfilePage from './ProfilePage';
import Modal from '@material-ui/core/Modal';

import '../scss/App.scss';

const App: React.FunctionComponent = () => {
  const [isLoginSignupModalOpen, setLoginSignupModalOpen] = useState(false);
  return (
    <div>
      <Header openLoginSignupModal={() => setLoginSignupModalOpen(true)} />
      <Modal
        className="modal"
        open={isLoginSignupModalOpen}
        onBackdropClick={() => setLoginSignupModalOpen(false)}
      >
        <LoginSignupForm />
      </Modal>
      <div>
        <Switch>
          <Route exact path="/" component={ActivityFeed} />
          <Route exact path="/login" component={LoginSignupForm} />
          <Route exact path="/create" component={CreateProject} />
          <Route exact path="/profile" component={ProfilePage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
