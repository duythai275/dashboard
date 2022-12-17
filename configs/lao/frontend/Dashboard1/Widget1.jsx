import { useEffect, useState } from "react";
import HorizontalBarChart from "@/components/Widgets/HorizontalBarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import axios from "axios";

const Widget1 = ({ setLoading }) => {
  const hmisOrgUnits = useMetadataStore((state) => state.hmisOrgUnits);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await axios.get("/api/getWidget1Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let currentData = {};
      currentData.labels = result.map((row) => {
        const foundOu = hmisOrgUnits.find((ou) => ou.id === row.ou);
        const localeName = i18n.language === "en" ? "En" : "Lo";
        return foundOu[`name${localeName}`];
      });
      currentData.datasets = [
        {
          label: t("completeness"),
          data: result.map((row) => row.value),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
      ];
      setData({ ...currentData });
    })();
  }, [i18n.language]);

  return data && <HorizontalBarChart data={data} />;
};
export default withWidgetChildrenLoader(Widget1);
