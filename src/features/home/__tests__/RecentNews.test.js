// import React from 'react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from '../../../setupTests';

import App from '../../App';

import * as hookCollections from '../../../utils/customHooks';

const mockRecentNewsData = [
  {
    datetime: 1584190397000,
    headline:
      'The Week In Cannabis: Coronavirus Drop, Major Financing Agreements, Psychedelics Getting Hot',
    source: 'Benzinga Feeds',
    url:
      'https://cloud.iexapis.com/v1/news/article/48947dd3-05f3-4fb6-92ab-34fde48257c1',
    summary:
      "This was another brutal week for cannabis stocks, with all major ETFs posting double-digits losses. Over the last five trading days: The ETFMG Alternative Harvest ETF (NYSE: MJ ) lost 13.7%. The AdvisorShares Pure Cannabis ETF (NYSE: YOLO ) tumbled 17.4%. The Cannabis ETF (NYSE: THCX ) dropped 16.4%. The Amplify Seymour Cannabis ETF (NYSE: CNBS ) shed 17.8%. The SPDR S&P 500 ETF Trust (NYSE: SPY ) closed the period down 2.2%. “Certainly the Covid19 virus is affecting some cannabis companies, especially the vape producers who experienced supply chain interruptions from China,” said Debra Borchardt, CEO of Green Market Report. “However, if sales remain strong at dispensaries, this could be a big test for the claim that the cannabis industry is recession-proof. If that's the case, this becomes a strong argument to get back into select stocks.” If you want to get this news recap in your email inbox every week, please subscribe to https://tinyletter.com/javierhasse A long list of cannabis events have also been cancelled, postponed, or transitioned to a digital or online format.",
    related: 'SPY',
    image:
      'https://cloud.iexapis.com/v1/news/image/48947dd3-05f3-4fb6-92ab-34fde48257c1',
    lang: 'en',
    hasPaywall: false
  },
  {
    datetime: 1584122073000,
    headline: 'U.S. Stock ETFs Bounce After a Dismal Week',
    source: 'ETF Trends',
    url:
      'https://cloud.iexapis.com/v1/news/article/1096f1b5-63aa-4eab-841a-5fe9cf6e7d45',
    summary:
      'U.S. markets and stock ETFs jumped Friday, regaining some of the lost ground after a tumultuous week that marked one of the major indices’ worst experienced in history. On Friday, the Invesco QQQ Trust (NASDAQ: QQQ) increased 3.5%, SPDR Dow Jones Industrial Average ETF (NYSEArca: DIA) rose 3.9%, and SPDR S&P 500 ETF (NYSEArca: SPY) gained […] The post U.S. Stock ETFs Bounce After a Dismal Week appeared first on ETF Trends .',
    related: 'SPY',
    image:
      'https://cloud.iexapis.com/v1/news/image/1096f1b5-63aa-4eab-841a-5fe9cf6e7d45',
    lang: 'en',
    hasPaywall: false
  },
  {
    datetime: 1584113407000,
    headline: "After Worst Week Since 2008, What's Next For The Stock Market?",
    source: 'Benzinga',
    url:
      'https://cloud.iexapis.com/v1/news/article/b0572d77-5ac7-4ca4-b1b7-e1e0ba94c864',
    summary:
      "After one of its worst days in market history on Thursday, the SPDR S&P 500 ETF Trust (NYSE: SPY ) and the SPDR Dow Jones Industrial Average ETF (NYSE: DIA ) each opened higher by more than 6% on Friday, continuing the streak of extreme volatility in the stock market this week. Even with Friday's recovery, the Dow and S&P 500 are having their worst week since 2008. Periods of extreme volatility like these can be extremely difficult to predict and trade in the near-term, but they are not unprecedented in the market’s history. History Of Volatility Loup Ventures analyst Doug Clinton took a look at other periods of major market volatility over the years. Clinton noted the S&P 500 has closed up or down more than 3% on seven of the past 10 days, a phenomenon that has occurred only six other times. The past two times it happened coincided with the 2011 U.S. credit downgrade and the 2008 financial crisis. Clinton compiled the six previous … Full story available on Benzinga.com",
    related: 'SPY',
    image:
      'https://cloud.iexapis.com/v1/news/image/b0572d77-5ac7-4ca4-b1b7-e1e0ba94c864',
    lang: 'en',
    hasPaywall: false
  }
];

it.only('render slider correctly', async () => {
  jest.spyOn(hookCollections, 'useLocalStateFetching').mockReturnValue({
    isFetchingRecentNewsList: false,
    errorOnRecentNewsList: '',
    recentNewsList: mockRecentNewsData
  });

  const { findAllByText } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // react slick will return multiple same object for input
  const headlineText = await findAllByText(mockRecentNewsData[0].headline);
  expect(headlineText.length).toBeGreaterThan(1);
});
