import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { findHeaderIndex, getListWeek } from "@/config/utils";
import _ from "lodash";
import useMetadataStore from "@/state/metadata";
import BarChart from "@/components/Widgets/BarChart";
import { getISOWeek, getISOWeeksInYear, getYear } from "date-fns";

const Widget12 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { dataElementsHfmd } = useMetadataStore(
    (state) => ({
      dataElementsHfmd: state.dataElementsHfmd,
    }),
    shallow
  );

  const [data, setData] = useState(null);
  const { selectedPeriod, selectedOrgUnitForHfmdDashboard } = additionalState;

  const pcrOptions = useMemo(() => {
    if (!dataElementsHfmd) {
      return [];
    }

    return dataElementsHfmd.find((de) => de.id === "XpCLafoPAhT").optionSet
      .options;
  }, [dataElementsHfmd]);

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
        )}&dimension=ou:${
          selectedOrgUnitForHfmdDashboard.id
        }&dimension=S5NIYcQo2pz.XpCLafoPAhT&stage=S5NIYcQo2pz&displayProperty=NAME&paging=false&outputType=EVENT`
      );
      if (result) {
        const pcrIndex = findHeaderIndex(
          result.headers,
          "S5NIYcQo2pz.XpCLafoPAhT"
        );
        const eventDateIndex = findHeaderIndex(result.headers, "eventdate");
        const dataResult = pcrOptions.map((option) =>
          listWeek.map((week) => {
            const totalInWeek = result.rows
              .map((row) => {
                if (getISOWeek(new Date(row[eventDateIndex])) === week) {
                  return row;
                }
                return null;
              })
              .filter((item) => item);
            const caseValue = result.rows
              .map((row) => {
                if (
                  getISOWeek(new Date(row[eventDateIndex])) === week &&
                  row[pcrIndex] === option.code
                ) {
                  return row;
                }
                return null;
              })
              .filter((item) => item);

            return (
              ((caseValue.length / totalInWeek.length) * 100).toFixed(1) * 1 ||
              0
            );
          })
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
    if (!selectedPeriod || !selectedOrgUnitForHfmdDashboard) return;

    getData();
  }, [selectedPeriod, selectedOrgUnitForHfmdDashboard]);

  if (!data) return null;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 18,
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            return context[0].label.replaceAll(",", "");
          },
        },
      },
      legend: {
        position: "bottom",
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
          size: 12,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        min: 0,
        max: 100,
        stacked: true,
        ticks: {
          callback: (value, index, ticks) => {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <BarChart
      customOptions={options}
      data={{
        labels: listWeek,
        datasets: pcrOptions.map((option, index) => ({
          type: "bar",
          label: option.displayName,
          backgroundColor: pcrOptions[index].style.color,
          borderColor: pcrOptions[index].style.color,

          data: data[index],
        })),
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget12);
