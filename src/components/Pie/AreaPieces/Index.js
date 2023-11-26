import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const AreaPieces = ({ transactionsData }) => {
  
  useEffect(() => {
    if (!transactionsData || transactionsData.length === 0) {
        return;
    }

    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

console.log(transactionsData)

    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%'],
      },
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [
          {
            gt: 1,
            lt: 3,
            color: 'rgba(0, 0, 180, 0.4)',
          },
          {
            gt: 5,
            lt: 7,
            color: 'rgba(0, 0, 180, 0.4)',
          },
        ],
      },
      series: [
        {
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          lineStyle: {
            color: '#5470C6',
            width: 5,
          },
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
            data: [{ xAxis: 0 }, { xAxis: 1 }, { xAxis: 2 }, { xAxis: 3 }],
          },
          areaStyle: {},
          data: transactionsData,
        //   data: [
        //     ['2019-10-10', 200],
        //     ['2019-10-11', 560],
        //     ['2019-10-12', 750],
        //     ['2019-10-13', 580],
        //     ['2019-10-14', 250],
        //     ['2019-10-15', 300],
        //     ['2019-10-16', 450],
        //     ['2019-10-17', 300],
        //     ['2019-10-18', 100],
        //   ],
        },
      ],
    };

    myChart.setOption(option);

    // Cleanup when component is unmounted
    return () => {
      myChart.dispose();
    };
  }, [transactionsData]); // Empty dependency array ensures the effect runs only once

  return <div id="main" style={{ width: '100%', height: '400px' }}></div>;
};

export default AreaPieces;
