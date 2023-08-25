import WeekSelector from "@/components/PeriodSelector/WeekSelector";
import YearSelector from "@/components/PeriodSelector/YearSelector";
import useDashboardStore from "@/state/dashboard";
import {
  Box,
  Button,
  Input,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { getISOWeek } from "date-fns";
import _ from "lodash";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

const WeekRangeSelector = ({ initValue }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);
  const [selectedWeek, setSelectedWeek] = useState({ start: {}, end: {} });
  const { changeAdditionalStateProperty, additionalState } = useDashboardStore(
    (state) => ({
      changeAdditionalStateProperty: state.changeAdditionalStateProperty,
      additionalState: state.additionalState,
    }),
    shallow
  );
  const targetSelectedWeek = useMemo(() => {
    return _.isEmpty(selectedWeek.start)
      ? additionalState[initValue] || { start: {}, end: {} }
      : selectedWeek;
  }, [additionalState[initValue], selectedWeek]);

  const periodName = useMemo(() => {
    if (!additionalState[initValue]) return "";
    if (
      !additionalState[initValue].start.year ||
      !additionalState[initValue].start.week ||
      !additionalState[initValue].end.year ||
      !additionalState[initValue].end.week
    ) {
      return "";
    }

    return `${additionalState[initValue].start.weekName} ${additionalState[initValue].start.year} - ${additionalState[initValue].end.weekName} ${additionalState[initValue].end.year}`;
  }, [additionalState[initValue]]);

  return (
    <Box>
      <Box
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <TextField value={periodName} placeholder={t("selectPeriod")} />
      </Box>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={() => {
          changeAdditionalStateProperty(initValue, targetSelectedWeek);
          setAnchorEl(null);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "10px",
          }}
        >
          <Box>
            <Typography sx={{ marginBottom: "5px", fontWeight: "bold" }}>
              {t("start")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <YearSelector
                max={targetSelectedWeek.end.year}
                period={targetSelectedWeek.start}
                change={(value) => {
                  setSelectedWeek({
                    ...targetSelectedWeek,
                    start: { ...targetSelectedWeek.start, year: value },
                  });
                }}
              />
              <WeekSelector
                max={
                  targetSelectedWeek.start.year === targetSelectedWeek.end.year
                    ? targetSelectedWeek.start.year ===
                        new Date().getFullYear() &&
                      targetSelectedWeek.end.week > getISOWeek(new Date())
                      ? getISOWeek(new Date())
                      : targetSelectedWeek.end.week
                    : null
                }
                period={targetSelectedWeek.start}
                change={(value, weekName) => {
                  setSelectedWeek({
                    ...targetSelectedWeek,
                    start: {
                      ...targetSelectedWeek.start,
                      week: value,
                      weekName,
                    },
                  });
                }}
              />
            </Box>
          </Box>
          {targetSelectedWeek.start.week && (
            <Box>
              <Typography sx={{ marginBottom: "5px", fontWeight: "bold" }}>
                {t("end")}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <YearSelector
                  min={targetSelectedWeek.start.year}
                  period={targetSelectedWeek.end}
                  change={(value) => {
                    setSelectedWeek({
                      ...targetSelectedWeek,
                      end: { ...targetSelectedWeek.end, year: value },
                    });
                  }}
                />
                <WeekSelector
                  min={
                    targetSelectedWeek.start.year ===
                    targetSelectedWeek.end.year
                      ? targetSelectedWeek.start.week
                      : null
                  }
                  period={targetSelectedWeek.end}
                  change={(value, weekName) => {
                    setSelectedWeek({
                      ...targetSelectedWeek,
                      end: { ...targetSelectedWeek.end, week: value, weekName },
                    });
                  }}
                />
              </Box>
            </Box>
          )}
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              onClick={() => {
                setAnchorEl(null);
                changeAdditionalStateProperty(initValue, targetSelectedWeek);
              }}
            >
              {t("apply")}
            </Button>
            {/* <Button
              variant="contained"
              color="error"
              onClick={() => {
                setAnchorEl(null);
                changeAdditionalStateProperty(initValue, targetSelectedWeek);
              }}
            >
              {t("reset")}
            </Button> */}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default WeekRangeSelector;
