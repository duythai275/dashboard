import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslation } from "react-i18next";

import Custom from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

import { pull } from "../../utils";
import DoughnutChart from "@/components/Widgets/DoughnutChart";

const Widget1 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard4Widget1Data");
      const response = {};
      response.data = resultData.data.rows.map((row) => ({
        value: row[1]
      }));

      setResult(response);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      let currentData = {};

      //   currentData.currentYearData = result.data
      //     .filter((item) => {
      //       if (listTargetPe.currentYear.includes(item.pe)) {
      //         return item;
      //       }
      //     })
      //     .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
      //   currentData.lastYearData = result.data
      //     .filter((item) => {
      //       if (listTargetPe.lastYear.includes(item.pe)) {
      //         return item;
      //       }
      //     })
      //     .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
      //   currentData.trend = Math.round(
      //     100 - (currentData.currentYearData / currentData.lastYearData) * 100
      //   );
      setData({
        labels: [""],
        datasets: [
          {
            label: "",
            data: [result.data[0].value * 1, 100 - result.data[0].value * 1],
            circumference: 180,
            rotation: 270,
            backgroundColor: ["#D1CF0B", "#F1F1F1"]
          }
        ]
      });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  const getTotal = (chart) => {
    var sum = chart.config.data.datasets[0].data[0];
    return `${sum}`;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: ""
      },
      legend: {
        display: false
      },
      datalabels: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      labelCenter: {
        display: true,
        labels: [
          {
            text: getTotal,
            font: {
              size: 40,
              style: "bold"
            }
          }
        ]
      }
    }
  };

  return data && <DoughnutChart data={data} options={options} />;
};
export default withWidgetChildrenLoader(Widget1);
