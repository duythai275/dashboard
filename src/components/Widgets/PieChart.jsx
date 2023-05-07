import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
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

const PieChart = ({ data, options }) => {
  return (
    <Pie
      data={data}
      options={options}
      plugins={[ChartDataLabels, pieLabelsLine]}
    />
  );
};

export default PieChart;

const pieLabelsLine = {
  id: "pieLabelsLine",
  afterDraw(chart, args, options) {
    if (!options.display) return;
    const {
      ctx,
      chartArea: { width, height },
    } = chart;

    const cx = chart._metasets[0].data[0].x;
    const cy = chart._metasets[0].data[0].y;

    chart.data.datasets.forEach((dataset, i) => {
      chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
        const { x: a, y: b } = datapoint.tooltipPosition();

        const x = 2 * a - cx;
        const y = 2 * b - cy;

        // draw line
        const halfwidth = width / 2;
        const halfheight = height / 2;
        const xLine = x >= halfwidth ? x + 20 : x - 20;
        const yLine = y >= halfheight ? y + 20 : y - 20;

        const extraLine = x >= halfwidth ? 10 : -10;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.moveTo(x, y);
        ctx.lineTo(xLine, yLine);
        ctx.lineTo(xLine + extraLine, yLine);
        // ctx.strokeStyle = dataset.backgroundColor[index];
        ctx.strokeStyle = "black";
        ctx.stroke();

        // text
        const values = {
          text:
            typeof options.text === "function"
              ? options.text(chart, index)
              : options.text || "?",
          font: {
            size: options.font.size || 30,
            family: options.font.family || "Noto Sans Lao Looped",
            color: options.font.color || "black",
            style: options.font.style || "normal",
            unit: options.font.unit || "px",
          },
        };
        switch (values.font.unit) {
          case "em":
            values.font.size = options.font.size * 0.05;
            break;
          default:
            break;
        }
        ctx.font = `${values.font.style} ${values.font.size}${values.font.unit} ${values.font.family}`;
        // control the position
        const textXPosition = x >= halfwidth ? "left" : "right";
        const plusFivePx = x >= halfwidth ? 5 : -5;
        ctx.textAlign = textXPosition;
        ctx.textBaseline = "middle";
        // ctx.fillStyle = dataset.backgroundColor[index];
        ctx.fillStyle = "black";

        ctx.fillText(values.text, xLine + extraLine + plusFivePx, yLine);
      });
    });
  },
};
