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
      const result = await Promise.all([
        await pull(
          `/api/getDashboard3Widget1Tab1Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
        await pull(
          `/api/getDashboard3Widget1Tab2Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
        await pull(
          `/api/getDashboard3Widget1Tab3Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
        await pull(
          `/api/getDashboard3Widget1Tab4Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
        await pull(
          `/api/getDashboard3Widget1Tab5Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
      ]);
      const popLiveBirth = result[0].data.popLiveBirth;
      setResult({
        [LIST_TABS[0]]: result[0].data,
        [LIST_TABS[1]]: { ...result[1].data, popLiveBirth },
        [LIST_TABS[2]]: { ...result[2].data, popLiveBirth },
        [LIST_TABS[3]]: { ...result[3].data, popLiveBirth },
        [LIST_TABS[4]]: { ...result[4].data, popLiveBirth },
      });
      setLoading(false);
    })();
  }, [selectedOu, selectedPeriod]);
  return result;
};

export default useData;
