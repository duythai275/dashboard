import { useEffect, useState } from "react";
import Custom from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { pull } from "../utils";
import shallow from "zustand/shallow";

const Widget1 = ({ setLoading }) => {
  const { hmisOrgUnits, surveyOptionSets } = useMetadataStore(
    (state) => ({ hmisOrgUnits: state.hmisOrgUnits, surveyOptionSets: state.surveyOptionSets }),
    shallow
  );
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getDashboard2Widget1Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      const currentData = result;
      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  console.log(surveyOptionSets);

  return (
    data && (
      <Custom>
        <div>ajsdghahjsdasd</div>
      </Custom>
    )
  );
};
export default withWidgetChildrenLoader(Widget1);
