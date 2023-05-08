import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslation } from "react-i18next";

import Custom from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

import { pull } from "../../utils";
import DoughnutChart from "@/components/Widgets/DoughnutChart";

const Widget2 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard4Widget2Data");
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
      setData({
        labels: [""],
        datasets: [
          {
            label: "",
            data: [result.data[0].value * 1, 100 - result.data[0].value * 1],
            circumference: 180,
            rotation: 270,
            backgroundColor: ["#31A354", "#F1F1F1"]
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

  return data && <DoughnutChart data={data} customOptions={options} />;
};
export default withWidgetChildrenLoader(Widget2);
