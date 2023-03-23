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
import { fillCaseData } from "./utils";
import { pull } from "@/utils/fetch";
import useMetadataStore from "@/state/metadata";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  if (w12Value > w11Value) return "increase";
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
  }, [i18n.language]);

  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    (async () => {
      const resultCase = await pull(
        `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_cases_country&var=startYear:${LAST_YEAR}&var=endYear:${THIS_YEAR}`
      );

      const resultDeath = await pull(
        `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_deaths_country&var=startYear:${LAST_YEAR}&var=endYear:${THIS_YEAR}`
      );

      const resultTableData = {};
      diseases.forEach(({ code }, idx) => {
        resultTableData[code] = getDiseaseData(resultCase, resultDeath, code);
      });

      setTableData(resultTableData);
    })();
  }, [diseases]);

  return (
    <Paper sx={{ mt: 1, pt: 2, border: "1px solid #ededed" }}>
      <Box sx={{ width: 1, textAlign: "center", pb: 1 }}>
        <Typography variant="widgetTitle">{t(title)}</Typography>
      </Box>
      <Divider />

      <Box sx={styles}>
        {tableData ? (
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
              {Object.keys(tableData).map((code, idx) => (
                <TableRow sx={{ cursor: "pointer" }} key={code}>
                  <TableCell
                    sx={{
                      position: "sticky",
                      left: 0,
                      backgroundColor: idx % 2 === 0 ? "#f8f8f8" : "#fff",
                    }}
                  >
                    {diseaseNames[code]}
                  </TableCell>
                  <TableCell sx={green}>
                    {tableData[code]["week12_currYear_cases"]}
                  </TableCell>
                  <TableCell sx={green}>
                    {tableData[code]["week11_currYear_cases"]}
                  </TableCell>
                  <TableCell>
                    {tableData[code]["status_cases"] === "equal" ? (
                      <TrendingFlatIcon sx={{ fontSize: 18 }} />
                    ) : tableData[code]["status_cases"] === "increase" ? (
                      <TrendingUpIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: 18 }} />
                    )}
                  </TableCell>
                  <TableCell sx={green}>
                    {tableData[code]["week12_prevYear_cases"]}
                  </TableCell>
                  <TableCell sx={red}>
                    {tableData[code]["week12_currYear_deaths"]}
                  </TableCell>
                  <TableCell sx={red}>
                    {tableData[code]["week11_currYear_deaths"]}
                  </TableCell>
                  <TableCell>
                    {tableData[code]["status_deaths"] === "equal" ? (
                      <TrendingFlatIcon sx={{ fontSize: 18 }} />
                    ) : tableData[code]["status_deaths"] === "increase" ? (
                      <TrendingUpIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: 18 }} />
                    )}
                  </TableCell>
                  <TableCell sx={red}>
                    {tableData[code]["week12_prevYear_deaths"]}
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
