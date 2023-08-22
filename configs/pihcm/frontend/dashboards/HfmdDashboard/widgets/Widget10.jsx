import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { findHeaderIndex } from "@/config/utils";
import _ from "lodash";
import useMetadataStore from "@/state/metadata";
import BarChart from "@/components/Widgets/BarChart";
import { getISOWeek, getISOWeeksInYear } from "date-fns";

const Widget10 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { orgUnitsHfmd } = useMetadataStore(
    (state) => ({
      orgUnitsHfmd: state.orgUnitsHfmd,
    }),
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
        `/api/analytics/events/query/AczMEDapsFu.json?dimension=ou:${orgUnitsHfmd
          .map((ou) => ou.id)
          .join(";")}&dimension=pe:${listPeriod.join(
          ";"
        )}&dimension=S5NIYcQo2pz.Qhl25WHDjxK&stage=S5NIYcQo2pz&displayProperty=NAME&totalPages=false&outputType=EVENT`
      );
      if (result) {
        const diseaseClassificationIndex = findHeaderIndex(
          result.headers,
          "S5NIYcQo2pz.Qhl25WHDjxK"
        );
        const ouIndex = findHeaderIndex(result.headers, "ou");

        const rowFiltered = result.rows.filter((row) =>
          ["2B", "3", "4"].includes(row[diseaseClassificationIndex])
        );
        const dataResult = orgUnitsHfmd.map((ou) => {
          const caseValue = rowFiltered
            .map((row) => {
              if (row[ouIndex] === ou.id) {
                return row;
              }
              return null;
            })
            .filter((item) => item);

          return { ou, case: caseValue.length };
        });
        setData(_.orderBy(dataResult, ["case"], ["desc"]));
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
        labels: data.length
          ? data.map((item) => item.ou.displayName)
          : orgUnitsHfmd.map((ou) => ou.displayName),
        datasets: [
          {
            type: "bar",
            label: "",
            backgroundColor: "#4F81BC",
            // data: data.map(item => item.case),
            data: _.orderBy(
              orgUnitsHfmd.map((ou) => _.random(100)),
              [],
              "desc"
            ),
          },
        ],
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget10);
