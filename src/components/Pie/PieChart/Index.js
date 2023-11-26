import React, { useEffect, useRef } from 'react';

import * as echarts from 'echarts';

const PieChart = ({ expendedMoney }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      const chart = echarts.init(chartRef.current);
  
      const option = {
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center',
        // },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            fontSize: '19px',
          },
        },
        series: [
          {
            name: 'Expoens category:',
            type: 'pie',
            radius: '50%',
            data: [
              { value: expendedMoney.shoping, name: 'Shopping' },
              { value: expendedMoney.fun, name: 'Fun' },
              { value: expendedMoney.cash_out, name: 'Cash Out' },
              { value: expendedMoney.other, name: 'Other' },
              { value: expendedMoney.tax, name: 'Tax' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
  
      chart.setOption(option);
  
      return () => {
        chart.dispose(); // Clean up when the component unmounts
      };
    }, [expendedMoney]);
  
    return <div ref={chartRef} style={{ width: '70%', height: '800px' }} />;
  };

export default PieChart;