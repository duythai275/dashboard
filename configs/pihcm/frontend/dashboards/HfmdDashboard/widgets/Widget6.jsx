import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { findHeaderIndex } from "@/config/utils";
import _ from "lodash";
import BarChart from "@/components/Widgets/BarChart";
import { differenceInDays, getISOWeek, getISOWeeksInYear } from "date-fns";

const Widget6 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );

  const [data, setData] = useState(null);
  const { selectedPeriod, selectedOrgUnitForHfmdDashboard } = additionalState;

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
        `/api/analytics/events/query/AczMEDapsFu.json?&dimension=pe:${listPeriod.join(
          ";"
        )}&dimension=ou:${
          selectedOrgUnitForHfmdDashboard.id
        }&dimension=cbLhNJnxYzi.FFMXHo13JGY&dimension=cbLhNJnxYzi.pbfShtLC9RH&stage=S5NIYcQo2pz&displayProperty=NAME&paging=false&outputType=EVENT`
      );
      if (result) {
        const dateOfSampleIndex = findHeaderIndex(
          result.headers,
          "cbLhNJnxYzi.pbfShtLC9RH"
        );
        const dateOfIllnessIndex = findHeaderIndex(
          result.headers,
          "cbLhNJnxYzi.FFMXHo13JGY"
        );

        const dataResult = {};
        result.rows.forEach((row) => {
          const date = differenceInDays(
            new Date(dateOfIllnessIndex),
            new Date(dateOfSampleIndex)
          );
          switch (date) {
            case 0:
            case 1:
              dataResult[1] ? (dataResult[1] += 1) : (dataResult[1] = 1);

              break;
            case 2:
              dataResult[2] ? (dataResult[2] += 1) : (dataResult[2] = 1);

              break;
            case 3:
              dataResult[3] ? (dataResult[3] += 1) : (dataResult[3] = 1);

              break;
            case 4:
              dataResult[4] ? (dataResult[4] += 1) : (dataResult[4] = 1);

              break;
            case 5:
              dataResult[5] ? (dataResult[5] += 1) : (dataResult[5] = 1);

              break;

            default:
              if (date < 0) {
                break;
              }
              dataResult["5+"]
                ? (dataResult["5+"] += 1)
                : (dataResult["5+"] = 1);
              break;
          }
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
      legend: {
        position: "bottom",
        display: false,
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
    <BarChart
      customOptions={options}
      data={{
        labels: [1, 2, 3, 4, 5, "5+"].map((item) => `${t("day")} ${item}`),
        datasets: [
          {
            type: "bar",
            label: "",
            backgroundColor: [
              "#FF0000",
              "#00B150",
              "#FFC100",
              "#4F82BE",
              "#DA9795",
              "#604A7B",
            ],
            data: [1, 2, 3, 4, 5, "5+"].map((item) => data[item]),
            maxBarThickness: 120,
          },
        ],
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget6);
