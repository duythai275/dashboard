import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getDatasetAtEvent, getElementAtEvent } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 18,
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      anchor: "end",
      align: "end",
      offset: -5,
      color: "#fff",
      borderColor: "#000",
      textStrokeColor: "black", // <-- added this
      textStrokeWidth: 3, // <-- added this,
      font: {
        size: 12,
      },
    },
  },
};

const HorizontalBarChart = ({ data, customOptions, handleClick }) => {
  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return null;

    const datasetIndex = dataset[0].datasetIndex;

    return data.datasets[datasetIndex].label;
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return null;

    const { datasetIndex, index } = element[0];

    return {
      label: data.labels[index],
      value: data.datasets[datasetIndex].data[index],
      datasetIndex,
      index,
    };
  };

  const chartRef = useRef(null);

  const onClick = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }

    const dataSetLabel = printDatasetAtEvent(getDatasetAtEvent(chart, event));
    const dataValue = printElementAtEvent(getElementAtEvent(chart, event));
    dataSetLabel &&
      dataValue &&
      handleClick &&
      handleClick({ ...dataValue, dataSetLabel });
  };
  return (
    <Bar
      ref={chartRef}
      onClick={onClick}
      options={customOptions ? customOptions : options}
      data={data}
      plugins={[ChartDataLabels]}
    />
  );
};

export default HorizontalBarChart;
