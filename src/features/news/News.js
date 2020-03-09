import React from 'react';

import NewsFeatures from './NewsFeatures';
import NewsSectors from './NewsSectors';

const News = () => {
  return (
    <main className="news menu-margin">
      <NewsFeatures />
      <NewsSectors />
    </main>
  );
};

export default News;
