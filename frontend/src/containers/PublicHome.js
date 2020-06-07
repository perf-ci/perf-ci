import React from 'react';
import './PublicHome.css';

// eslint-disable-next-line require-jsdoc
export default function PublicHome(props) {
  // eslint-disable-next-line react/prop-types
  if (props.services.authenticationService.isAuthenticated) {
    // eslint-disable-next-line react/prop-types
    props.history.push('/dashboard');
  }

  return (
    <div className="Home">
      <div className="lander">
        <h1>PerfCI</h1>
        <p>A service to analyse your benchmarks</p>
      </div>
    </div>
  );
}
