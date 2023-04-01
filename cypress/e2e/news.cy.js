/* eslint-disable */
import { urlToRequest } from '../../src/api/IEXCloud';
import { mockNewsFeaturesData, mockNewsSectorsData } from '../../src/mockData';

const headlineOfFirstArticleOnNewsFeature =
  mockNewsFeaturesData.GOOG.news[0].headline;

const headlineOfFirstArticleOnNewsSectors =
  mockNewsSectorsData.XOM.news[0].headline;

const URLOfFirstArticleOnNewsFeature = mockNewsFeaturesData.GOOG.news[0].url;
const URLOfFirstArticleOnNewsSectors = mockNewsSectorsData.XOM.news[0].url;

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

      cy.intercept(
        'GET',
        `${urlToRequest}/stock/market/batch?symbols=goog,amzn,fb&types=news&last=1`,
        mockNewsFeaturesDataWithOutIdList
      );

      cy.intercept(
        'GET',
        `${urlToRequest}/stock/market/batch?symbols=XOM,CVX,TOT,BP,MSFT,INTC,TSM,CSCO,JNJ,UNH,NVS,MRK,BRK.B,V,JPM,BAC&types=news&last=1`,
        mockNewsSectorsDataWithOutIdList
      );
    });

    it('render news list correctly', () => {
      cy.visit('/news');

      cy.get('[data-testid="news-feature"]')
        .findByText(headlineOfFirstArticleOnNewsFeature)
        .should('be.visible');

      cy.findByText(headlineOfFirstArticleOnNewsSectors).should('be.visible');
    });

    it('have valid URL for user to check the detail of the news in "Recent news" section', () => {
      cy.visit('/news');

      cy.get('[data-testid="news-feature"]')
        .findByTitle(headlineOfFirstArticleOnNewsFeature)
        .should('have.attr', 'href', URLOfFirstArticleOnNewsFeature);

      cy.findByTitle(headlineOfFirstArticleOnNewsSectors).should(
        'have.attr',
        'href',
        URLOfFirstArticleOnNewsSectors
      );
    });
  });
});
