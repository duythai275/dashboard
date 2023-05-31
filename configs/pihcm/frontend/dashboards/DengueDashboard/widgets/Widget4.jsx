import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { findHeaderIndex } from "@/config/utils";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";

const Widget4 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const { i18n, t } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, selectedOrgUnit } = additionalState;
  useEffect(() => {
    if (!selectedPeriod || !selectedOrgUnit) return;
    (async () => {
      try {
        setLoading(true);
        const ouGroup = (() => {
          switch (selectedOrgUnit.level) {
            case 1:
              return "rNQI8VXXCD0";
            case 2:
              return "F02s7E0zJlM";
            default:
              return "";
          }
        })();
        const result = await pull(
          `/api/analytics?dimension=dx:hl9VTQA9Sor;YY9B8VjuLqo;laUqDdeLgDx,ou:${
            selectedOrgUnit?.id
          }${
            ouGroup && `;OU_GROUP-${ouGroup}`
          }&filter=pe:${selectedPeriod}&displayProperty=NAME&includeNumDen=false&skipMeta=false&skipData=false`
        );
        if (result) {
          const dxIndex = findHeaderIndex(result.headers, "dx");
          const ouIndex = findHeaderIndex(result.headers, "ou");
          const valueIndex = findHeaderIndex(result.headers, "value");

          const dataResult = result.rows.map((row) => ({
            dx: row[dxIndex],
            ou: row[ouIndex],
            value: row[valueIndex] * 1,
          }));
          setData(dataResult);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedPeriod, selectedOrgUnit?.id]);

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
    data && (
      <BarChart
        data={{
          labels: listLegend,
          datasets: [
            {
              label: "",
              data: listLegend.map((legend) => {
                const getTotal = (array) => {
                  return array.reduce(
                    (prev, curr) => prev + (curr.value * 1 || 0),
                    0
                  );
                };
                const totalData = data.filter(
                  (item) => item.dx === "laUqDdeLgDx"
                );
                const lestThan15Data = data.filter(
                  (item) => item.dx === "hl9VTQA9Sor"
                );
                const equal15Data = data.filter(
                  (item) => item.dx === "YY9B8VjuLqo"
                );
                if (legend === "<=15") {
                  return getTotal(lestThan15Data) + getTotal(equal15Data);
                }
                return (
                  getTotal(totalData) -
                  (getTotal(lestThan15Data) + getTotal(equal15Data))
                );
              }),
              backgroundColor: "#50B432",
            },
          ],
        }}
        customOptions={options}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget4);

const listLegend = ["<=15", "> 15"];
