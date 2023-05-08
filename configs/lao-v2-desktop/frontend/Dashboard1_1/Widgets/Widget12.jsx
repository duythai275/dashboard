import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import { WIDGET_12_DASHBOARD_1_COLORS } from "../common/constant/color";

import { pull } from "../../utils";

const Widget12 = ({ setLoading }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getDashboard1Widget12Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    const currentData = {
      labels: [],
      datasets: [],
    };
    ["REPORTING_RATE", "REPORTING_RATE_ON_TIME"].forEach((type) => {
      result.metaData.dimensions.dx.forEach((ds) => {
        if (ds.includes("w8XQmI94Spv") && ds.split(".")[1] === type) {
          let object = {
            label: result.metaData.items[ds].name,
            data: [],
          };
          result.metaData.dimensions.ou.forEach((org) => {
            const findData = result.rows.find(
              (row) => row[0].split(".")[1] === type && row[1] === org
            );
            if (findData) {
              object.data.push(parseFloat(findData[2]).toFixed(1));
            } else {
              object.data.push(0);
            }
          });
          currentData.datasets.push(object);
        }
      });
    });

    // result.metaData.dimensions.dx.forEach((ds) => {
    //   // if (ds.includes("w8XQmI94Spv")) {
    //      let object = {
    //        label: result.metaData.items[ds].name,
    //        data: [],
    //      };
    //      result.metaData.dimensions.ou.forEach((org) => {
    //        const findData = result.rows.find(
    //          (row) => row[0] === ds && row[1] === org
    //        );
    //        if (findData) {
    //          object.data.push(parseFloat(findData[2]).toFixed(1));
    //        } else {
    //          object.data.push(0);
    //        }
    //      });
    //      currentData.datasets.push(object);
    //    //}
    //  });

    result.metaData.dimensions.ou.forEach((org) => {
      currentData.labels.push(result.metaData.items[org].name);
    });
    result.rows.forEach((row) => {
      currentData[row.ou] = row.value;
    });
    const colors = WIDGET_12_DASHBOARD_1_COLORS;
    let chartData = {};
    chartData.labels = currentData.labels.map((pe) => {
      return t(pe);
    });
    chartData.datasets = currentData.datasets.map((di, index) => ({
      label: di.label,
      data: di.data,
      borderColor: colors[index],
      backgroundColor: colors[index],
    }));
    setData({ ...chartData });
  }, [i18n.language, JSON.stringify(result)]);
  return data && <BarChart data={data} />;
};
export default withWidgetChildrenLoader(Widget12);
