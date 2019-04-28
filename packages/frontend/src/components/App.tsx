import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../styles/App.css';
import ActivityFeed from './ActivityFeed';
import CreateProject from './CreateProject';
import Header from './Header';
import LoginSignupForm from './LoginSignupForm';

const App: React.FunctionComponent = () => (
  <div>
    <Header />
    <div>
      <Switch>
        <Route exact path="/login" component={LoginSignupForm} />
        <Route exact path="/create" component={CreateProject} />
        <Route exact path="/" component={ActivityFeed} />
      </Switch>
    </div>
  </div>
);

export default App;
