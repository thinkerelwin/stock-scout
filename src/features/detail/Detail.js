import React from 'react';

import DetailBoard from './DetailBoard';
import DetailChart from './DetailChart';
import DetailProfile from './DetailProfile';
import DetailNews from './DetailNews';

import './Detail.scss';

const Detail = () => {
  return (
    <main className="detail menu-margin">
      <DetailBoard />
      <div className="theme-background">
        <DetailChart />
        <DetailProfile />
        <DetailNews />
      </div>
    </main>
  );
};

export default Detail;
