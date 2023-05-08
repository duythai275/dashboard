import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const { VITE_FONT } = import.meta.env;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  pointRadius: 4,
  plugins: {
    legend: {
      position: "bottom",
      labels: { usePointStyle: true }
    },
    datalabels: {
      anchor: "end",
      align: "end",
      offset: -5,
      font: {
        family: VITE_FONT,
        weight: 500
      }
    }
  }
};

const LineChart = ({ data, customOptions }) => {
  return <Line options={customOptions ? customOptions : options} data={data} plugins={[ChartDataLabels]} />;
};

export default LineChart;
