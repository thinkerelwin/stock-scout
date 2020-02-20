import React, { useState } from 'react';
import HighCharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import chartData from '../../utils/chart-data.json';

import './DetailChart.scss';

// require('highcharts/indicators/indicators')(HighCharts);
require('highcharts/indicators/pivot-points')(HighCharts);
require('highcharts/indicators/macd')(HighCharts);
// require('highcharts/modules/exporting')(HighCharts);
// require('highcharts/modules/map')(HighCharts);

const DetailChart = () => {
  const [chartOptions, setChartOptions] = useState(defaultChartOptions);
  return (
    <section className="detail-chart">
      <StockChart options={chartOptions} highcharts={HighCharts} />
    </section>
  );
};

const StockChart = ({ options, highcharts }) => (
  <HighchartsReact
    highcharts={highcharts}
    constructorType={'stockChart'}
    options={options}
  />
);

const defaultChartOptions = {
  chart: {
    height: 400
  },

  title: {
    text: `${'GOOG'} Stock Chart`
  },

  subtitle: {
    text:
      'Click small/large buttons or change window size to test responsiveness'
  },

  rangeSelector: {
    selected: 1
  },

  series: [
    {
      name: 'AAPL Stock Price',
      data: chartData,
      type: 'area',
      threshold: null,
      tooltip: {
        valueDecimals: 2
      },
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, HighCharts.getOptions().colors[0]],
          [
            1,
            HighCharts.color(HighCharts.getOptions().colors[0])
              .setOpacity(0)
              .get('rgba')
          ]
        ]
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
            height: 430
          },
          subtitle: {
            text: null
          },
          navigator: {
            enabled: false
          }
        }
      }
    ]
  }
};

export default DetailChart;
