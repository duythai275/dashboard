import MultitypeChart from "@/components/Widgets/MultitypeChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { months } from "../constants";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { findHeaderIndex, transformDate } from "@/config/utils";
import _ from "lodash";

const Widget1 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const [data, setData] = useState(null);

  const { selectedPeriod } = additionalState;

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
          for (let i = 1; i <= new Date().getMonth() + 1; i++) {
            const month = i < 10 ? `0${i}` : i;
            listPeriod.push(`${period}${month}`);
          }
        } else {
          for (let i = 1; i <= 12; i++) {
            const month = i < 10 ? `0${i}` : i;
            listPeriod.push(`${period}${month}`);
          }
        }
      });

      const result = await pull(
        `/api/analytics/events/query/AczMEDapsFu.json?dimension=pe:${listPeriod.join(
          ";"
        )}&dimension=S5NIYcQo2pz.Tfrvuy0pKlb&stage=S5NIYcQo2pz&displayProperty=NAME&totalPages=false&outputType=EVENT`
      );
      if (result) {
        const eventDateIndex = findHeaderIndex(result.headers, "eventDate");
        const statusIndex = findHeaderIndex(
          result.headers,
          "S5NIYcQo2pz.Tfrvuy0pKlb"
        );
        const dataResult = listPeriod.map((period) => {
          const caseValue = result.rows
            .map((row) => {
              const transformedEventDate = transformDate(row[eventDateIndex]);
              if (transformedEventDate === period) {
                return row;
              }
              return null;
            })
            .filter((item) => item);
          const deathValue = result.rows
            .map((row) => {
              const transformedEventDate = transformDate(row[eventDateIndex]);
              if (transformedEventDate === period && row[statusIndex] === "2") {
                return row;
              }
              return null;
            })
            .filter((item) => item);
          return { case: caseValue.length, death: deathValue.length };
        });
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
    layout: {
      padding: 18,
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: t("deathCase"),
          font: {
            size: 20,
            weight: "bold",
            lineHeight: 1.2,
          },
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: t("case"),
          font: {
            size: 20,
            weight: "bold",
            lineHeight: 1.2,
          },
        },
        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
    plugins: {
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
          size: 10,
        },
      },
    },
  };
  return (
    <MultitypeChart
      customOptions={options}
      data={{
        labels: months.map((month) => t(month)),
        datasets: [
          {
            type: "line",
            label: t("deathCase"),
            backgroundColor: "#BF4F47",
            // data: data.death,
            data: months.map((month) => _.random(100)),
            borderColor: "#BF4F47",
            borderWidth: 4,
          },
          {
            type: "bar",
            label: t("case"),
            backgroundColor: "#4F81BC",
            // data: data.case,
            data: months.map((month) => _.random(1000)),
            yAxisID: "y1",
          },
        ],
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget1);

const weeks = [];
