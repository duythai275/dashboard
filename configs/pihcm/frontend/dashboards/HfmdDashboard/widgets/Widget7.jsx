import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { findHeaderIndex } from "@/config/utils";
import _ from "lodash";
import useMetadataStore from "@/state/metadata";
import { getISOWeek, getISOWeeksInYear } from "date-fns";
import PieChart from "@/components/Widgets/PieChart";

const Widget7 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState, changeAdditionalStateProperty } = useDashboardStore(
    (state) => ({
      additionalState: state.additionalState,
      changeAdditionalStateProperty: state.changeAdditionalStateProperty,
    }),
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

  const diseaseClassificationOptions = useMemo(() => {
    if (!dataElementsHfmd) {
      return [];
    }
    return dataElementsHfmd.find((de) => de.id === "Qhl25WHDjxK").optionSet
      .options;
  }, [dataElementsHfmd]);

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
        }&dimension=S5NIYcQo2pz.Qhl25WHDjxK&stage=S5NIYcQo2pz&displayProperty=NAME&paging=false&outputType=EVENT`
      );
      if (result) {
        const diseaseClassificationIndex = findHeaderIndex(
          result.headers,
          "S5NIYcQo2pz.Qhl25WHDjxK"
        );
        const dataResult = diseaseClassificationOptions.map((option) => {
          const caseValue = result.rows
            .map((row) => {
              if (row[diseaseClassificationIndex] === option.code) {
                return row;
              }
              return null;
            })
            .filter((item) => item);

          return {
            option,
            case:
              ((caseValue.length / result.rows.length) * 100).toFixed(1) * 1 ||
              0,
          };
        });

        changeAdditionalStateProperty(
          "widget7HfmdDashboardTotal",
          result.rows.length
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
    plugins: {
      legend: {
        position: "bottom",
      },
      datalabels: {
        anchor: "center",
        align: "center",
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
  //   {
  //     labels: result.dx.map((dx) => {
  //       const foundIndicator = indicators.find((indicator) => indicator.id === dx);
  //       const indicatorsName = localeName === "En" ? foundIndicator.nameEn : foundIndicator.nameLo;
  //       return indicatorsName;
  //     }),
  //     datasets: [
  //       {
  //         label: "",
  //         data: result.dx.map((dx) => {
  //           const foundRow = result.data.filter((row) => row.dx === dx);

  //           return foundRow.length ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0) : 0;
  //         }),
  //         backgroundColor: ["#A8BF24", "#518CC3", "#D74554", "#FFA025", "#968F8F", "#BB3FA3"]
  //       }
  //     ]
  //   }
  return (
    <PieChart
      customOptions={options}
      data={{
        labels: diseaseClassificationOptions.map((item) => item.displayName),
        datasets: [
          {
            type: "pie",
            label: "",
            backgroundColor: diseaseClassificationOptions.map(
              (item) => item.style.color
            ),
            data: data.map((item) => item.case),
          },
        ],
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget7);
