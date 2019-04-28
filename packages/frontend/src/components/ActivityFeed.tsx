import * as React from 'react';
import '../styles/ProjectTeaser.css';
import ProjectList from './ProjectList';

const ActivityFeed: React.FunctionComponent = () => (
  <div className="activity-feed">
    <ProjectList />
  </div>
);

export default ActivityFeed;
