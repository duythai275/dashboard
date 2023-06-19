import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, getDatasetAtEvent, getElementAtEvent } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const { VITE_FONT } = import.meta.env;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  pointRadius: 4,
  layout: {
    padding: 18,
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: { usePointStyle: true },
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
        size: 10,
      },
    },
  },
};

const LineChart = ({ data, customOptions, handleClick }) => {
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
    <Line
      ref={chartRef}
      options={customOptions ? customOptions : options}
      data={data}
      plugins={[ChartDataLabels]}
      onClick={onClick}
    />
  );
};

export default LineChart;
