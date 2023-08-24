import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import _ from "lodash";
import { shallow } from "zustand/shallow";

const Widget1 = ({ setLoading }) => {
  const southernRegion = useMetadataStore(
    (state) => state.orgUnitsHfmd,
    shallow
  );

  const fakeData = new Array(30).fill(0).map((empty, idx) => ({
    date: idx + 1 + "/10",
    value: southernRegion.map((e, idx) => {
      if (idx % _.random(1, 2) === 0) return 0;
      return _.random(1000);
    }),
  }));

  const barData = {
    labels: fakeData.map(({ date }) => date),
    datasets: southernRegion.map((ou, idx) => ({
      type: "bar",
      backgroundColor: southernRegionLegend[ou.id],
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

const temp = [
  { id: "qqllqxACBWH", displayName: "Tỉnh An Giang" },
  { id: "VoUGvlbVR2O", displayName: "Tỉnh Bình Dương" },
  { id: "c12kRt4bf0w", displayName: "Tỉnh Bạc Liêu" },
  { id: "ypSH8Fjp3SM", displayName: "Tỉnh Trà Vinh" },
  { id: "MqY9Ba4f9gv", displayName: "Tỉnh Đồng Nai" },
  { id: "LMQPg6RjAPD", displayName: "Thành phố Hồ Chí Minh" },
  { id: "qIs2Lx8AdVH", displayName: "Tỉnh Bến Tre" },
  { id: "FgWQNkngCGT", displayName: "Tỉnh Cà Mau" },
  { id: "u7KgJTphzX3", displayName: "Tỉnh Vĩnh Long" },
  { id: "tPtWRIVag27", displayName: "Tỉnh Kiên Giang" },
  { id: "MJry3jKDcTX", displayName: "Thành phố Cần Thơ" },
  { id: "abRKE9Mo4Ja", displayName: "Tỉnh Long An" },
  { id: "Dfj4EbGbpmM", displayName: "Tỉnh Tiền Giang" },
  { id: "zm6dMtKxhjw", displayName: "Tỉnh Đồng Tháp" },
  { id: "fksr6TpHXIR", displayName: "Tỉnh Bà Rịa - Vũng Tàu" },
  { id: "C59lnG4RyAo", displayName: "Tỉnh Sóc Trăng" },
  { id: "mAaXd4pekeX", displayName: "Tỉnh Tây Ninh" },
  { id: "GW4vqzIxhGp", displayName: "Tỉnh Bình Phước" },
  { id: "T9Jzo13fsNL", displayName: "Tỉnh Hậu Giang" },
  { id: "Stvy8tjuGQI", displayName: "Tỉnh Lâm Đồng" },
];

export default withWidgetChildrenLoader(Widget1);
