import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { findHeaderIndex, getListWeek } from "@/config/utils";
import _ from "lodash";
import { getISOWeek, getISOWeeksInYear, getYear } from "date-fns";
import LineChart from "@/components/Widgets/LineChart";

const Widget9 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );

  const [data, setData] = useState(null);
  const { selectedPeriod } = additionalState;

  const listWeek = useMemo(() => {
    return getListWeek(selectedPeriod).map((item) => item + 1);
  }, [selectedPeriod]);

  const getData = async () => {
    try {
      setLoading(true);
      let listPeriod = [];
      (selectedPeriod
        ? typeof selectedPeriod !== "object"
          ? [selectedPeriod]
          : selectedPeriod
        : []
      ).map((period) => {
        if (period === new Date().getFullYear()) {
          for (let i = 1; i <= getISOWeek(new Date()); i++) {
            listPeriod.push(`${period}W${i}`);
          }
        } else {
          for (let i = 1; i <= getISOWeeksInYear(new Date(period)); i++) {
            listPeriod.push(`${period}W${i}`);
          }
        }
      });
      const result = await pull(
        `/api/analytics/events/query/AczMEDapsFu.json?dimension=pe:${listPeriod.join(
          ";"
        )}&dimension=S5NIYcQo2pz.Qhl25WHDjxK&stage=S5NIYcQo2pz&displayProperty=NAME&totalPages=false&outputType=EVENT`
      );
      if (result) {
        const diseaseClassificationIndex = findHeaderIndex(
          result.headers,
          "S5NIYcQo2pz.Qhl25WHDjxK"
        );
        const eventDateIndex = findHeaderIndex(result.headers, "eventdate");
        const rowFiltered = result.rows.filter((row) =>
          ["2B", "3", "4"].includes(row[diseaseClassificationIndex])
        );
        const dataResult = selectedPeriod.map((period) =>
          listWeek
            .map((week) => {
              if (
                period === new Date().getFullYear() &&
                week > getISOWeek(new Date())
              ) {
                return null;
              }
              if (getISOWeeksInYear(period) < week) {
                return null;
              }
              const caseValue = rowFiltered
                .map((row) => {
                  if (
                    getISOWeek(row[eventDateIndex]) === week &&
                    getYear(row[eventDateIndex]) === period
                  ) {
                    return row;
                  }
                  return null;
                })
                .filter((item) => item);

              return caseValue.length;
            })
            .filter((item) => item === 0 || item)
        );
        setData(dataResult);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedPeriod) return;

    getData();
  }, [selectedPeriod]);
  if (!data) return null;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    pointRadius: 4,
    layout: {
      padding: 18,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        offset: -5,
        color: "#fff",
        borderColor: "#000",
        textStrokeColor: "black", // <-- added this
        textStrokeWidth: 3, // <-- added this,
        font: {
          size: 10,
        },
      },
    },
  };
  return (
    <LineChart
      customOptions={options}
      data={{
        labels: listWeek,
        datasets: selectedPeriod.map((period, index) => ({
          type: "line",
          label: period,
          backgroundColor: COLORS[index],
          borderColor: COLORS[index],

          // data: data[index],
          data: listWeek
            .map((week) => {
              if (
                period === new Date().getFullYear() &&
                week > getISOWeek(new Date())
              ) {
                return null;
              }
              if (getISOWeeksInYear(period) < week) {
                return null;
              }
              return _.random(100);
            })
            .filter((item) => item === 0 || item),
        })),
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget9);

const COLORS = ["#FF0000", "#575757", "#F5B78C", "#AF8CCA", "#97B0DE"];
