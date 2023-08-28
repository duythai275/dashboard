import { memo, useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import _ from "lodash";

import { pull } from "@/utils/fetch";
import useDashboardStore from "@/state/dashboard";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import BarChart from "@/components/Widgets/BarChart";
import { getRowValue } from "../utils";

const Widget3 = ({ setLoading, listOu }) => {
  const [data, setData] = useState(null);

  const period = useDashboardStore(
    (state) => state.additionalState.caseCovid19W3Period,
    shallow
  );

  const barData = useMemo(() => {
    if (!data) return;
    return {
      labels: data.map(({ label }) => label),
      datasets: [
        {
          type: "bar",
          label: "Nam",
          backgroundColor: "#50B432",
          data: data.map(({ male }) => male),
        },
        {
          type: "bar",
          label: "Nữ",
          backgroundColor: "#058DC7",
          data: data.map(({ female }) => female),
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
        `/api/analytics/events/aggregate/y102P5LbNJP.json?dimension=${DX_ID}:IN:1;2&dimension=ou:${listOu
          .map(({ id }) => id)
          .join(
            ";"
          )}&filter=pe:${year}&stage=Fagq1tPjhyG&displayProperty=NAME&outputType=EVENT&sortOrder=DESC`
      );
      const resultValue = listOu.map((ou) => ({
        label: ou.displayName,
        male: getRowValue(res, [MALE], ou.id, DX_ID)[0],
        female: getRowValue(res, [FEMALE], ou.id, DX_ID)[0],
      }));

      setData(resultValue);
      setLoading(false);
    })();
  }, [period]);

  if (!barData) return null;
  return <BarChart data={barData} />;
};

const DX_ID = "QbtMFmsfVas";
const MALE = "1";
const FEMALE = "2";

export default withWidgetChildrenLoader(memo(Widget3));
