import {
  Box,
  CircularProgress,
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
import { findHeaderIndex } from "./utils";
import { pull } from "@/utils/fetch";
import useMetadataStore from "@/state/metadata";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

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
const headerStyle = { width: "130px", top: "34.8px", ...green };

const compareStatus = (w12Value, w11Value) => {
  if (w12Value === w11Value) return "equal";
  if (w12Value < w11Value) return "increase";
  return "decrease";
};

const Dashboard1 = ({ title }) => {
  const { t, i18n } = useTranslation();
  const diseases = useMetadataStore((state) => state.diseases);

  const initialData = useMemo(() => {
    const result = {};
    const language = i18n.language;

    diseases.forEach(({ translations, name, id, code }) => {
      const cellData = {};
      const translationName = translations.find(
        ({ locale }) => locale === language
      )?.value;

      cellData["disease"] = translationName || name;
      cellData["week12_currYear_cases"] = 0;
      cellData["week11_currYear_cases"] = 0;
      cellData["status_cases"] = "=";
      cellData["week12_prevYear_cases"] = 0;
      cellData["week12_currYear_deaths"] = 0;
      cellData["week11_currYear_deaths"] = 0;
      cellData["status_deaths"] = "=";
      cellData["week12_prevYear_deaths"] = 0;

      result[code] = cellData;
    });

    return result;
  }, []);

  const initialLoading = useMemo(() => {
    const loading = {};
    diseases.forEach(({ code }) => {
      loading[code] = {};

      loading[code]["week12_currYear_cases"] = true;
      loading[code]["week11_currYear_cases"] = true;
      loading[code]["status_cases"] = true;
      loading[code]["week12_prevYear_cases"] = true;
      loading[code]["week12_currYear_deaths"] = true;
      loading[code]["week11_currYear_deaths"] = true;
      loading[code]["status_deaths"] = true;
      loading[code]["week12_prevYear_deaths"] = true;
    });

    return loading;
  }, []);

  const [tableData, setTableData] = useState(initialData);
  const [loading, setLoading] = useState(initialLoading);

  const fetchDiseases = async (week, year, code) => {
    let cases, deaths;
    if (week === "W12" && year === THIS_YEAR) cases = "week12_currYear_cases";
    if (week === "W12" && year === THIS_YEAR) deaths = "week12_currYear_deaths";
    if (week === "W11" && year === THIS_YEAR) cases = "week11_currYear_cases";
    if (week === "W11" && year === THIS_YEAR) deaths = "week11_currYear_deaths";

    if (week === "W12" && year === LAST_YEAR) cases = "week12_prevYear_cases";
    if (week === "W12" && year === LAST_YEAR) deaths = "week12_prevYear_deaths";

    let caseValue = 0,
      deathValue = 0;
    try {
      const result = await pull(
        `/api/29/analytics/events/query/PO07dgbJCgr.json?dimension=pe:${
          year + week
        }&dimension=ou:S3kaCiYIP4B&dimension=GIdhyQcAihV.Du5ydup8qQf:IN:${code}&dimension=GIdhyQcAihV.Pip1eJUznxo&stage=GIdhyQcAihV&displayProperty=NAME&outputType=EVENT&desc=eventdate`
      );

      if (result.rows.length) {
        const deaths = result.rows.filter(
          (row) =>
            row[findHeaderIndex(result.headers, "GIdhyQcAihV.Pip1eJUznxo")] ===
            3
        );

        deathValue = deaths.length;
        caseValue = result.rows.length - deaths.length;
      }

      setTableData((prev) => ({
        ...prev,
        [code]: {
          ...prev[code],
          [cases]: caseValue,
          [deaths]: deathValue,
        },
      }));
      setLoading((prev) => ({
        ...prev,
        [code]: {
          ...prev[code],
          [cases]: false,
          [deaths]: false,
        },
      }));
    } catch (error) {
      setLoading((prev) => ({
        ...prev,
        [code]: {
          ...prev[code],
          [cases]: false,
          [deaths]: false,
        },
      }));
      console.log(error);
    }

    return { deathValue, caseValue };
  };

  const generateStatus = (w12, w11, code) => {
    setTableData((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        status_cases: compareStatus(w12.caseValue, w11.caseValue),
        status_deaths: compareStatus(w12.deathValue, w11.deathValue),
      },
    }));
    setLoading((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        status_cases: false,
        status_deaths: false,
      },
    }));
  };

  useEffect(() => {
    Object.keys(initialData).map(async (code, idx) => {
      const resultCurrentYearW12 = await fetchDiseases("W12", THIS_YEAR, code);
      const resultCurrentYearW11 = await fetchDiseases("W11", THIS_YEAR, code);
      generateStatus(resultCurrentYearW12, resultCurrentYearW11, code);

      await fetchDiseases("W12", LAST_YEAR, code);
    });
  }, [initialData]);

  return (
    <Box sx={styles}>
      <Typography>{t(title)}</Typography>

      {tableData && loading && (
        <BorderedTable
          stripe
          stickyHeader
          enableHover
          sx={{ minWidth: 1600 }}
          maxHeight={"calc(min(78dvh, 850px))"}
        >
          <TableHead>
            <TableRow>
              <TableCell
                rowSpan={2}
                sx={{
                  width: "450px",
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
                  {tableData[code]["disease"]}
                </TableCell>
                <TableCell sx={green}>
                  {loading[code]["week12_currYear_cases"] ? (
                    <CircularProgress size={15} />
                  ) : (
                    tableData[code]["week12_currYear_cases"]
                  )}
                </TableCell>
                <TableCell sx={green}>
                  {loading[code]["week11_currYear_cases"] ? (
                    <CircularProgress size={15} />
                  ) : (
                    tableData[code]["week11_currYear_cases"]
                  )}
                </TableCell>
                <TableCell>
                  {loading[code]["status_cases"] ? (
                    <CircularProgress size={15} />
                  ) : tableData[code]["status_cases"] === "equal" ? (
                    <TrendingFlatRoundedIcon fontSize="small" />
                  ) : tableData[code]["status_cases"] === "increase" ? (
                    <TrendingUpRoundedIcon fontSize="small" />
                  ) : (
                    <TrendingDownRoundedIcon fontSize="small" />
                  )}
                </TableCell>
                <TableCell sx={green}>
                  {loading[code]["week12_prevYear_cases"] ? (
                    <CircularProgress size={15} />
                  ) : (
                    tableData[code]["week12_prevYear_cases"]
                  )}
                </TableCell>
                <TableCell sx={red}>
                  {loading[code]["week12_currYear_deaths"] ? (
                    <CircularProgress size={15} />
                  ) : (
                    tableData[code]["week12_currYear_deaths"]
                  )}
                </TableCell>
                <TableCell sx={red}>
                  {loading[code]["week11_currYear_deaths"] ? (
                    <CircularProgress size={15} />
                  ) : (
                    tableData[code]["week11_currYear_deaths"]
                  )}
                </TableCell>
                <TableCell>
                  {loading[code]["status_deaths"] ? (
                    <CircularProgress size={15} />
                  ) : tableData[code]["status_deaths"] === "equal" ? (
                    <TrendingFlatRoundedIcon fontSize="small" />
                  ) : tableData[code]["status_deaths"] === "increase" ? (
                    <TrendingUpRoundedIcon fontSize="small" />
                  ) : (
                    <TrendingDownRoundedIcon fontSize="small" />
                  )}
                </TableCell>
                <TableCell sx={red}>
                  {loading[code]["week12_prevYear_deaths"] ? (
                    <CircularProgress size={15} />
                  ) : (
                    tableData[code]["week12_prevYear_deaths"]
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </BorderedTable>
      )}
    </Box>
  );
};
export default Dashboard1;
