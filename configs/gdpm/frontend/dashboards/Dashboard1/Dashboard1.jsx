import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LAST_YEAR, THIS_YEAR } from "./constants/constants";
import { BorderedTable } from "./components/BorderedTable";
import { fillCaseData, getComparator, stableSort } from "./utils";
import { pull } from "@/utils/fetch";
import useMetadataStore from "@/state/metadata";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

const styles = {
  p: 2,
  "& td, th": {
    textAlign: "center",
    fontWeight: "bold",
  },
  "& td:nth-of-type(1)": {
    textAlign: "left",
  },
};

const green = { color: "#00A336 !important" };
const red = { color: "#d10000 !important" };
const headerStyle = { width: "80px", top: "36.8px", ...green };

const compareStatus = (w12Value, w11Value) => {
  if (w12Value === w11Value) return "equal";
  if (w12Value * 1 > w11Value * 1) return "increase";
  return "decrease";
};

const getDiseaseData = (resultCase, resultDeath, code) => {
  const week12_currYear_cases = fillCaseData(
    resultCase.listGrid,
    code,
    THIS_YEAR + "W12"
  );
  const week12_currYear_deaths = fillCaseData(
    resultDeath.listGrid,
    code,
    THIS_YEAR + "W12"
  );

  const week11_currYear_cases = fillCaseData(
    resultCase.listGrid,
    code,
    THIS_YEAR + "W11"
  );
  const week11_currYear_deaths = fillCaseData(
    resultDeath.listGrid,
    code,
    THIS_YEAR + "W11"
  );

  const week12_prevYear_cases = fillCaseData(
    resultCase.listGrid,
    code,
    LAST_YEAR + "W12"
  );
  const week12_prevYear_deaths = fillCaseData(
    resultDeath.listGrid,
    code,
    LAST_YEAR + "W12"
  );

  const status_cases = compareStatus(
    week12_currYear_cases,
    week11_currYear_cases
  );

  const status_deaths = compareStatus(
    week12_currYear_deaths,
    week11_currYear_deaths
  );

  return {
    code,
    week12_currYear_cases,
    week12_currYear_deaths,
    week11_currYear_cases,
    week11_currYear_deaths,
    week12_prevYear_cases,
    week12_prevYear_deaths,
    status_cases,
    status_deaths,
  };
};

const StatusIcon = ({ status }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {status === "equal" ? (
        <HorizontalRuleRoundedIcon />
      ) : status === "increase" ? (
        <ArrowUpwardRoundedIcon sx={red} />
      ) : (
        <ArrowDownwardRoundedIcon sx={green} />
      )}
    </Box>
  );
};

const Dashboard1 = ({ title }) => {
  const { t, i18n } = useTranslation();
  const diseases = useMetadataStore((state) => state.diseases);

  const diseaseNames = useMemo(() => {
    const result = {};
    const language = i18n.language;

    diseases.forEach(({ translations, name, code }) => {
      const translationName = translations.find(
        ({ locale }) => locale === language
      )?.value;

      result[code] = translationName || name;
    });

    return result;
  }, [i18n.language, diseases]);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async () => {
      const resultCase = await pull(
        `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_cases_country&var=startYear:${LAST_YEAR}&var=endYear:${THIS_YEAR}`
      );

      const resultDeath = await pull(
        `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_deaths_country&var=startYear:${LAST_YEAR}&var=endYear:${THIS_YEAR}`
      );

      const resultTableData = diseases.map(({ code }, idx) => {
        return getDiseaseData(resultCase, resultDeath, code);
      });

      setTableData(
        stableSort(
          resultTableData,
          getComparator("desc", "week12_currYear_cases")
        )
      );
    })();
  }, [diseases]);

  return (
    <Paper sx={{ mt: 1, pt: 2, border: "1px solid #ededed" }}>
      <Box sx={{ width: 1, textAlign: "center", pb: 2 }}>
        <Typography variant="widgetTitle">{t(title)}</Typography>
      </Box>
      <Divider />

      <Box sx={styles}>
        {tableData.length > 0 ? (
          <BorderedTable
            stripe
            stickyHeader
            enableHover
            sx={{ minWidth: 1450 }}
            maxHeight={"calc(min(70dvh, 850px))"}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  sx={{
                    width: 350,
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 5,
                  }}
                >
                  {t("disease")}
                </TableCell>
                <TableCell colSpan={4} sx={green}>
                  {t("cases")}
                </TableCell>
                <TableCell colSpan={4} sx={red}>
                  {t("deaths")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={headerStyle}>{t("week12_currYear")}</TableCell>
                <TableCell sx={headerStyle}>{t("week11_currYear")}</TableCell>
                <TableCell sx={headerStyle}>{t("status")}</TableCell>
                <TableCell sx={headerStyle}>{t("week12_prevYear")}</TableCell>
                <TableCell sx={{ ...headerStyle, ...red }}>
                  {t("week12_currYear")}
                </TableCell>
                <TableCell sx={{ ...headerStyle, ...red }}>
                  {t("week11_currYear")}
                </TableCell>
                <TableCell sx={{ ...headerStyle, ...red }}>
                  {t("status")}
                </TableCell>
                <TableCell sx={{ ...headerStyle, ...red }}>
                  {t("week12_prevYear")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, idx) => (
                <TableRow sx={{ cursor: "pointer" }} key={row.code}>
                  <TableCell
                    sx={{
                      position: "sticky",
                      left: 0,
                      backgroundColor: idx % 2 === 0 ? "#f8f8f8" : "#fff",
                    }}
                  >
                    {diseaseNames[row.code]}
                  </TableCell>
                  <TableCell sx={green}>
                    {row["week12_currYear_cases"]}
                  </TableCell>
                  <TableCell sx={green}>
                    {row["week11_currYear_cases"]}
                  </TableCell>
                  <TableCell>
                    <StatusIcon status={row["status_cases"]} />
                  </TableCell>
                  <TableCell sx={green}>
                    {row["week12_prevYear_cases"]}
                  </TableCell>
                  <TableCell sx={red}>
                    {row["week12_currYear_deaths"]}
                  </TableCell>
                  <TableCell sx={red}>
                    {row["week11_currYear_deaths"]}
                  </TableCell>
                  <TableCell>
                    <StatusIcon status={row["status_deaths"]} />
                  </TableCell>
                  <TableCell sx={red}>
                    {row["week12_prevYear_deaths"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </BorderedTable>
        ) : (
          <Box
            sx={{
              height: "calc(min(70dvh, 850px))",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Paper>
  );
};
export default Dashboard1;
