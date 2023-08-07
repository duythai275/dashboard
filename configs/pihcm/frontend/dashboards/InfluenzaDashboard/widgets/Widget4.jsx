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

const Widget4 = ({ setLoading }) => {
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
  const { selectedPeriod, selectedOrgUnitInfluenza, grandTotalName } =
    additionalState;

  const [data, setData] = useState(null);

  const orgUnits = useMemo(() => {
    return orgUnitInfluenza.map((ou) => ou.id);
  }, []);

  const listLast5Years = useMemo(() => {
    if (!selectedPeriod) return null;
    let result = [];
    let currentYear = selectedPeriod;
    while (result.length < 5) {
      result.push(currentYear);
      currentYear--;
    }
    return result.reverse();
  }, [selectedPeriod]);

  useEffect(() => {
    if (!listLast5Years || !selectedOrgUnitInfluenza || !orgUnits) return;
    (async () => {
      try {
        setLoading(true);
        const result = await pull(
          `/api/analytics/events/aggregate/H9DEFEUTxGc.json?dimension=ou:${orgUnits.join(
            ";"
          )};Vp8x14BDil5&dimension=pe:${listLast5Years.join(
            ";"
          )}&stage=cbLhNJnxYzi&displayProperty=NAME&totalPages=false&outputType=EVENT`
        );
        if (result) {
          const periodIndex = findHeaderIndex(result.headers, "pe");
          const valueIndex = findHeaderIndex(result.headers, "value");
          const ouIndex = findHeaderIndex(result.headers, "ou");

          let dataResult = {};
          let total = [];
          orgUnitInfluenza.forEach((o, index) => {
            total.push(0);
          });
          dataResult["period"] = result.metaData.dimensions.pe.map((e) => e);
          dataResult["datasets"] = orgUnitInfluenza.map((ou, index) => {
            return {
              label: ou.displayName,
              data: result.metaData.dimensions.pe.map((pe) => {
                const foundValue = result.rows.find(
                  (row) => row[periodIndex] === pe && row[ouIndex] === ou.id
                );
                total[index] += foundValue ? foundValue[valueIndex] : 0;
                return foundValue ? foundValue[valueIndex] : 0;
              }),
            };
          });
          total.forEach((t, index) => {
            dataResult["datasets"][index].data.push(t * 1);
          });
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
          labels: [...data.period.map((e) => e), ...[t("influenzaTotalCase")]],
          datasets: data.datasets.map((d,index) => ({
            label: d.label,
            data: d.data,
            backgroundColor: orgUnitInfluenzaColors[index],
            borderColor: orgUnitInfluenzaColors[index],
          })),
        }}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget4);
