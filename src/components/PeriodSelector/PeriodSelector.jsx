import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import YearSelector from "./YearSelector";
import MonthSelector, { MONTHS } from "./MonthSelector";
import QuarterSelector from "./QuarterSelector";
import WeekSelector from "./WeekSelector";
import moment from "moment";
import "./PeriodSelector.css";
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
  const targetSelectedPeriod = _.isEmpty(selectedPeriod)
    ? additionalState[initValue]
    : selectedPeriod;
  const renderSelectors = useMemo(() => {
    switch (periodType) {
      case "Yearly":
        return (
          <YearSelector
            period={targetSelectedPeriod}
            change={(value) => {
              setSelectedPeriod({ ...targetSelectedPeriod, year: value });
            }}
          />
        );
      case "Monthly":
        return [
          <YearSelector
            period={targetSelectedPeriod}
            change={(value) => {
              setSelectedPeriod({ ...targetSelectedPeriod, year: value });
            }}
          />,
          <MonthSelector
            period={targetSelectedPeriod}
            change={(value, monthName) => {
              setSelectedPeriod({
                ...targetSelectedPeriod,
                month: value,
                monthName,
              });
            }}
          />,
        ];
      case "Quarterly":
        return [
          <YearSelector
            period={targetSelectedPeriod}
            change={(value) => {
              setSelectedPeriod({ ...targetSelectedPeriod, year: value });
            }}
          />,
          <QuarterSelector
            period={targetSelectedPeriod}
            change={(value, quarterName) => {
              setSelectedPeriod({
                ...targetSelectedPeriod,
                quarter: value,
                quarterName,
              });
            }}
          />,
        ];
      case "Weekly":
        return [
          <YearSelector
            period={targetSelectedPeriod}
            change={(value) => {
              setSelectedPeriod({ ...targetSelectedPeriod, year: value });
            }}
          />,
          <WeekSelector
            period={targetSelectedPeriod}
            change={(value, weekName) => {
              setSelectedPeriod({
                ...targetSelectedPeriod,
                week: value,
                weekName,
              });
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
  }, [JSON.stringify(targetSelectedPeriod)]);
  const constConvertToDhis2Period = () => {
    let startDate;
    let endDate;
    switch (periodType) {
      case "Yearly":
        if (targetSelectedPeriod.year) {
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: `${targetSelectedPeriod.year}`,
            startDate: `${targetSelectedPeriod.year}-01-01`,
            endDate: `${targetSelectedPeriod.year}-12-31`,
          });
        } else {
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
          });
        }
        break;
      case "Monthly":
        if (targetSelectedPeriod.year && targetSelectedPeriod.month) {
          startDate = moment([
            targetSelectedPeriod.year,
            targetSelectedPeriod.month - 1,
          ])
            .startOf("month")
            .format("YYYY-MM-DD");
          endDate = moment([
            targetSelectedPeriod.year,
            targetSelectedPeriod.month - 1,
          ])
            .endOf("month")
            .format("YYYY-MM-DD");
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: `${targetSelectedPeriod.year}${
              targetSelectedPeriod.month < 10
                ? "0" + targetSelectedPeriod.month
                : targetSelectedPeriod.month
            }`,
            startDate: startDate,
            endDate: endDate,
            monthName: t(MONTHS[targetSelectedPeriod.month - 1]),
          });
        } else {
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            monthName: "",
          });
        }
        break;
      case "Quarterly":
        if (targetSelectedPeriod.year && targetSelectedPeriod.quarter) {
          startDate = moment([targetSelectedPeriod.year])
            .quarter(targetSelectedPeriod.quarter)
            .startOf("quarter")
            .format("YYYY-MM-DD");
          endDate = moment([targetSelectedPeriod.year])
            .quarter(targetSelectedPeriod.quarter)
            .endOf("quarter")
            .format("YYYY-MM-DD");
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: `${targetSelectedPeriod.year}Q${targetSelectedPeriod.quarter}`,
            startDate,
            endDate,
            quarterName: t("Q" + targetSelectedPeriod.quarter),
          });
        } else {
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            quarterName: "",
          });
        }
        break;
      case "Weekly":
        if (targetSelectedPeriod.year && targetSelectedPeriod.week) {
          startDate = moment([targetSelectedPeriod.year, 1, 1])
            .isoWeek(targetSelectedPeriod.week)
            .startOf("isoWeek")
            .format("YYYY-MM-DD");
          endDate = moment([targetSelectedPeriod.year, 1, 1])
            .isoWeek(targetSelectedPeriod.week)
            .endOf("isoWeek")
            .format("YYYY-MM-DD");
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: `${targetSelectedPeriod.year}W${targetSelectedPeriod.week}`,
            startDate,
            endDate,
            weekName: t("week") + " " + targetSelectedPeriod.week,
          });
        } else {
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            weekName,
          });
        }
        break;
      case "Daily":
        if (targetSelectedPeriod.date) {
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: `${targetSelectedPeriod.date.replace(/-/g, "")}`,
            startDate: targetSelectedPeriod.date,
            endDate: targetSelectedPeriod.date,
          });
        } else {
          setSelectedPeriod({
            ...targetSelectedPeriod,
            dhis2Period: null,
            startDate: "",
            endDate: "",
          });
        }
        break;
      default:
        setSelectedPeriod({
          ...targetSelectedPeriod,
          dhis2Period: null,
          startDate: "",
          endDate: "",
        });
        break;
    }
  };

  useEffect(() => {
    constConvertToDhis2Period();
  }, [JSON.stringify(targetSelectedPeriod)]);

  useEffect(() => {
    let value = "";
    switch (periodType) {
      case "Yearly":
        if (targetSelectedPeriod.year) value = targetSelectedPeriod.year;
        break;
      case "Monthly":
        if (targetSelectedPeriod.year && targetSelectedPeriod.month)
          value =
            targetSelectedPeriod.monthName + " " + targetSelectedPeriod.year;
        break;
      case "Quarterly":
        if (targetSelectedPeriod.year && targetSelectedPeriod.quarter)
          value =
            targetSelectedPeriod.quarterName +
            " - " +
            targetSelectedPeriod.year;
        break;
      case "Weekly":
        if (targetSelectedPeriod.year && targetSelectedPeriod.week)
          value =
            targetSelectedPeriod.weekName + " - " + targetSelectedPeriod.year;
        break;
      case "Daily":
        if (targetSelectedPeriod.date) value = targetSelectedPeriod.date;
        break;
      default:
        break;
    }
    setSelectedPeriod({ ...targetSelectedPeriod, periodName: value });
  }, [targetSelectedPeriod.dhis2Period]);

  return (
    <div className="period-selector-container">
      {renderSelectors}
      <Button variant="contained" onClick={() => handler(targetSelectedPeriod)}>
        {t("apply")}
      </Button>
    </div>
  );
};

export default PeriodSelector;
