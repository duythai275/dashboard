import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import MultitypeChart from "@/components/Widgets/MultitypeChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";
import { WIDGET_11_DASHBOARD_3_COLORS } from "../common/constant/color";

const Widget11 = ({ setLoading }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (additionalState.widget1112Dashboard3Ready) {
      setResult(additionalState.widget1112Dashboard3Data);
    }
    setLoading(!additionalState.widget1112Dashboard3Ready);
  }, [additionalState.widget1112Dashboard3Ready]);
  useEffect(() => {
    if (!result) return;
    const currentData = {
      labels: [],
      datasets: [],
    };
    result.metaData.dimensions.dx.forEach((ds) => {
      let object = {
        label: result.metaData.items[ds].name,
        data: [],
      };
      result.metaData.dimensions.ou.forEach((org) => {
        const findData = result.rows.find(
          (row) => row[0] === ds && row[1] === org
        );
        if (findData) {
          object.data.push(parseFloat(findData[2]).toFixed(1));
        } else {
          object.data.push(0);
        }
      });
      currentData.datasets.push(object);
    });
    result.metaData.dimensions.ou.forEach((org) => {
      currentData.labels.push(result.metaData.items[org].name);
    });
    result.rows.forEach((row) => {
      currentData[row.ou] = row.value;
    });
    const colors = WIDGET_11_DASHBOARD_3_COLORS;
    let chartData = {};
    chartData.labels = currentData.labels.map((pe) => {
      return t(pe);
    });
    chartData.datasets = currentData.datasets.map((di, index) => ({
      label: di.label,
      data: di.data,
      type: "bar",
      borderColor: colors[index],
      backgroundColor: colors[index],
    }));
    chartData.datasets.push({
      label: t("target"),
      type: "line",
      data: result.metaData.dimensions.ou.map((o) => {
        return 95;
      }),
      borderColor: "rgb(215, 69, 84)",
      backgroundColor: "rgb(215, 69, 84)",
    });
    setData({ ...chartData });
  }, [i18n.language, JSON.stringify(result)]);
  return data && <MultitypeChart data={data} />;
};
export default withWidgetChildrenLoader(Widget11);
