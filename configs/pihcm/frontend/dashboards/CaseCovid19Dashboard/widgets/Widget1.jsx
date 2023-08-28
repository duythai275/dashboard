import { memo, useState } from "react";
import _ from "lodash";

import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

const Widget1 = ({ setLoading, listOu }) => {
  const [data, setData] = useState(null);

  const fakeData = new Array(30).fill(0).map((empty, idx) => ({
    date: idx + 1 + "/10",
    value: listOu.map((e, idx) => {
      if (idx % _.random(1, 2) === 0) return 0;
      return _.random(1000);
    }),
  }));

  const barData = {
    labels: fakeData.map(({ date }) => date),
    datasets: listOu.map((ou, idx) => ({
      type: "bar",
      backgroundColor: southernRegionLegend[ou.id] || listLegend[idx],
      label: ou.displayName,
      data: fakeData.map(({ value }) => value[idx]),
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 18,
    },
    plugins: {
      // tooltip: {
      //   callbacks: {
      //     title: (context) => {
      //       return context[0].label.replaceAll(",", "");
      //     },
      //   },
      // },
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
          size: 12,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        // min: 0,
        // max: 100,
        stacked: true,
        // ticks: {
        //   callback: (value, index, ticks) => {
        //     return value + "%";
        //   },
        // },
      },
    },
  };

  return <BarChart customOptions={options} data={barData} />;
};

const southernRegionLegend = {
  LMQPg6RjAPD: "#F71E1E",
  qqllqxACBWH: "#096013",
  fksr6TpHXIR: "#CADBA5",
  VoUGvlbVR2O: "#016876",
  GW4vqzIxhGp: "#40B8E1",
  c12kRt4bf0w: "#6633B4",
  qIs2Lx8AdVH: "#F08BBE",
  FgWQNkngCGT: "#7780B7",
  MJry3jKDcTX: "#4C3E76",
  T9Jzo13fsNL: "#997CFB",
  tPtWRIVag27: "#961D6B",
  abRKE9Mo4Ja: "#1EEFC9",
  Stvy8tjuGQI: "#5DA13B",
  C59lnG4RyAo: "#2CF52B",
  Dfj4EbGbpmM: "#6D3918",
  ypSH8Fjp3SM: "#E96B22",
  mAaXd4pekeX: "#9E7D6A",
  u7KgJTphzX3: "#EBC204",
  MqY9Ba4f9gv: "#FA2E55",
  zm6dMtKxhjw: "#F6BB86",
};

const listLegend = [
  "#F71E1E",
  "#096013",
  "#CADBA5",
  "#016876",
  "#40B8E1",
  "#6633B4",
  "#F08BBE",
  "#7780B7",
  "#4C3E76",
  "#997CFB",
  "#961D6B",
  "#1EEFC9",
  "#5DA13B",
  "#2CF52B",
  "#6D3918",
  "#E96B22",
  "#9E7D6A",
  "#EBC204",
  "#FA2E55",
  "#F6BB86",
  "#90a4ae",
  "#4db6ac",
  "#00acc1",
  "#64ffda",
  "#f4ff81",
  "#ffff00",
];

export default withWidgetChildrenLoader(memo(Widget1));
