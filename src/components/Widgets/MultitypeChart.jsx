import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController, ChartDataLabels);
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

const MultitypeChart = ({ data, customOptions }) => {
  return <Chart options={customOptions ? customOptions : options} data={data} plugins={[ChartDataLabels]} />;
};

export default MultitypeChart;
