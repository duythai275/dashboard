import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";
import Custom from "@/components/Widgets/Custom";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Widget3 = ({ setLoading }) => {
  const { hmisDataItems } = useMetadataStore(
    (state) => ({ hmisDataItems: state.hmisDataItems }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const currentDate = useMemo(() => format(new Date(), "dd/mm/yyyy"), []);

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
    if (additionalState.widget1234567Dashboard1Ready) {
      const response = {};
      response.data = additionalState.widget1234567Dashboard1Data.rows
        .filter(
          (row) =>
            (listTargetPe.currentYear.includes(row[1]) ||
              listTargetPe.lastYear.includes(row[1])) &&
            row[0] === "dJhWRKs0fcq"
        )
        .map((row) => ({
          pe: row[1],
          value: parseInt(row[3]),
        }));
      setResult(response);
    }
    setLoading(!additionalState.widget1234567Dashboard1Ready);
  }, [additionalState.widget1234567Dashboard1Ready]);

  useEffect(() => {
    if (!result) return;

    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";
      const dataItems = ["cwhEsbBe6Zs", "cPcvesqWRtH", "dJhWRKs0fcq"].map(
        (de) => {
          const foundDi = hmisDataItems.find((di) => di.id === de);
          return foundDi;
        }
      );
      const colors = [
        "rgb(168, 191, 36)",
        "rgb(81, 140, 195)",
        "rgb(215, 69, 84)",
      ];
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
            border: "1px solid black",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 30px",
            height: "100%",
          }}
        >
          <Typography textAlign="center" fontWeight={700}>
            {t("widget1.3Title", { year: new Date().getFullYear() })}
          </Typography>
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
              sx={{ fontWeight: "700", fontSize: "24px" }}
            >
              {data.currentYearData}
            </Typography>
            <Typography textAlign="center">
              same period last year: {data.lastYearData}
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
            <Typography textAlign="center">
              {t("widget1.1Date", { date: currentDate })}
            </Typography>
          </Box>
        </Box>
      </Custom>
    )
  );
};
export default withWidgetChildrenLoader(Widget3);
