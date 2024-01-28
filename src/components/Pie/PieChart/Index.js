import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import classes from './PieChart.module.css'

const PieChart = ({ expendedMoney, handleCategoryClick }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
  
    const option = {
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
          label: {
            show: true,
            formatter: '{b}: {c} ({d}%)',
          },
        },
      ],
    };

    chart.setOption(option);

    // Handle click events on the pie chart slices
    chart.on('click', (params) => {
      if (typeof handleCategoryClick === 'function') {
        const clickedValue = params.value;
        const category = Object.keys(expendedMoney).find(
          (key) => expendedMoney[key] === clickedValue
        );
        handleCategoryClick(category);
      }
    });

    return () => {
      chart.dispose(); // Clean up when the component unmounts
    };
  }, [expendedMoney, handleCategoryClick]);

  return <div ref={chartRef} className={classes.chartContainer} />;
};

export default PieChart;
