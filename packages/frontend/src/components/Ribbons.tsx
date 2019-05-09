import React from 'react';

const Ribbon = () => (
  <div className="ribbon">
    <div className="triangle" />
  </div>
);

const Ribbons = () => (
  <div className="ribbon-container">
    <Ribbon />
    <Ribbon />
    <Ribbon />
    <Ribbon />
  </div>
);

export default Ribbons;
