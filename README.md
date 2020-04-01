# stock-scout

![screen shot on news page](./readme_photo.png 'screen shot on news page')

An app provides stock market news and detail info of stocks, a simple screener with a sortable column header, using **Redux Toolkit** to simplify redux state management, testing with **Jest** and **React Testing Library**.

online demo: https://stock-scout.now.sh

p.s. Due to data usage limitation, numbers on the Screener page aren't real.

## User story

1. User can slide to see different recent news on the homepage if using mobile or pad device, or full layout on the desktop version
2. A news page to see recent news on various sections, clicking on the image or text will open a new window to reveal the full story
3. Loading icon or error message will be shown to let the user know the current state on data fetching

### on Screener page

4. User can click a different category to navigate to get a list of that section
5. User can click the column header to sort the stock list
6. User can click on the stock symbol to get detail information on that stock, including price charts, company profile, and recent news about this company

p.s. price charts will return 1d or 1m data, Depending on the day or week and time of day. Intraday per minute data is only returned during market hours.

## Installing

1. to run it locally, you will need [this node.js app](https://github.com/thinkerelwin/stock-scout-backend)
2. clone this project down
3. run command `npm i`
4. type `npm start` to run on development mode

## Running the tests

85%+ test coverage

- `npm run test` to run the test on watch mode
- `npm run test:coverage` to get a jest coverage report

## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
