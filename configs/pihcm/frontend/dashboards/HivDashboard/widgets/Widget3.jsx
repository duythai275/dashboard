import BarChart from "@/components/Widgets/BarChart";
import { customOptions, regionLabels } from "../constants";

const Widget3 = () => {
  const data = {
    labels: regionLabels,
    datasets: [
      {
        label: `ARV mới`,
        data: regionLabels.map(() => (Math.random(0, 1) * 4000).toFixed() * 1),
        backgroundColor: "#4caf50",
      },
      {
        label: `Điều trị lại`,
        data: regionLabels.map(() => (Math.random(0, 1) * 4000).toFixed() * 1),
        backgroundColor: "#2196f3",
      },
      {
        label: `Chuyển tới`,
        data: regionLabels.map(() => (Math.random(0, 1) * 4000).toFixed() * 1),
        backgroundColor: "#ff9800",
      },
      {
        label: `Chuyển đi`,
        data: regionLabels.map(() => (Math.random(0, 1) * 4000).toFixed() * -1),
        backgroundColor: "#ffca28",
        datalabels: {
          anchor: "start",
          align: "start",
        },
      },
      {
        label: `Bỏ trị`,
        data: regionLabels.map(() => (Math.random(0, 1) * 4000).toFixed() * -1),
        backgroundColor: "#40c4ff",
        datalabels: {
          anchor: "start",
          align: "start",
        },
      },
      {
        label: `Tử vong`,
        data: regionLabels.map(() => (Math.random(0, 1) * 4000).toFixed() * -1),
        backgroundColor: "#00e676",
        datalabels: {
          anchor: "start",
          align: "start",
        },
      },
    ],
  };

  return <BarChart data={data} customOptions={customOptions} />;
};

export default Widget3;
