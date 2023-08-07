import MultitypeChart from "@/components/Widgets/MultitypeChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";
import { pull } from "@/utils/fetch";
import { findHeaderIndex } from "../../../utils";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { getISOWeek } from "date-fns";
import LineChart from "@/components/Widgets/LineChart";
import moment from "moment";
import useMetadataStore from "@/state/metadata";

const Widget1 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { optionsInfluenza, optionsInfluenzaColors } = useMetadataStore(
    (state) => ({
      optionsInfluenza: state.optionsInfluenza,
      optionsInfluenzaColors: state.optionsInfluenzaColors
    }),
    shallow
  );
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, selectedOrgUnitInfluenza } = additionalState;
  const [data, setData] = useState(null);

  const listLast10Years = useMemo(() => {
    if (!selectedPeriod) return null;
    let result = [];
    let currentYear = selectedPeriod;
    while (result.length < 10) {
      result.push(currentYear);
      currentYear--;
    }
    return result.reverse();
  }, [selectedPeriod]);

  useEffect(() => {
    if (!listLast10Years || !selectedOrgUnitInfluenza || !optionsInfluenzaColors) return;
    (async () => {
      try {
        setLoading(true);
        const result = await pull(
          `/api/analytics/events/aggregate/H9DEFEUTxGc.json?dimension=ou:${
            selectedOrgUnitInfluenza?.id
          }&dimension=pe:${listLast10Years.join(
            ";"
          )}&dimension=cbLhNJnxYzi.LPXRRN8Uvnj&stage=cbLhNJnxYzi&displayProperty=NAME&totalPages=false&outputType=EVENT`
        );
        if (result) {
          const periodIndex = findHeaderIndex(result.headers, "pe");
          const valueIndex = findHeaderIndex(result.headers, "value");
          const deIndex = findHeaderIndex(result.headers, "LPXRRN8Uvnj");

          const dataResult = result.rows.map((row) => ({
            code: row[deIndex],
            period: row[periodIndex],
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
  }, [listLast10Years, selectedOrgUnitInfluenza?.id]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 18,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          useLineStyle: true,
          boxHeight: 0,
        },
      },
      datalabels: {
        display: false,
        anchor: "end",
        align: "end",
        offset: -5,
        color: "#fff",
        borderColor: "#000",
        textStrokeColor: "black",
        textStrokeWidth: 3,
        font: {
          size: 12,
        },
      },
    },
  };

  return (
    data && (
      <LineChart
        data={{
          labels: listLast10Years.map((year) => year),
          datasets: optionsInfluenza.map((option, index) => ({
            type: "line",
            label: option.name,
            data: listLast10Years.map((year) => {
              const foundData = data.find(
                (item) => item.period === `${year}` && item.code === option.code
              );
              return foundData?.value || 0;
            }),
            backgroundColor: optionsInfluenzaColors[index],
            borderColor: optionsInfluenzaColors[index],
          })),
        }}
        customOptions={options}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget1);
