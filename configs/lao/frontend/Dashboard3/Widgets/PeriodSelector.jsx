import {
  Box,
  Button,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const PeriodSelector = ({ changePeriod }) => {
  const { t } = useTranslation();
  const [selectedStart, setSelectedStart] = useState(new Date().getMonth() + 1);
  const [selectedStartYear, setSelectedStartYear] = useState(
    new Date().getFullYear()
  );

  const [selectedEnd, setSelectedEnd] = useState(new Date().getMonth() + 1);
  const [selectedEndYear, setSelectedEndYear] = useState(
    new Date().getFullYear()
  );

  const valueSetStartDate = useMemo(() => {
    let result = [];
    for (let i = 0; i < 12; i++) {
      result.push({
        label: `${t(months[i])} ${selectedStartYear}`,
        value: i + 1,
      });
    }
    return result;
  }, [selectedStartYear]);
  const valueSetEndDate = useMemo(() => {
    let result = [];
    for (let i = 0; i < 12; i++) {
      result.push({
        label: `${t(months[i])} ${selectedEndYear}`,
        value: i + 1,
      });
    }
    return result;
  }, [selectedEndYear]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Typography>{t("startDate")}</Typography>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select
            value={selectedStart}
            sx={{ width: "350px" }}
            onChange={(event) => {
              setSelectedStart(event.target.value);
            }}
          >
            {valueSetStartDate.map((vs) => {
              return <MenuItem value={vs.value}>{vs.label}</MenuItem>;
            })}
          </Select>
          <Button
            disabled={selectedStartYear === 2014}
            sx={{ whiteSpace: "nowrap" }}
            onClick={() =>
              setSelectedStartYear((prevStartYear) => prevStartYear - 1)
            }
            variant="contained"
          >
            {t("prevYear")}
          </Button>
          <Button
            disabled={selectedStartYear === new Date().getFullYear()}
            sx={{ whiteSpace: "nowrap" }}
            onClick={() =>
              setSelectedStartYear((prevStartYear) => prevStartYear + 1)
            }
            variant="contained"
          >
            {t("nextYear")}
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Typography>{t("endDate")}</Typography>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Select
            value={selectedEnd}
            sx={{ width: "350px" }}
            onChange={(event) => {
              setSelectedEnd(event.target.value);
            }}
          >
            {valueSetEndDate.map((vs) => {
              return <MenuItem value={vs.value}>{vs.label}</MenuItem>;
            })}
          </Select>
          <Button
            disabled={selectedStartYear === 2014}
            sx={{ whiteSpace: "nowrap" }}
            onClick={() => setSelectedEndYear((prevEndYear) => prevEndYear - 1)}
            variant="contained"
          >
            {t("prevYear")}
          </Button>
          <Button
            disabled={selectedEndYear === new Date().getFullYear()}
            sx={{ whiteSpace: "nowrap" }}
            onClick={() => setSelectedEndYear((prevEndYear) => prevEndYear + 1)}
            variant="contained"
          >
            {t("nextYear")}
          </Button>
        </Box>
      </Box>
      <Button
        sx={{
          whiteSpace: "nowrap",
          alignSelf: "end",
          backgroundColor: "rgb(7,126,7, 0.6)",
          ["&:hover"]: {
            backgroundColor: "rgb(7,126,7, 1)",
          },
        }}
        onClick={() => {
          changePeriod &&
            changePeriod({
              start: {
                month: selectedStart,
                year: selectedStartYear,
              },
              end: {
                month: selectedEnd,
                year: selectedEndYear,
              },
            });
        }}
        variant="contained"
      >
        {t("apply")}
      </Button>
    </Box>
  );
};

export default PeriodSelector;

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
