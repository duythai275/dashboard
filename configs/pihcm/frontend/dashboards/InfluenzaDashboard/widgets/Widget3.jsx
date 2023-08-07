import MultitypeChart from "@/components/Widgets/MultitypeChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";
import { pull } from "@/utils/fetch";
import { findHeaderIndex } from "../../../utils";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { getISOWeek } from "date-fns";
import BarChart from "@/components/Widgets/BarChart";
import moment from "moment";
import useMetadataStore from "@/state/metadata";

const Widget3 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { orgUnitInfluenza, allOrgUnits, orgUnitInfluenzaColors } = useMetadataStore(
    (state) => ({
      orgUnitInfluenza: state.orgUnitInfluenza,
      allOrgUnits: state.orgUnits,
      orgUnitInfluenzaColors: state.orgUnitInfluenzaColors
    }),
    shallow
  );

  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, selectedOrgUnitInfluenza, grandTotalName } = additionalState;

  const [data, setData] = useState(null);

  const orgUnits = useMemo(() => {
    return orgUnitInfluenza.map((ou) => ou.id);
  }, []);

  useEffect(() => {
    if (!selectedPeriod || !selectedOrgUnitInfluenza || !orgUnits) return;
    (async () => {
      try {
        setLoading(true);
        const result = await pull(
          `/api/analytics/events/aggregate/H9DEFEUTxGc.json?dimension=ou:${orgUnits.join(
            ";"
          )};Vp8x14BDil5&dimension=pe:${selectedPeriod}&stage=cbLhNJnxYzi&displayProperty=NAME&totalPages=false&outputType=EVENT`
        );
        if (result) {
          const periodIndex = findHeaderIndex(result.headers, "pe");
          const valueIndex = findHeaderIndex(result.headers, "value");
          const ouIndex = findHeaderIndex(result.headers, "ou");

          const dataResult = result.rows.map((row) => ({
            ou: row[ouIndex],
            period: row[periodIndex],
            value: row[valueIndex] * 1,
          }));
          setData(dataResult);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedPeriod, selectedOrgUnitInfluenza?.id]);

  return (
    data && (
      <BarChart
        data={{
          labels: [
            ...orgUnitInfluenza.map((ou) => ou.displayName),
            ...[grandTotalName],
          ],
          datasets: [
            {
              label: t("influenzaCases"),
              data: [
                ...orgUnitInfluenza.map((ou) => {
                  const getTotal = (array) => {
                    return array.reduce(
                      (prev, curr) => prev + (curr.value * 1 || 0),
                      0
                    );
                  };
                  const dataArray = data.filter((item) => item.ou === ou.id);

                  return getTotal(dataArray);
                }),
                ...[
                  (() => {
                    const getTotal = (array) => {
                      return array.reduce(
                        (prev, curr) => prev + (curr.value * 1 || 0),
                        0
                      );
                    };
                    const dataArray = data.filter(
                      (item) => item.ou === "Vp8x14BDil5"
                    );
                    return getTotal(dataArray);
                  })(),
                ],
              ],
              backgroundColor: orgUnitInfluenzaColors[0],
              borderColor: orgUnitInfluenzaColors[0],
            },
          ],
        }}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget3);
