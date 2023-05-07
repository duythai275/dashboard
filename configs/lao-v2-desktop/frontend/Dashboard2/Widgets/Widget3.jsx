import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslation } from "react-i18next";

import Custom from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "../../utils";

const Widget3 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard2Widget3Data");
      const response = {};
      response.data = resultData.data.rows.map((row) => ({
        pe: row[1],
        value: row[3],
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
          if (item.pe === `${year}${month >= 10 ? month : `0${month}`}`) {
            return item;
          }
        })
        .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
      currentData.lastYearData = result.data
        .filter((item) => {
          if (item.pe === `${year - 1}${month >= 10 ? month : `0${month}`}`) {
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
              sx={{ fontWeight: "700", fontSize: "50px" }}
            >
              {data.currentYearData}
            </Typography>
            <Typography textAlign="center">
              {t("lastPeriod", { value: data.lastYearData })}
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
export default withWidgetChildrenLoader(Widget3);
