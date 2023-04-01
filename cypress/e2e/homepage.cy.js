/* eslint-disable */
import menuLink from '../../src/utils/constant/menuLink.json';
import { urlToRequest } from '../../src/api/IEXCloud';
import { mockRecentNewsData } from '../../src/mockData';

describe('homepage', () => {
  it('renders page correctly', () => {
    cy.visit('/');

    cy.findByText('Stock Scout').should('be.visible');

    menuLink.forEach(({ name }) => {
      cy.findByText(name).should('be.visible');
    });

    cy.findByText('Stock Scout - About').should('be.visible');
    cy.findByText('recent news').should('be.visible');
    cy.findByText('© Copyright 2020 by Elwin Huang.').should('be.visible');
  });

  describe('stubbing responses', () => {
    it('navigate to news source website when clicking on one of the photo shown on "Recent news" section', () => {
      cy.intercept(
        'GET',
        `${urlToRequest}/stock/spy/news/last/3`,
        mockRecentNewsData
      );

      cy.visit('/');

      cy.findByText(mockRecentNewsData[0].headline)
        .parent()
        .should('have.attr', 'href', mockRecentNewsData[0].url);
    });
  });
});
