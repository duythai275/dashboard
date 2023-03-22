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

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);
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
      offset: -5
      // font: {
      //   weight: 500
      // }
    }
  }
};

const MultitypeChart = ({ data }) => {
  return <Chart options={options} data={data} plugins={[ChartDataLabels]} />;
};

export default MultitypeChart;
