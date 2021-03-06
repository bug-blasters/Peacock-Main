import * as React from 'react';
import ProjectList from './ProjectList';

import '../scss/ProjectTeaser.scss';

const ActivityFeed: React.FunctionComponent = () => (
  <div className="activity-feed">
    <ProjectList />
  </div>
);

export default ActivityFeed;
