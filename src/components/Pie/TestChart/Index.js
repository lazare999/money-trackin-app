import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const TestChart = ({ transactionsDates, transactionsAmounts }) => {
  
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    const maxAmount = Math.max(...transactionsAmounts);
    const gteIndex = transactionsAmounts.findIndex(amount => amount === maxAmount);

    console.log(gteIndex)
    const option = {
      title: {
        text: 'Distribution of Electricity',
        subtext: 'Fake Data'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: transactionsDates
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} $'
        },
        axisPointer: {
          snap: true
        }
      },
      visualMap: {
        show: false,
        dimension: 0,
        // max: maxAmount,
        inRange: {
          color: ['green', 'red'],
        },
        pieces: [
          // { gt: 0, lte: gteIndex - 1, color: 'green' },
          {lte: gteIndex -1, color: 'green'},
          { gte: gteIndex, lte: gteIndex , color: 'red' },
          { gt: gteIndex,  color: 'green' },
        ],
      },
      series: [
        {
          name: 'Amount',
          type: 'line',
          smooth: true,
          data: transactionsAmounts,
          lineStyle: {
            color: 'green',
          },
          markArea: {
            itemStyle: {
              color: 'rgba(255, 173, 177, 0.4)',
            },
            data: [
              [
                { name: 'Morning Peak', xAxis: '07:30' },
                { xAxis: '10:00' }
              ],
              [
                { name: 'Evening Peak', xAxis: '17:30' },
                { xAxis: '21:15' }
              ]
            ]
          }
        }
      ]
    };

    option && myChart.setOption(option);

    // Clean up when the component unmounts
    return () => {
      myChart.dispose();
    };
  }, [transactionsDates, transactionsAmounts]);
  console.log(transactionsAmounts)
  console.log(transactionsDates)

  return <div id="main" style={{ width: '100%', height: '500px' }} />;
};

export default TestChart;
