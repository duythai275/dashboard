import { useEffect, useMemo, useState } from "react";
import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import useDashboardStore from "@/state/dashboard";

const Widget5 = ({ setLoading }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);

  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const legend = ["#fde0dd", "#fa9fb5", "#c51b8a"];

  const listTargetPe = useMemo(() => {
    const listPe = [];
    let year = new Date().getFullYear();
    for (let i = 1; i <= 12; i++) {
      listPe.push(`${year - 1}${i > 9 ? i : `0${i}`}`);
    }
    return listPe;
  }, []);

  useEffect(() => {
    if (additionalState.widget1234567Dashboard1Ready) {
      const response = additionalState.widget1234567Dashboard1Data.rows
        .filter(
          (row) =>
            listTargetPe.includes(row[1]) && row[0] === "dJhWRKs0fcq" && row
        )
        .map((row) => ({
          ou: row[2],
          value: parseInt(row[3]),
          pe: row[1],
        }));
      setResult(response);
    }
    setLoading(!additionalState.widget1234567Dashboard1Ready);
  }, [additionalState.widget1234567Dashboard1Ready]);

  useEffect(() => {
    if (!result) return;
    const currentData = {};
    result.forEach((row) => {
      if (currentData[row.ou]) {
        currentData[row.ou] += row.value;
      } else {
        currentData[row.ou] = row.value;
      }
    });
    setData({ ...currentData });
  }, [i18n.language, JSON.stringify(result)]);

  return (
    data && (
      <ThematicMap
        features={hmisGeoJson.features.filter(
          (feature) =>
            feature.properties.level === "2" &&
            feature.geometry.type !== "Point"
        )}
        data={data}
        legend={legend}
      />
    )
  );
};
export default withWidgetChildrenLoader(Widget5);
