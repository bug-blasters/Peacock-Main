import React from 'react';
import '../styles/App.css';
import ActivityFeed from './ActivityFeed';
import CreateProject from './CreateProject';
import LoginForm from './LoginForm';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/create" component={CreateProject} />
          <Route exact path="/" component={ActivityFeed} />
        </Switch>
      </div>
    </div>
  );
}
