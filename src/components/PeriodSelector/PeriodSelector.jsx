import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import YearSelector from "./YearSelector";
import MonthSelector, { MONTHS } from "./MonthSelector";
import QuarterSelector from "./QuarterSelector";
import WeekSelector from "./WeekSelector";
import moment from "moment";
import "./PeriodSelector.css";
import CustomSelect from "./CustomSelect";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import _ from "lodash";

const PeriodSelector = ({ handler, periodType, initValue }) => {
  const { t } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const [selectedPeriod, setSelectedPeriod] = useState({});
  useEffect(() => {
    if (_.isEmpty(selectedPeriod)) {
      setSelectedPeriod((prev) => ({ ...prev, ...additionalState[initValue] }));
    }
  }, [JSON.stringify(additionalState)]);
  const renderSelectors = useMemo(() => {
    switch (periodType) {
      case "Yearly":
        return (
          <YearSelector
            period={selectedPeriod}
            change={(value) => {
              setSelectedPeriod({ ...selectedPeriod, year: value });
            }}
          />
        );
      case "Monthly":
        return [
          <YearSelector
            period={selectedPeriod}
            change={(value) => {
              setSelectedPeriod({ ...selectedPeriod, year: value });
            }}
          />,
          <MonthSelector
            period={selectedPeriod}
            change={(value, monthName) => {
              setSelectedPeriod({ ...selectedPeriod, month: value, monthName });
            }}
          />,
        ];
      case "Quarterly":
        return [
          <YearSelector
            period={selectedPeriod}
            change={(value) => {
              setSelectedPeriod({ ...selectedPeriod, year: value });
            }}
          />,
          <QuarterSelector
            period={selectedPeriod}
            change={(value, quarterName) => {
              setSelectedPeriod({
                ...selectedPeriod,
                quarter: value,
                quarterName,
              });
            }}
          />,
        ];
      case "Weekly":
        return [
          <YearSelector
            period={selectedPeriod}
            change={(value) => {
              setSelectedPeriod({ ...selectedPeriod, year: value });
            }}
          />,
          <WeekSelector
            period={selectedPeriod}
            change={(value, weekName) => {
              setSelectedPeriod({ ...selectedPeriod, week: value, weekName });
            }}
          />,
        ];
      case "Daily":
        return (
          <div>ERROR: Please select period type first</div>
          // <div>
          //   <CustomSelect
          //     value={selectedPeriod.date}
          //     valueType="DATE"
          //     label={t("date")}
          //     change={(value) => {
          //       setSelectedPeriod({ ...selectedPeriod, date: value });
          //     }}
          //   />
          // </div>
        );
      default:
        return <div>ERROR: Please select period type first</div>;
    }
  }, [JSON.stringify(selectedPeriod)]);
  const constConvertToDhis2Period = () => {
    let startDate;
    let endDate;
    switch (periodType) {
      case "Yearly":
        if (selectedPeriod.year) {
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: `${selectedPeriod.year}`,
            startDate: `${selectedPeriod.year}-01-01`,
            endDate: `${selectedPeriod.year}-12-31`,
          });
        } else {
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
          });
        }
        break;
      case "Monthly":
        if (selectedPeriod.year && selectedPeriod.month) {
          startDate = moment([selectedPeriod.year, selectedPeriod.month - 1])
            .startOf("month")
            .format("YYYY-MM-DD");
          endDate = moment([selectedPeriod.year, selectedPeriod.month - 1])
            .endOf("month")
            .format("YYYY-MM-DD");
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: `${selectedPeriod.year}${
              selectedPeriod.month < 10
                ? "0" + selectedPeriod.month
                : selectedPeriod.month
            }`,
            startDate: startDate,
            endDate: endDate,
            monthName: t(MONTHS[selectedPeriod.month - 1]),
          });
        } else {
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            monthName: "",
          });
        }
        break;
      case "Quarterly":
        if (selectedPeriod.year && selectedPeriod.quarter) {
          startDate = moment([selectedPeriod.year])
            .quarter(selectedPeriod.quarter)
            .startOf("quarter")
            .format("YYYY-MM-DD");
          endDate = moment([selectedPeriod.year])
            .quarter(selectedPeriod.quarter)
            .endOf("quarter")
            .format("YYYY-MM-DD");
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: `${selectedPeriod.year}Q${selectedPeriod.quarter}`,
            startDate,
            endDate,
            quarterName: t("Q" + selectedPeriod.quarter),
          });
        } else {
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            quarterName: "",
          });
        }
        break;
      case "Weekly":
        if (selectedPeriod.year && selectedPeriod.week) {
          startDate = moment([selectedPeriod.year, 1, 1])
            .isoWeek(selectedPeriod.week)
            .startOf("isoWeek")
            .format("YYYY-MM-DD");
          endDate = moment([selectedPeriod.year, 1, 1])
            .isoWeek(selectedPeriod.week)
            .endOf("isoWeek")
            .format("YYYY-MM-DD");
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: `${selectedPeriod.year}W${selectedPeriod.week}`,
            startDate,
            endDate,
            weekName: t("week") + " " + selectedPeriod.week,
          });
        } else {
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            weekName,
          });
        }
        break;
      case "Daily":
        if (selectedPeriod.date) {
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: `${selectedPeriod.date.replace(/-/g, "")}`,
            startDate: selectedPeriod.date,
            endDate: selectedPeriod.date,
          });
        } else {
          setSelectedPeriod({
            ...selectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
          });
        }
        break;
      default:
        setSelectedPeriod({
          ...selectedPeriod,
          dhis2Period: null,
          startDate: "",
          endDate: "",
        });
        break;
    }
  };

  useEffect(() => {
    if (_.isEmpty(selectedPeriod)) return;
    constConvertToDhis2Period();
  }, [JSON.stringify(selectedPeriod)]);

  useEffect(() => {
    if (_.isEmpty(selectedPeriod)) return;
    let value = "";
    switch (periodType) {
      case "Yearly":
        if (selectedPeriod.year) value = selectedPeriod.year;
        break;
      case "Monthly":
        if (selectedPeriod.year && selectedPeriod.month)
          value = selectedPeriod.monthName + " " + selectedPeriod.year;
        break;
      case "Quarterly":
        if (selectedPeriod.year && selectedPeriod.quarter)
          value = selectedPeriod.quarterName + " - " + selectedPeriod.year;
        break;
      case "Weekly":
        if (selectedPeriod.year && selectedPeriod.week)
          value = selectedPeriod.weekName + " - " + selectedPeriod.year;
        break;
      case "Daily":
        if (selectedPeriod.date) value = selectedPeriod.date;
        break;
      default:
        break;
    }
    setSelectedPeriod({ ...selectedPeriod, periodName: value });
  }, [selectedPeriod.dhis2Period]);

  return (
    <div className="period-selector-container">
      {renderSelectors}
      <Button variant="contained" onClick={() => handler(selectedPeriod)}>
        {t("apply")}
      </Button>
    </div>
  );
};

export default PeriodSelector;
