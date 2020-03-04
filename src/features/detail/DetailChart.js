import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import HighCharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import './DetailChart.scss';

require('highcharts/indicators/pivot-points')(HighCharts);
require('highcharts/indicators/macd')(HighCharts);

const DetailChart = ({
  chartData = { data: [] },
  quote: { symbol } = { symbol: '' }
}) => {
  const chartWidth = 430;
  var chartOptions = useMemo(
    () => ({
      chart: {
        height: chartWidth
      },
      title: {
        text: `${symbol} Stock Chart`
      },
      rangeSelector: {
        selected: 1,
        inputEnabled: false
      },
      series: [
        {
          name: `${symbol} Stock Price`,
          data: formatChartData(chartData.data),
          type: 'candlestick',
          tooltip: {
            valueDecimals: 2
          }
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              chart: {
                height: chartWidth
              },
              navigator: {
                enabled: false
              }
            }
          }
        ]
      }
    }),
    [chartData.data, symbol]
  );

  return (
    <section className="detail-chart">
      <HighchartsReact
        highcharts={HighCharts}
        constructorType={'stockChart'}
        options={chartOptions}
      />
    </section>
  );

  function formatChartData(data) {
    return data.map(({ date, high, low, open, close }) => ({
      x: Date.parse(date),
      high,
      low,
      open,
      close
    }));
  }
};

DetailChart.propTypes = {
  chartData: PropTypes.shape({
    data: PropTypes.array.isRequired
  }),
  quote: PropTypes.shape({
    symbol: PropTypes.string.isRequired
  })
};

export default DetailChart;
