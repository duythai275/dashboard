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

const Widget2 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { orgUnitInfluenza, orgUnitInfluenzaColors } = useMetadataStore(
    (state) => ({
      orgUnitInfluenza: state.orgUnitInfluenza,
      orgUnitInfluenzaColors: state.orgUnitInfluenzaColors
    }),
    shallow
  );
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, selectedOrgUnitInfluenza, grandTotalName } = additionalState;

  const [data, setData] = useState(null);

  const weeks = useMemo(() => {
    let totalWeeks = selectedPeriod
      ? moment([selectedPeriod, 1, 1]).isoWeeksInYear()
      : 0;
    let weeks = [];
    for (let i = 1; i <= totalWeeks; i++) {
      weeks.push(`${selectedPeriod}W${i}`);
    }
    return weeks;
  }, [selectedPeriod]);

  const orgUnits = useMemo(() => {
    return orgUnitInfluenza.map((ou) => ou.id);
  }, []);

  useEffect(() => {
    if (!weeks || !selectedOrgUnitInfluenza || !orgUnits) return;
    (async () => {
      try {
        setLoading(true);
        console.log(orgUnits);
        const result = await pull(
          `/api/analytics/events/aggregate/H9DEFEUTxGc.json?dimension=ou:${orgUnits.join(
            ";"
          )};Vp8x14BDil5&dimension=pe:${weeks.join(
            ";"
          )}&stage=cbLhNJnxYzi&displayProperty=NAME&totalPages=false&outputType=EVENT`
        );
        if (result) {
          const periodIndex = findHeaderIndex(result.headers, "pe");
          const valueIndex = findHeaderIndex(result.headers, "value");
          const ouIndex = findHeaderIndex(result.headers, "ou");

          const dataResult = result.rows.map((row) => ({
            ou: row[ouIndex],
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
  }, [weeks, selectedOrgUnitInfluenza?.id]);

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
          labels: weeks.map((week) =>
            t("labelWidget1", { week: week.split("W")[1] })
          ),
          datasets: [
            ...orgUnitInfluenza.map((ou, index) => ({
              type: "line",
              label: ou.displayName,
              data: weeks.map((week) => {
                const foundData = data.find(
                  (item) => item.period === week && item.ou === ou.id
                );
                return foundData?.value || 0;
              }),
              backgroundColor: orgUnitInfluenzaColors[index],
              borderColor: orgUnitInfluenzaColors[index],
            })),
            ...[
              {
                type: "line",
                label: grandTotalName,
                data: weeks.map((week) => {
                  const foundData = data.find(
                    (item) => item.period === week && item.ou === "Vp8x14BDil5"
                  );
                  return foundData?.value || 0;
                }),
                backgroundColor: orgUnitInfluenzaColors[orgUnitInfluenzaColors.length - 1],
                borderColor: orgUnitInfluenzaColors[orgUnitInfluenzaColors.length - 1],
              },
            ],
          ],
        }}
        customOptions={options}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget2);
