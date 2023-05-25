import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

import BarChart from "@/components/Widgets/BarChart";
import useMetadataStore from "@/state/metadata";
import { pull } from "../../utils";

const Widget10 = ({ setLoading }) => {
  const { orgUnits, indicators } = useMetadataStore((state) => ({
    orgUnits: state.hmisOrgUnits,
    indicators: state.fhisIndicators,
  }));
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const listTargetPe = useMemo(() => {
    const listPe = [];
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    while (true) {
      if (listPe.length === 12) {
        break;
      }
      listPe.push(`${year}${month < 10 ? `0${month}` : month}`);
      if (month === 1) {
        month = 12;
        year -= 1;
      } else {
        month -= 1;
      }
    }
    return listPe;
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard4Widget10Data");
      const response = {};
      response.data = resultData.data.rows.map((row) => ({
        dx: row[0],
        value: row[2],
        ou: row[1],
      }));
      response.ou = resultData.data.metaData.dimensions.ou
        .map((item) => {
          const foundOu = orgUnits.find((ou) => ou.id === item);
          return foundOu;
        })
        .filter((item) => item);
      response.dx = resultData.data.metaData.dimensions.dx.map((item) => {
        return item;
      });

      setResult(response);
      setLoading(false);
    })();
  }, []);

  const wrap = (str, limit) => {
    const words = str.split(" ");
    let aux = [];
    let concat = [];

    for (let i = 0; i < words.length; i++) {
      concat.push(words[i]);
      let join = concat.join(" ");
      if (join.length > limit) {
        aux.push(join);
        concat = [];
      }
    }

    if (concat.length) {
      aux.push(concat.join(" ").trim());
    }

    return aux;
  };

  useEffect(() => {
    if (!result) return;

    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";

      const colors = ["#A8BF24"];
      let currentData = {};
      const dataMappingAlongDx = result.dx
        .map((dx) => {
          const foundRow = result.data.filter((row) => row.dx === dx);

          return {
            data: foundRow.length
              ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
              : 0,
            dx,
          };
        })
        .filter((item) => item.data)
        .sort((a, b) => a.data - b.data);
      currentData.labels = dataMappingAlongDx.map((item) => {
        const foundIndicator = indicators.find(
          (indicator) => indicator.id === item.dx
        );
        const name =
          localeName === "En" ? foundIndicator.nameEn : foundIndicator.nameLo;
        return wrap(name, 15);
      });
      currentData.datasets = result.ou.map((ou, index) => ({
        label: localeName === "En" ? ou.nameEn : ou.nameLo,
        data: dataMappingAlongDx.map((item) => {
          const foundRow = result.data.filter(
            (row) => row.ou === ou.id && row.dx === item.dx
          );

          return foundRow.length
            ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
            : 0;
        }),
        borderColor: colors[index],
        backgroundColor: colors[index],
      }));
      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return data && <BarChart data={data} />;
};
export default withWidgetChildrenLoader(Widget10);
