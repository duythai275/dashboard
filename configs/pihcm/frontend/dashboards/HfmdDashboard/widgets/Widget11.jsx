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

const Widget11 = ({ setLoading }) => {
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
  const { selectedPeriod } = additionalState;

  const pcrOptions = useMemo(() => {
    if (!dataElementsHfmd) {
      return [];
    }

    return dataElementsHfmd.find((de) => de.id === "XpCLafoPAhT").optionSet
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
        )}&dimension=S5NIYcQo2pz.XpCLafoPAhT&stage=S5NIYcQo2pz&displayProperty=NAME&totalPages=false&outputType=EVENT`
      );
      if (result) {
        const pcrIndex = findHeaderIndex(
          result.headers,
          "S5NIYcQo2pz.XpCLafoPAhT"
        );
        const dataResult = pcrOptions.map((option) => {
          const caseValue = result.rows
            .map((row) => {
              if (row[pcrIndex] === option.code) {
                return row;
              }
              return null;
            })
            .filter((item) => item);

          return {
            option,
            case: ((caseValue.length / result.rows.length) * 100).toFixed(1),
          };
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
  return (
    <PieChart
      customOptions={options}
      data={{
        labels: pcrOptions.map((item) => item.displayName),
        datasets: [
          {
            type: "pie",
            label: "",
            backgroundColor: pcrOptions.map((item) => item.style.color),
            // data: data.map(item => item.case),
            data: pcrOptions
              .reduce((prev, curr) => {
                if (prev.length === 0) {
                  return [...prev, _.random(1, 100, true)];
                }
                if (prev.length === pcrOptions.length - 1) {
                  return [
                    ...prev,
                    100 - prev.reduce((prev1, curr1) => prev1 + curr1, 0),
                  ];
                }
                return [
                  ...prev,
                  _.random(
                    1,
                    100 - prev.reduce((prev1, curr1) => prev1 + curr1, 0),
                    true
                  ),
                ];
              }, [])
              .map((item) => item.toFixed(1)),
          },
        ],
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget11);
