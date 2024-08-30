import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import data from '../../views/rtl/default/variables/sub_trends.json';
import { useSelector } from 'react-redux';

const SingleLineChart = () => {
  const { subThemes } = useSelector((state) => state.dashboard);

  const [options, setOptions] = useState({
    chart: {
      type: 'line',
    },
    markers: {
      size: 4, // Set marker size to 4 to show dots on the line
    },
    stroke: {
      width: 4, // Set the width of the line
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const processedData = processChartData(data, subThemes);
    const allDates = Array.from(
      new Set(processedData.flatMap((item) => item.data.map((d) => d.date)))
    ).sort((a, b) => new Date(a) - new Date(b));

    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: allDates,
      },
    }));

    setSeries(
      processedData.map((item) => ({
        name: item.name,
        data: allDates.map((date) => {
          const dataPoint = item.data.find((d) => d.date === date);
          return dataPoint ? dataPoint.value : 0;
        }),
      }))
    );
  }, [subThemes]);

  const processChartData = (data, subThemes) => {
    const filteredData = data.filter((item) => subThemes.includes(item.sub_theme));
    const groupedData = {};

    filteredData.forEach((item) => {
      if (!groupedData[item.sub_theme]) {
        groupedData[item.sub_theme] = [];
      }
      groupedData[item.sub_theme].push({ date: item.date, value: item.value });
    });

    return Object.keys(groupedData).map((subTheme) => ({
      name: subTheme,
      data: groupedData[subTheme].sort((a, b) => new Date(a.date) - new Date(b.date)),
    }));
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default SingleLineChart;
