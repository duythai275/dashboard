import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import { useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import { getRowValue, sortArray } from "../utils";
import { pull } from "@/utils/fetch";
import useDashboardStore from "@/state/dashboard";

const Widget4 = ({ pepfarProvinces, outsidePepfarProvinces, setLoading }) => {
  const orgUnitGeoJson = useMetadataStore(
    (state) => state.orgUnitGeoJson,
    shallow
  );
  const periodForW4 = useDashboardStore(
    (state) => state.additionalState.periodForW4,
    shallow
  );

  const [data, setData] = useState(null);

  const features = useMemo(() => {
    const converted = orgUnitGeoJson.features.reduce(
      (result, current) => ({
        ...result,
        [current.id]: current,
      }),
      {}
    );

    return sortArray(pepfarProvinces.concat(outsidePepfarProvinces)).map(
      ({ id }) => converted[id]
    );
  }, [orgUnitGeoJson, pepfarProvinces, outsidePepfarProvinces]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!periodForW4) return;
      const { year } = periodForW4;

      const res = await pull(
        `/api/analytics.json?dimension=dx:${redIds.join(
          ";"
        )}&dimension=ou:${pepfarProvinces
          .concat(outsidePepfarProvinces)
          .map(({ id }) => id)
          .join(";")}&filter=pe:${year}`
      );

      const calculateRed = (ou) => {
        const redValues = getRowValue(res, redIds, ou);
        return (
          parseInt(redValues[0]) +
          parseInt(redValues[1]) -
          (parseInt(redValues[2]) + parseInt(redValues[3]))
        );
      };

      const resultReduce = features.reduce((result, feature, idx) => {
        const value = calculateRed(feature.id);

        result[feature.id] = Math.round(Math.random() * 100);
        return result;
      }, {});

      setData(resultReduce);
      setLoading(false);
    })();
  }, [features, periodForW4]);

  return (
    data && (
      <ThematicMap
        data={data}
        features={features}
        legend={["#689F38", "#AFB42B", "#FBC02D", "#F57C00", "#AC0800"]}
        legendSet={[
          { color: "#689F38", max: 0, min: 0 },
          { color: "#AFB42B", max: 33, min: 1 },
          { color: "#FBC02D", max: 66, min: 34 },
          { color: "#F57C00", max: 99, min: 67 },
          { color: "#AC0800", max: 100, min: 100 },
        ]}
      />
    )
  );
};

const redIds = [
  "eupLO26vvX8",
  "ZzGVNzKxZdX",
  "eupLO26vvX8.CksScNpnanY",
  "ZzGVNzKxZdX.CksScNpnanY",
];

export default withWidgetChildrenLoader(Widget4);
