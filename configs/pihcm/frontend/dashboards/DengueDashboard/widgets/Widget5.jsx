import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { findHeaderIndex } from "@/config/utils";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";

const Widget5 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const { i18n, t } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, selectedOrgUnit } = additionalState;

  const weeks = useMemo(() => {
    let weeks = [];
    for (let i = 1; i <= 52; i++) {
      weeks.push(`W${i}`);
    }
    return weeks;
  }, []);
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
        const listPeriod = weeks.map((week) => `${selectedPeriod}${week}`);
        const result = await pull(
          `/api/analytics?dimension=dx:etpZUT5JAkW;mVrQMb86ESf,ou:${
            selectedOrgUnit?.id
          }${ouGroup && `;OU_GROUP-${ouGroup}`}&filter=pe:${listPeriod.join(
            ";"
          )}&displayProperty=NAME&includeNumDen=false&skipMeta=false&skipData=false`
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
          size: 12,
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
                  (item) => item.dx === "mVrQMb86ESf"
                );
                const lestThanAndEqual15Data = data.filter(
                  (item) => item.dx === "etpZUT5JAkW"
                );
                if (legend === "<=15") {
                  return getTotal(lestThanAndEqual15Data);
                }
                return getTotal(totalData) - getTotal(lestThanAndEqual15Data);
              }),
              backgroundColor: "#50B432",
              maxBarThickness: 60,
            },
          ],
        }}
        customOptions={options}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget5);

const listLegend = ["<=15", "> 15"];
