import { urlToRequest } from '../../src/api/IEXCloud';
import { mockDetailData } from '../../src/__mocks__/mockData';

describe('screener page', () => {
  const targetURL = '/detail/AAL';

  it('renders page correctly', () => {
    cy.visit(targetURL);

    cy.contains('American Airlines Group, Inc.').should('be.visible');
    cy.findByText('AAL Stock Chart').should('be.visible');
    cy.findByText('Employees:').should('be.visible');
  });

  describe('stubbing responses', () => {
    beforeEach(() => {
      cy.server();

      cy.route(
        'GET',
        `${urlToRequest}/stock/AAL/batch?types=quote,logo,chart,company,news&last=3&range=dynamic`,
        mockDetailData
      );

      cy.visit(targetURL);
    });

    it('renders page correctly', () => {
      cy.findByText(mockDetailData.quote.primaryExchange).should('be.visible');
      cy.findByText(`${mockDetailData.quote.symbol} Stock Chart`).should(
        'be.visible'
      );
      cy.findByText(mockDetailData.news[0].headline).should('be.visible');
      cy.findByText(mockDetailData.company.description).should('be.visible');
    });

    it('navigate to news source website when clicking on one of the photo shown on "News" section', () => {
      cy.findByText(mockDetailData.news[0].headline)
        .parent()
        .then($a => {
          // extract the fully qualified href property
          const href = $a.prop('href');

          // make an http request for this resource
          // outside of the browser
          cy.request(href)
            // drill into the response body
            .its('body')
            // and assert that its contents have the <html> response
            .should('include', mockDetailData.news[0].headline)
            .and('include', '</html>');
        });
    });
  });
});
