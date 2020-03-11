import React from 'react';

import NewsFeatures from './NewsFeatures';
import NewsSectors from './NewsSectors';

const News = () => {
  return (
    <main className="news menu-margin" data-testid="location-News">
      <NewsFeatures />
      <NewsSectors />
    </main>
  );
};

export default News;
