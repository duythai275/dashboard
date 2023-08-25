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
import { getISOWeek } from "date-fns";
import { useMemo } from "react";

const Widget3 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { orgUnits } = useMetadataStore(
    (state) => ({ orgUnits: state.communes }),
    shallow
  );

  const [data, setData] = useState(null);
  const { selectedPeriod, selectedOrgUnitForHfmdDashboard } = additionalState;

  const listOrgUnit = useMemo(() => {
    if (!selectedOrgUnitForHfmdDashboard || !orgUnits) return null;
    const result = [];
    orgUnits.forEach((ou) => {
      if (ou.parent?.id === selectedOrgUnitForHfmdDashboard.id) {
        result.push(ou);
      }
    });
    if (!result.length) {
      return [selectedOrgUnitForHfmdDashboard];
    }
    return result;
  }, [selectedOrgUnitForHfmdDashboard, orgUnits]);

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
        listPeriod.push(`${period}W${getISOWeek(new Date())}`);
      });
      const result = await pull(
        `/api/analytics/events/query/AczMEDapsFu.json?dimension=ou:${listOrgUnit
          .map((ou) => ou.id)
          .join(";")}&dimension=pe:${listPeriod.join(
          ";"
        )}&stage=S5NIYcQo2pz&displayProperty=NAME&paging=false&outputType=EVENT`
      );
      if (result) {
        const ouIndex = findHeaderIndex(result.headers, "ou");
        const dataResult = listOrgUnit.map((ou) => {
          const caseValue = result.rows
            .map((row) => {
              const targetOrgUnit = orgUnits.find(
                (item) => item.id === row[ouIndex]
              );
              if (
                targetOrgUnit.ancestors.find((item) => item.id === ou.id) ||
                targetOrgUnit.id === ou.id
              ) {
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
    if (!selectedPeriod || !listOrgUnit) return;

    getData();
  }, [selectedPeriod, listOrgUnit]);

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
          : listOrgUnit.map((ou) => ou.displayName),
        datasets: [
          {
            type: "bar",
            label: "",
            backgroundColor: "#4F81BC",
            data: data.map((item) => item.case),
          },
        ],
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget3);
