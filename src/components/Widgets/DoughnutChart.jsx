import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: "bottom"
//     },
//     datalabels: {
//       anchor: "end",
//       align: "end",
//       offset: -5
//       // font: {
//       //   weight: 500
//       // }
//     }
//   }
// };

const DoughnutChart = ({ data, options }) => {
  return <Doughnut data={data} options={options}  plugins={[ChartDataLabels]} />;
};

export default DoughnutChart;
