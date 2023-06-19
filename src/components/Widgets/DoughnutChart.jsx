import React, { useRef } from "react";
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
import {
  Doughnut,
  getDatasetAtEvent,
  getElementAtEvent,
} from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const { VITE_FONT } = import.meta.env;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DoughnutChart = ({ data, customOptions, handleClick }) => {
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
    <Doughnut
      ref={chartRef}
      onClick={onClick}
      data={data}
      options={customOptions ? customOptions : options}
      plugins={[ChartDataLabels, labelCenter]}
    />
  );
};

export default DoughnutChart;

const labelCenter = {
  id: "labelCenter",
  beforeDraw: (chart, args, options) => {
    if (!options.display) return;
    if (!Array.isArray(options.labels)) {
      return console.error('"options.lables" must be array', options.lables);
    }

    const {
      ctx,
      chartArea: { width, height, top },
    } = chart;
    const context = ctx.canvas.getContext("2d");
    context.save();

    const labels = options.labels.slice();
    const totalFontSize = labels.reduce((x, y, index) => {
      let prevSize = x[index - 1] || 0;
      x.push(prevSize + y.font.size);
      return x;
    }, []);
    labels.forEach((label, index) => {
      let textPosition = totalFontSize[index] - label.font.size;
      const values = {
        text:
          typeof label.text === "function"
            ? label.text(chart)
            : label.text || "?",
        font: {
          size: 20,
          family: VITE_FONT,
          color: label.font.color || "black",
          style: label.font.style || "normal",
          unit: label.font.unit || "px",
        },
      };
      switch (values.font.unit) {
        case "em":
          values.font.size = label.font.size * 0.05;
          textPosition *= 0.8;
          break;
        default:
          break;
      }

      context.font = `${values.font.style} ${values.font.size}${values.font.unit} ${values.font.family}`;
      context.textAlign = "center";
      context.fillStyle = values.font.color;
      context.fillText(
        values.text,
        width / 2,
        height + textPosition + top - 10
      );
    });
    context.restore();
  },
};
