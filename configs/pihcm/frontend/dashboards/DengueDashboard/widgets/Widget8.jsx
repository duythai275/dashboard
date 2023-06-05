import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { findHeaderIndex } from "@/config/utils";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";

const Widget8 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const { i18n, t } = useTranslation();
  const { orgUnits } = useMetadataStore(
    (state) => ({ orgUnits: state.communes }),
    shallow
  );
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, selectedOrgUnit } = additionalState;
  const weeks = useMemo(() => {
    let weeks = [];
    for (let i = 1; i <= 52; i++) {
      weeks.push(`W${i}`);
    }
    return weeks;
  }, []);
  useEffect(() => {
    if (!selectedPeriod || !selectedOrgUnit) return;
    (async () => {
      try {
        setLoading(true);
        const ouGroup = (() => {
          switch (selectedOrgUnit.level) {
            case 1:
              return "rNQI8VXXCD0";
            case 2:
              return "F02s7E0zJlM";
            default:
              return "";
          }
        })();
        const listPeriod = weeks.map((week) => `${selectedPeriod}${week}`);

        const result = await pull(
          `/api/analytics?dimension=dx:z0p4ckI0hxj;QdnFUDnx43c,ou:${
            selectedOrgUnit?.id
          }${ouGroup && `;OU_GROUP-${ouGroup}`}&filter=pe:${listPeriod.join(
            ";"
          )}&displayProperty=NAME&includeNumDen=false&skipMeta=false&skipData=false`
        );
        if (result) {
          const dxIndex = findHeaderIndex(result.headers, "dx");
          const ouIndex = findHeaderIndex(result.headers, "ou");
          const valueIndex = findHeaderIndex(result.headers, "value");

          let dataResult = {};
          dataResult.data = result.rows.map((row) => ({
            dx: row[dxIndex],
            ou: row[ouIndex],
            value: row[valueIndex] * 1,
          }));
          dataResult.ous = result.metaData.dimensions.ou;
          setData(dataResult);
          setData(dataResult);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedPeriod, selectedOrgUnit?.id]);

  return (
    data && (
      <BarChart
        data={{
          labels: data.ous.map(
            (ou) => orgUnits.find((item) => item.id === ou)?.displayName || ""
          ),
          datasets: listLegend.map((legend, index) => ({
            label: t(legend.label),
            data: data.ous.map((ou) => {
              const getTotal = (array) => {
                return array.reduce(
                  (prev, curr) => prev + (curr.value * 1 || 0),
                  0
                );
              };
              const dataArray = data.data.filter(
                (item) => item.dx === legend.value && item.ou === ou
              );

              return getTotal(dataArray);
            }),
            backgroundColor: listColorForLegend[index],
          })),
        }}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget8);

const listLegend = [
  { value: "z0p4ckI0hxj", label: "dengueWarning" },
  { value: "QdnFUDnx43c", label: "dengueSeverer" },
];

const listColorForLegend = ["#50B432", "#058DC7"];
