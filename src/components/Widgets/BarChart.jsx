import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
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
        size: 10,
      },
    },
  },
};

const BarChart = ({ data, customOptions }) => {
  return (
    <Bar
      options={customOptions || options}
      data={data}
      plugins={[ChartDataLabels, lineAt]}
    />
  );
};

export default BarChart;

const lineAt = {
  id: "lineAt",
  afterDraw: function (chart, arg, options) {
    if (!options.lineAt) return;
    let lineAt = options.lineAt;
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;
    ctx.lineWidth = options.thickness || 1;
    ctx.strokeStyle = options.color || "black";
    ctx.beginPath();
    lineAt = y.getPixelForValue(lineAt);
    ctx.moveTo(left, lineAt);
    ctx.lineTo(right, lineAt);
    ctx.stroke();
  },
};
