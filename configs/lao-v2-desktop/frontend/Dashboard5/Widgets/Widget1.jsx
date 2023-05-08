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
    if (additionalState.widgetDashboard5Ready) {
      const response = {};
      response.data = additionalState.widgetDashboard5Data.rows
        .filter(
          (row) =>
            (listTargetPe.currentYear.includes(row[2]) ||
              listTargetPe.lastYear.includes(row[2])) &&
            dataItemId.includes(row[0])
        )
        .map((row) => ({
          pe: row[2],
          value: parseInt(row[3]),
        }));
      setResult(response);
    }
    setLoading(!additionalState.widgetDashboard5Ready);
  }, [additionalState.widgetDashboard5Ready]);

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
      currentData.trend = Math.round(
        100 - (currentData.currentYearData / currentData.lastYearData) * 100
      );
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
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              textAlign="center"
              sx={{ fontWeight: "700", fontSize: "35px" }}
            >
              {data.currentYearData.toLocaleString("en-US")}
            </Typography>
            <Typography textAlign="center" sx={{ fontSize: "15px" }}>
              {t("lastPeriod", {
                value: data.lastYearData.toLocaleString("en-US"),
              })}
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                  color:
                    data.trend < 0
                      ? "#E61B1B"
                      : data.trend === 0
                      ? "#F3F3F3"
                      : "#118861",
                }}
              >
                {` ( ${data.trend === 0 ? "-" : Math.abs(data.trend)}%`}
                {data.trend > 0 ? (
                  <ArrowDownwardIcon />
                ) : data.trend === 0 ? (
                  ""
                ) : (
                  <ArrowUpwardIcon />
                )}
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
