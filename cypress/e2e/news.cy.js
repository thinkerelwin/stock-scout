/* eslint-disable */
import { urlToRequest } from '../../src/api/IEXCloud';
import { mockNewsFeaturesData, mockNewsSectorsData } from '../../src/mockData';

const headlineOfFirstArticleOnNewsFeature =
  mockNewsFeaturesData.GOOG.news[0].headline;

const headlineOfFirstArticleOnNewsSectors =
  mockNewsSectorsData.XOM.news[0].headline;

const headlinesForTest = [
  headlineOfFirstArticleOnNewsFeature,
  headlineOfFirstArticleOnNewsSectors,
];

describe('news page', () => {
  it('renders page correctly', () => {
    cy.visit('/');

    cy.findByText('News').click();

    cy.findByText('energy').should('be.visible');
  });

  describe('stubbing responses', () => {
    beforeEach(() => {
      let mockNewsFeaturesDataWithOutIdList = { ...mockNewsFeaturesData };
      delete mockNewsFeaturesDataWithOutIdList.idList;

      let mockNewsSectorsDataWithOutIdList = { ...mockNewsSectorsData };
      delete mockNewsSectorsDataWithOutIdList.idList;

      cy.server();

      cy.route(
        'GET',
        `${urlToRequest}/stock/market/batch?symbols=goog,amzn,fb&types=news&last=1`,
        mockNewsFeaturesDataWithOutIdList
      );

      cy.route(
        'GET',
        `${urlToRequest}/stock/market/batch?symbols=XOM,CVX,TOT,BP,MSFT,INTC,TSM,CSCO,JNJ,UNH,NVS,MRK,BRK.B,V,JPM,BAC&types=news&last=1`,
        mockNewsSectorsDataWithOutIdList
      );

      cy.visit('/news');
    });

    it('render news list correctly', () => {
      headlinesForTest.forEach((headline) => {
        cy.findByText(headline).should('be.visible');
      });
    });

    it('navigate to news source website when clicking on one of the photo shown on "Recent news" section', () => {
      headlinesForTest.forEach((headline) => {
        cy.findByTitle(headline).then(($a) => {
          // extract the fully qualified href property
          const href = $a.prop('href');
          // make an http request for this resource
          // outside of the browser
          cy.request(href)
            // drill into the response body
            .its('body')
            // and assert that its contents have the <html> response
            .should('include', headline)
            .and('include', '</html>');
        });
      });
    });
  });
});
