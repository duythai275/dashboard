import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const { VITE_FONT } = import.meta.env;
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom"
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

const BarChart = ({ data }) => {
  return <Bar options={options} data={data} plugins={[ChartDataLabels]} redraw={true} />;
};

export default BarChart;
