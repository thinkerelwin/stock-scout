/* eslint-disable */
import { urlToRequest } from '../../src/api/IEXCloud';
import {
  mockCategories,
  mockScreenerList,
  mockTopLosersScreenerList,
  mockDetailData,
  mockSortedScreenerList,
  mockSortedScreenerListWithCharacter,
} from '../../src/mockData';

describe('screener page', () => {
  it('renders page correctly', () => {
    cy.visit('/');

    cy.findByText('Screener').click();

    cy.findByText('Most Active').should('be.visible');
  });

  describe('stubbing responses', () => {
    beforeEach(() => {
      cy.server();

      cy.route('GET', `${urlToRequest}/ref-data/sectors`, mockCategories);

      cy.route(
        'GET',
        `${urlToRequest}/stock/market/collection/list?collectionName=mostactive`,
        mockScreenerList
      );

      cy.visit('/screener/Most Active');
    });

    it('render screener categories correctly', () => {
      cy.findByText(mockCategories[1].name).should('be.visible');
    });

    it('render screener table correctly', () => {
      cy.findByText(mockScreenerList[3].symbol).should('be.visible');
    });

    it('change displaying list when clicking on another tab in categories list', () => {
      cy.route(
        'GET',
        `${urlToRequest}/stock/market/collection/list?collectionName=losers`,
        mockTopLosersScreenerList
      );

      cy.findByText('Top Losers').click();

      cy.findByText(mockTopLosersScreenerList[0].symbol).should('be.visible');
    });

    it('navigate to detail page when clicking on the symbol of a company in the ScreenerTable', () => {
      cy.route(
        'GET',
        `${urlToRequest}/stock/MFA/batch?types=quote,logo,chart,company,news&last=3&range=dynamic`,
        mockDetailData
      );

      cy.findByText(mockScreenerList[0].symbol).click();

      cy.findByText(mockDetailData.quote.primaryExchange).should('be.visible');
      cy.findByText(`${mockDetailData.quote.symbol} Stock Chart`).should(
        'be.visible'
      );
      cy.findByText(mockDetailData.news[0].headline).should('be.visible');
      cy.findByText(mockDetailData.company.description).should('be.visible');
    });

    it('sort correctly with number when clicking on the correspond column header', () => {
      const resultSortedScreenerList = mockSortedScreenerList.map(
        ({ change }) => change.toString()
      );

      cy.findByTitle('CHG').click();

      cy.findAllByTestId('sortOnNumber').then((cell) => {
        const sortedList = [...cell.map((elment) => cell[elment].textContent)];

        expect(sortedList, 'sortedList').to.deep.equal(
          resultSortedScreenerList
        );
      });

      cy.findByTitle('CHG').click();

      cy.findAllByTestId('sortOnNumber').then((cell) => {
        const sortedList = [...cell.map((elment) => cell[elment].textContent)];

        expect(sortedList, 'sortedList').to.deep.equal(
          resultSortedScreenerList.reverse()
        );
      });
    });

    it('sort correctly with characters when clicking on the correspond column header', () => {
      const resultSortedScreenerList = mockSortedScreenerListWithCharacter.map(
        ({ symbol }) => symbol
      );

      cy.findByTitle('Description').click();

      cy.findAllByTestId('sortOnCharacter').then((cell) => {
        const sortedList = [...cell.map((elment) => cell[elment].textContent)];

        expect(sortedList, 'sortedList').to.deep.equal(
          resultSortedScreenerList
        );
      });

      cy.findByTitle('Description').click();

      cy.findAllByTestId('sortOnCharacter').then((cell) => {
        const sortedList = [...cell.map((elment) => cell[elment].textContent)];

        expect(sortedList, 'sortedList').to.deep.equal(
          resultSortedScreenerList.reverse()
        );
      });
    });
  });
});
