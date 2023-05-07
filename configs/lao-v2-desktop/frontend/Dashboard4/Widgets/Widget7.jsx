import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslation } from "react-i18next";

import Custom from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

import { pull } from "../../utils";
import DoughnutChart from "@/components/Widgets/DoughnutChart";
import PieChart from "@/components/Widgets/PieChart";

const Widget7 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard4Widget7Data");
      const response = {};
      response.data = resultData.data.rows.map((row) => ({
        value: row[1],
        dx: row[0],
      }));
      response.dx = resultData.data.metaData.dimensions.dx.map((item) => {
        return item;
      });
      setResult(response);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      setData({
        labels: result.dx,
        datasets: [
          {
            label: "",
            data: result.dx.map((dx) => {
              const foundRow = result.data.filter((row) => row.dx === dx);

              return foundRow.length
                ? foundRow.reduce(
                    (prev, curr) => prev + (curr.value * 1 || 0),
                    0
                  )
                : 0;
            }),
            backgroundColor: [
              "#A8BF24",
              "#518CC3",
              "#D74554",
              "#FFA025",
              "#968F8F",
              "#BB3FA3",
            ],
          },
        ],
      });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  const formatLabel = (chart, index) => {
    const sum = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    const percent = ((chart.data.datasets[0].data[index] * 100) / sum).toFixed(
      2
    );
    const indicatorsName = result.dx[index];
    const dataValue = chart.data.datasets[0].data[index];
    return `${indicatorsName}: ${dataValue}(${percent}%)`;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: ["Family primary source of water", "2019 - Lao PDR"],
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      pieLabelsLine: {
        display: true,
        text: formatLabel,
        font: {
          size: 13,
        },
      },
    },
  };

  return data && <PieChart data={data} options={options} />;
};
export default withWidgetChildrenLoader(Widget7);
