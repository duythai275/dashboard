import { useEffect, useState } from "react";

import { orgUnitFilter } from "../common/constant/orgUnitFilter";
import { getListPeriod } from "../common/function/getListPeriod";
import { pull } from "../../utils";
import { LIST_TABS } from "../common/constant/listTab";

const useData = (selectedOu, selectedPeriod, setLoading) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!selectedOu || !selectedPeriod || !getListPeriod(selectedPeriod).valid)
      return;
    (async () => {
      setLoading(true);
      const oug = orgUnitFilter
        .find((item) => item.level === selectedOu.level)
        .oug.map((item) => `OU_GROUP-${item}`)
        .join(";");
      const period = getListPeriod(selectedPeriod).listPeriod.join(";");
      const year = getListPeriod(selectedPeriod).year;

      const result = await Promise.all(
        LIST_TABS.map((_, index) => {
          return pull(
            `/api/getDashboard3Widget1Tab${index + 1}Data?ou=${
              selectedOu.id
            }&oug=${oug}&period=${period}&year=${year}`
          );
        })
      );
      const popLiveBirth = result[0].data.popLiveBirth;
      const dataResult = {};
      LIST_TABS.forEach((item, index) => {
        const data =
          index === 0
            ? result[index].data
            : { ...result[index].data, popLiveBirth };
        dataResult[item] = data;
      });
      setResult(dataResult);
      setLoading(false);
    })();
  }, [selectedOu, selectedPeriod]);
  return result;
};

export default useData;
