import { memo, useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import { getRowValue } from "../utils";
import { pull } from "@/utils/fetch";

import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";

const Widget2 = ({ setLoading }) => {
  const orgUnitGeoJson = useMetadataStore(
    (state) => state.orgUnitGeoJson,
    shallow
  );
  const southernRegion = useMetadataStore(
    (state) => state.orgUnitsHfmd,
    shallow
  );

  /* const periodForW4 = useDashboardStore(
    (state) => state.additionalState.periodForW4,
    shallow
  ); */

  const [data, setData] = useState(null);

  const features = useMemo(() => {
    const converted = orgUnitGeoJson.features.reduce(
      (result, current) => ({
        ...result,
        [current.id]: current,
      }),
      {}
    );

    return southernRegion.map(({ id }) => converted[id]);
  }, [orgUnitGeoJson]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await pull(
        `/api/analytics.json?dimension=dx:${covid19caseId}&dimension=ou:${southernRegion
          .map(({ id }) => id)
          .join(";")}&filter=pe:${2022}`
      );

      const resultReduce = features.reduce((result, feature, idx) => {
        result[feature.id] = Math.round(Math.random() * 1000);
        return result;
      }, {});

      setData(resultReduce);
      setLoading(false);
    })();
  }, [features]);

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

const covid19caseId = "waN4A6qQwuE";

export default withWidgetChildrenLoader(memo(Widget2));
