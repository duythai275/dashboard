import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import Custom from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

const Widget1 = ({ setLoading, dataItemId }) => {
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const currentDate = useMemo(() => format(new Date(), "dd/MM/yyyy"), []);

  const listTargetPe = useMemo(() => {
    const currentMonths = [],
      lastMonths = [];
    let month = new Date().getMonth() + 1;
    let lastMonth = month - 1 === 0 ? 12 : month - 1;
    let year = new Date().getFullYear();
    currentMonths.push(`${year}${month > 9 ? month : `0${month}`}`);
    lastMonths.push(`${year}${lastMonth > 9 ? lastMonth : `0${lastMonth}`}`);
    return { currentMonths, lastMonths };
  }, []);

  useEffect(() => {
    if (additionalState.widget1Dashboard3Ready) {
      const response = {};
      response.data = additionalState.widget1Dashboard3Data.rows
        .filter((row) => (listTargetPe.currentMonths.includes(row[1]) || listTargetPe.lastMonths.includes(row[1])) && row[0] === dataItemId)
        .map((row) => ({
          pe: row[1],
          value: parseInt(row[3])
        }));
      setResult(response);
    }
    setLoading(!additionalState.widget1Dashboard3Ready);
  }, [additionalState.widget1Dashboard3Ready]);

  useEffect(() => {
    if (!result) return;

    (async () => {
      let currentData = {};
      currentData.currentMonthData = result.data
        .filter((item) => {
          if (listTargetPe.currentMonths.includes(item.pe)) {
            return item;
          }
        })
        .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
      currentData.lastMonthData = result.data
        .filter((item) => {
          if (listTargetPe.lastMonths.includes(item.pe)) {
            return item;
          }
        })
        .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
      currentData.trend = Math.round(100 - (currentData.currentMonthData / currentData.lastMonthData) * 100);
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
            <Typography textAlign="center" sx={{ fontWeight: "700", fontSize: "50px" }}>
              {data.currentMonthData}
            </Typography>
            <Typography textAlign="center">
              {t("lastMonth", { value: data.lastMonthData })}
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
export default withWidgetChildrenLoader(Widget1);
