import React from 'react';

import DetailBoard from './DetailBoard';
import DetailChart from './DetailChart';
import DetailProfile from './DetailProfile';

import './Detail.scss';

const Detail = () => {
  return (
    <main className="detail menu-margin">
      <DetailBoard />
      <DetailChart />
      <DetailProfile />
      <section className="detail-news"></section>
    </main>
  );
};

export default Detail;
