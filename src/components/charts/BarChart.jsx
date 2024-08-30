import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import data from '../../views/rtl/default/variables/theme_volumes.json';
import { useSelector } from 'react-redux';

const BarChart = () => {
  const {theme} = useSelector(state => state.dashboard)
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Sub-Theme repo volume',
        data: []
      }
    ]
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded'
      },
    },
    colors: [
      '#00E396', '#FEB019', '#FF4560', '#775DD0', '#008FFB', 
      '#00E396', '#FEB019', '#FF4560', '#775DD0', '#008FFB'
    ],
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: []
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  });

  useEffect(() => {
    const processedData = processChartData(data);
    setChartData({
      series: [{
        name: 'Sub-Theme repo volume',
        data: processedData.map(item => item.sub_theme_repo_volume)
      }]
    });
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: processedData.map(item => item.sub_theme)
      }
    }));
  }, [theme]);

  const processChartData = (data) => {
    return data?.filter((item)=>item.theme === theme)?.map(item => ({
      sub_theme: item.sub_theme,
      sub_theme_repo_volume: item.sub_theme_repo_volume
    }));
  };

  return (
    <div id="chart">
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        width="100%"
        height="350"
      />
    </div>
  );
};

export default BarChart;
