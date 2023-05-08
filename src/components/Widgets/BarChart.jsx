import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 18
  },
  plugins: {
    legend: {
      position: "bottom"
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
        size: 10
      }
    }
  }
};

const BarChart = ({ data, customOptions }) => {
  return <Bar options={customOptions || options} data={data} plugins={[ChartDataLabels]} />;
};

export default BarChart;
