import { memo, useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import _ from "lodash";

import { pull } from "@/utils/fetch";
import useDashboardStore from "@/state/dashboard";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import BarChart from "@/components/Widgets/BarChart";
import { getRowValue } from "../utils";

const Widget4 = ({ setLoading, listOu }) => {
  const [data, setData] = useState(null);

  const period = useDashboardStore(
    (state) => state.additionalState.caseCovid19W4Period,
    shallow
  );

  const barData = useMemo(() => {
    if (!data) return;
    return {
      labels: data.map(({ label }) => label),
      datasets: [
        {
          type: "bar",
          label: "<= 15",
          backgroundColor: "#50B432",
          data: data.map(({ lt15 }) => lt15 || _.random(100)),
        },
        {
          type: "bar",
          label: "> 15",
          backgroundColor: "#058DC7",
          data: data.map(({ gt15 }) => gt15 || _.random(100)),
        },
      ],
    };
  }, [data]);

  useEffect(() => {
    (async () => {
      if (!period) return;
      const { year } = period;
      setLoading(true);

      const res = await pull(
        `/api/analytics/events/aggregate/y102P5LbNJP.json?dimension=${DX_ID}-M7dPs8TiNkb&dimension=ou:${listOu
          .map(({ id }) => id)
          .join(
            ";"
          )}&filter=pe:${year}&stage=Fagq1tPjhyG&displayProperty=NAME&outputType=EVENT&sortOrder=DESC`
      );
      const resultValue = listOu.map((ou) => ({
        label: ou.displayName,
        lt15: getRowValue(res, [Lt15], ou.id, DX_ID)[0],
        gt15: getRowValue(res, [Gt15], ou.id, DX_ID)[0],
      }));

      setData(resultValue);
      setLoading(false);
    })();
  }, [period]);

  if (!barData) return null;
  return <BarChart data={barData} />;
};

const DX_ID = "Tf2molwTpPC";
const Lt15 = "xZyo4iUrVQa";
const Gt15 = "RAVbFjfDdpX";

export default withWidgetChildrenLoader(memo(Widget4));
