import BarChart from "@/components/Widgets/BarChart";
import { customOptions, regionLabels } from "../constants";
import { getElementAtEvent } from "react-chartjs-2";
import { useRef } from "react";
import { Box } from "@mui/material";
import { ModalBarChart } from "../components";

const Widget1 = () => {
  const chartRef = useRef();

  const month = 12;
  const year = 2021;
  const quad = 4;

  const data = {
    labels: regionLabels,
    datasets: [
      {
        label: `Tỷ lệ người biết trình trạng HIV đến tháng ${month}/${year}`,
        data: regionLabels.map(() => (Math.random(0, 1) * 100).toFixed() * 1),
        backgroundColor: "#4caf50",
      },
      {
        label: `Tỷ lệ BN đang điều trị ART quý ${quad} ${year}`,
        data: regionLabels.map(() => (Math.random(0, 1) * 100).toFixed() * 1),
        backgroundColor: "#03a9f4",
      },
      {
        label: `Tỷ lệ bệnh nhân có kết quả ức chế Viral load năm 2021`,
        data: regionLabels.map(() => (Math.random(0, 1) * 100).toFixed() * 1),
        backgroundColor: "#ff9800",
      },
    ],
  };

  const handleClick = (e) => {
    console.log(getElementAtEvent(chartRef.current, e));
  };

  return (
    <Box sx={{ width: 1, height: 1 }}>
      {/*  <ModalBarChart
        open={true}
        barData={data}
        title="HivDashboardWidget1ModalTitle"
      /> */}
      <BarChart
        data={data}
        customOptions={customOptions}
        onClick={handleClick}
        ref={chartRef}
      />
    </Box>
  );
};

export default Widget1;
