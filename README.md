# stock-scout[*not working anymore, the backend API is no longer free and charges a sizable amount to use it*]

![screen shot on news page](./readme_photo.png 'screen shot on news page')
![screen shot on E2E coverage report](./E2E_coverage.png 'screen shot on E2E coverage report')

An app provides stock market news and detailed info on stocks, a simple screener with a sortable column header, using **Redux Toolkit** to simplify redux state management, testing with **Jest** and **React Testing Library**.

online demo: https://stock-scout.vercel.app

p.s. Due to data usage limitations, the numbers on the Screener page aren't real.

## User story

1. The user can slide to see different recent news on the homepage if using a mobile or PAD device, or the full layout on the desktop version
2. A news page to see recent news on various sections, clicking on the image or text will open a new window to reveal the full story
3. A Loading icon or error message will be shown to let the user know the current state of data fetching

### on the Screener page

4. The user can click a different category to navigate to get a list of that section
5. The user can click the column header to sort the stock list
6. The user can click on the stock symbol to get detailed information on that stock, including price charts, company profile, and recent news about this company

P.S. Price charts will return 1d or 1m data, Depending on the day or week and time of day. Intraday per-minute data is only returned during market hours.

## Installing

1. to run it locally, you will need [this node.js app](https://github.com/thinkerelwin/stock-scout-backend)
2. clone this project down
3. run command `npm i`
4. type `npm start` to run on development mode

## Running the tests

85%+ test coverage on unit, integration test.
90%+ on E2E test coverage.

- `npm run test` to run the test on watch mode
- `npm run test:coverage` to get a jest coverage report

E2E

- `npx nyc instrument --compact=false src instrumented` To instrument the application code
- `npm run cypress` to generate info required for coverage report
- `npm run cypress-report` to get a summary of the coverage report

the full report html will be located in /coverage/Icov-report/index.html

## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
