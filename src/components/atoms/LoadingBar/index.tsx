'use client';

import React from 'react';
import { BarLoader } from 'react-spinners';

const LoadingBar = () => {
  return (
    <div className=" w-full fixed top-0 left-0 z-50">
      <BarLoader color="#2BAFBD" cssOverride={{ width: '100%' }} />
    </div>
  );
};

export default LoadingBar;
