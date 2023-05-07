import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslation } from "react-i18next";

import Custom from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

import { pull } from "../../utils";

const Widget2 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const listTargetPe = useMemo(() => {
    const currentYear = [],
      lastYear = [];
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    for (let i = 1; i <= month; i++) {
      currentYear.push(`${year}${i > 9 ? i : `0${i}`}`);
      lastYear.push(`${year - 1}${i > 9 ? i : `0${i}`}`);
    }
    return { currentYear, lastYear };
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard2Widget2Data");
      const response = {};
      response.data = resultData.data.rows
        .filter((row) => listTargetPe.currentYear.includes(row[1]) || listTargetPe.lastYear.includes(row[1]))
        .map((row) => ({
          pe: row[1],
          value: parseInt(row[3])
        }));
      setResult(response);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      let currentData = {};

      currentData.currentYearData = result.data
        .filter((item) => {
          if (listTargetPe.currentYear.includes(item.pe)) {
            return item;
          }
        })
        .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
      currentData.lastYearData = result.data
        .filter((item) => {
          if (listTargetPe.lastYear.includes(item.pe)) {
            return item;
          }
        })
        .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
      currentData.trend = Math.round(100 - (currentData.currentYearData / currentData.lastYearData) * 100);
      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return (
    data && (
      <Custom>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 30px",
            height: "100%"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography textAlign="center" sx={{ fontWeight: "700", fontSize: "35px" }}>
              {data.currentYearData.toLocaleString("en-US")}
            </Typography>
            <Typography textAlign="center">
              {t("lastPeriod", {
                value: data.lastYearData.toLocaleString("en-US")
              })}
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                  color: data.trend < 0 ? "#E61B1B" : data.trend === 0 ? "#F3F3F3" : "#118861"
                }}
              >
                {` ( ${data.trend === 0 ? "-" : Math.abs(data.trend)}%`}
                {data.trend > 0 ? <ArrowDownwardIcon /> : data.trend === 0 ? "" : <ArrowUpwardIcon />}
                {")"}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Custom>
    )
  );
};
export default withWidgetChildrenLoader(Widget2);
