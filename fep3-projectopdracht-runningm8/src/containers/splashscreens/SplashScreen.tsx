import React from 'react';

import {Link} from "react-router-dom";


function SplashScreen() {
  return (
      <Link to='/app/home' className='link' data-cy="splash-link">
          <h1>RunningM8</h1>
          <span className="ripple"/>
      </Link>
  );
}

export default SplashScreen;
